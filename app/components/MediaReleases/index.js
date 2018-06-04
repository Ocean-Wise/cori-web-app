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

import ChevronRight from '@material-ui/icons/ChevronRight';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Divider from './Divider';
import H1 from './H1';
import H3 from './H3';
import Date from './Date';
import A from './A';

class MediaReleases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      media: [],
    };
  }

  componentWillMount() {
    axios.post(`${window.location.origin}/api/rss`, { url: this.props.url })
      .then((res) => {
        const media = [];
        res.data.forEach((item, i) => {
          media.push(
            <div key={i.toString()}>
              <a href={item.link} target="_blank"><H3 style={{ marginBottom: 2 }}>{item.title}</H3></a>
              <Date>{item.date}</Date>
            </div>
          );
        });
        this.setState({ media });
      });
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={4}>
            <center>
              <Divider />
              <H1>
                <FormattedMessage {...messages.header} />
              </H1>
            </center>
          </Col>
          <Col md={5}>
            <div>
              {this.state.media}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col md={4} />
          <Col md={5}>
            <A href="https://ocean.org/media-releases" target="_blank">View more media releases <ChevronRight style={{ fontSize: 40 }} /></A>
          </Col>
        </Row>
      </Grid>
    );
  }
}

MediaReleases.propTypes = {
  url: PropTypes.string.isRequired,
};

export default MediaReleases;
