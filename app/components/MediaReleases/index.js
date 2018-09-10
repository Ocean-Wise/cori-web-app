/**
*
* MediaReleases
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ChevronRight from 'styles/icons/ChevronRight.svg';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Container from './Container';
import Divider from './Divider';
import H1 from './H1';
import H3 from './H3';
import Date from './Date';
import A from './A';
import Section from './Section';

class MediaReleases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      media: [],
    };
  }

  componentWillMount() {
    axios.post('/api/rss', { url: this.props.url })
      .then((res) => {
        const media = [];
        res.data.forEach((item, i) => {
          media.push(
            <a href={item.link} target="_blank" key={i.toString()}>
              <H3 style={{ marginBottom: 2 }}>{item.title}</H3>
              <Date>{item.date}</Date>
            </a>
          );
        });
        this.setState({ media });
      });
  }

  render() {
    if (this.state.media.length < 1) return null;
    return (
      <Section>
        <Grid fluid>
          <Row>
            <Col xl={4}>
              <Container>
                <Divider />
                <H1>
                  <FormattedMessage {...messages.header} />
                </H1>
              </Container>
            </Col>
            <Col xl={5} style={{ maxWidth: 850 }}>
              <div>
                {this.state.media}
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 15 }}>
            <Col xl={4} />
            <Col xl={5} style={{ maxWidth: 850 }}>
              <A href="https://ocean.org/media-releases" target="_blank">View more media releases <img style={{ width: 25 }} alt="ChevronRight" src={ChevronRight} /></A>
            </Col>
          </Row>
        </Grid>
      </Section>
    );
  }
}

MediaReleases.propTypes = {
  url: PropTypes.string.isRequired,
};

export default MediaReleases;
