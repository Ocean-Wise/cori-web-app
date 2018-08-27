/**
*
* InitiativeFeatured
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
import Hr from './Hr';
import H5 from './H5';

class InitiativeFeatured extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      story: '',
      shouldRender: true,
    };
  }

  componentWillMount() {
    this.getData();
  }

  // Check if we have received an updated url prop from a route change
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      // If we have, update the component with the new RSS data
      this.getData();
    }
  }

  getData = () => {
    let story;
    axios.post(`${window.location.origin}/api/rss`, { url: this.props.url, news: true })
      .then((res) => {
        const data = res.data;
        if (data.featured.length < 1) {
          this.setState({ shouldRender: false });
          return false;
        } else { // eslint-disable-line
          this.setState({ shouldRender: true });
        }
        try {
          const teaser = data.featured[0].teaser.replace('[…]', '');
          const title = <Link to={`${data.featured[0].link}`}>{data.featured[0].title}</Link>;
          story = (
            <Paper zDepth={2}>
              <a href={data.featured[0].link} target="_blank"><img src={data.featured[0].img} alt="featured" style={{ width: '100%' }} /></a>
              <div style={{ padding: 20, marginBottom: 45 }}>
                <H3 news>{title}</H3>
                <P style={{ marginBottom: 60 }}>{teaser.substring(0, 270)} <Link to={`${data.featured[0].link}`}>[…]</Link></P>
              </div>
              <div style={{ padding: 20, position: 'absolute', bottom: 5 }}>
                <Divider style={{ width: 50, height: 1, marginBottom: 10 }} />
                <span>{data.featured[0].date}</span>
              </div>
            </Paper>
          );
          this.setState({ story });
          return true;
        } catch (err) {
          story = <div></div>;
          this.setState({ story });
          return false;
        }
      });
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <div>
          <Hr style={{ marginBottom: 15 }} />
          <H5>FEATURE STORY</H5>
          <div>
            {this.state.story}
          </div>
        </div>
      );
    } else { // eslint-disable-line
      return null;
    }
  }
}

InitiativeFeatured.propTypes = {
  url: PropTypes.string.isRequired,
};

export default InitiativeFeatured;
