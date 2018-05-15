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

class MediaReleases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      media: [],
    };
  }

  componentWillMount() {
    axios.post('http://172.19.1.14:3000/api/rss', { url: this.props.url })
      .then((res) => {
        const media = [];
        res.data.forEach((item, i) => {
          media.push(
            <div key={i.toString()}>
              <a href={item.link} target="_blank"><h3 style={{ marginBottom: 2 }}>{item.title}</h3></a>
              <span>{item.date}</span>
            </div>
          );
        });
        this.setState({ media });
      });
  }

  render() {
    return (
      <div style={{ marginTop: 80 }}>
        <div style={{ color: '#4D4D4D', fontSize: 36, fontWeight: 'bold', lineHeight: '45px' }}>
          <FormattedMessage {...messages.header} />
        </div>
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
