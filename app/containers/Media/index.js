/**
 *
 * Media
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios';
import Header from 'components/Header';
import LoadingIndicator from 'components/LoadingIndicator';

import H1 from './H1';
import H2 from './H2';
import A from './A';
import messages from './messages';

export class Media extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      media: [],
    };
  }

  componentWillMount() {
    const media = [];
    axios.post('/api/rss', { url: 'https://ocean.org/media-release-tag/research/feed/', news: false, mediaPage: true })
      .then((res) => {
        const data = res.data;
        data.forEach((item, i) => {
          media.push(
            <div key={`release-${i.toString()}`}>
              <H2>{item.title}</H2>
              <span style={{ color: '#8D8D8D', fontSize: 12, lineHeight: '18px' }}>{item.date}</span>
            </div>
          );
        });
        this.setState({ media });
      });
  }

  render() {
    const { media } = this.state;
    const email = <A href="mailto:publicrelations@ocean.org">publicrelations@ocean.org</A>;
    const mediaReleases = media.length === 0 ? <LoadingIndicator /> : media;
    return (
      <div>
        <Helmet>
          <title>Media Releases</title>
          <meta name="description" content="Media Releases from Ocean.org" />
        </Helmet>
        <Header />
        <div style={{ marginTop: 80, marginBottom: 120 }}>
          <Grid fluid>
            <Row>
              <Col xl={3} />
              <Col xl={6}>
                <H1><FormattedMessage {...messages.header} /></H1>
                <p style={{ color: '#4D4D4D', fontSize: '16px', lineHeight: '26px', textAlign: 'center', marginBottom: 80 }}><FormattedMessage {...messages.inquires} values={{ email }} /></p>
              </Col>
            </Row>
            <Row>
              <Col xl={3} />
              <Col xl={6}>
                {mediaReleases}
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Media.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Media);
