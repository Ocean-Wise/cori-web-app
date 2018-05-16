/**
*
* MediaReleases
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import H2 from './H2';
import H3 from './H3';
import Date from './Date';

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
      <div style={{ marginTop: 80 }}>
        <H2>
          <FormattedMessage {...messages.header} />
        </H2>
        <div>
          {this.state.media}
        </div>
      </div>
    );
  }
}

MediaReleases.propTypes = {
  url: PropTypes.string.isRequired,
};

export default MediaReleases;
