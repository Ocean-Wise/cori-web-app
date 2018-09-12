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
            <a href={item.link} target="_blank" key={`release-${i.toString()}`}>
              <H2>{item.title}</H2>
              <span style={{ color: '#8D8D8D', fontSize: 12, lineHeight: '18px' }}>{item.date}</span>
            </a>
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
          {/* Search Engine */}
          <meta name="description" content="Media Releases from Ocean.org on our research" />
          <meta name="image" content="http://images.ctfassets.net/fsquhe7zbn68/1W8cGTEbmQaYIoYMEIQWCO/a59d36fa88a13e2f7a0ba446a60b0309/frank-busch-731184-unsplash.jpg" />
          {/* Schema.org for Google */}
          {/* eslint-disable */}
          <meta itemprop="name" content="Ocean Wise Research Media Releases" />
          <meta itemprop="image" content="http://images.ctfassets.net/fsquhe7zbn68/1W8cGTEbmQaYIoYMEIQWCO/a59d36fa88a13e2f7a0ba446a60b0309/frank-busch-731184-unsplash.jpg" />
          {/* eslint-enable */}
          {/* Twitter */}
          <meta name="twitter:title" content="Ocean Wise Research Media Releases" />
          <meta name="twitter:description" content="Media Releases from Ocean.org on our research" />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:title" content="Ocean Wise Research Media Releases" />
          <meta name="og:description" content="Media Releases from Ocean.org on our research" />
          <meta name="og:image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
          <meta name="og:url" content="https://research.ocean.org/media" />
          <meta name="og:site_name" content="Ocean Wise Research" />
          <meta name="og:type" content="website" />
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
