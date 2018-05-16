/**
*
* ProjectFeatured
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import P from 'components/P';
import Divider from './Divider';
import H3 from './H3';
import Paper from './Paper';

class ProjectFeatured extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      story: '',
    };
  }

  componentWillMount() {
    let story;
    axios.post(`${window.location.origin}/api/rss`, { url: this.props.url, news: true })
      .then((res) => {
        const data = res.data;
        try {
          const teaser = data.featured[0].teaser.replace('[…]', '');
          const title = <Link to={`${data.featured[0].link}`}>{data.featured[0].title}</Link>;
          story = (
            <Paper zDepth={2}>
              <a href={data.featured[0].link} target="_blank"><img src={data.featured[0].img} alt="featured" style={{ width: '100%' }} /></a>
              <div style={{ padding: 20, marginBottom: 45 }}>
                <H3 news>{title}</H3>
                <P style={{ marginBottom: 60 }}>{teaser.substring(0, 250)} <Link to={`${data.featured[0].link}`}>[…]</Link></P>
              </div>
              <div style={{ padding: 20, position: 'absolute', bottom: 5 }}>
                <Divider style={{ width: 50, height: 1, marginBottom: 10 }} />
                <span>{data.featured[0].date}</span>
              </div>
            </Paper>
          );
          this.setState({ story });
        } catch (err) {
          story = <div></div>;
          this.setState({ story });
        }
      });
  }

  render() {
    return <div>{this.state.story}</div>;
  }
}

ProjectFeatured.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ProjectFeatured;
