/**
*
* LatestNews
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import P from 'components/P';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Container from './Container';
import Wrapper from './Wrapper';
import Paper from './Paper';
import A from './A';

class LatestNews extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      featured: '',
      regular: [],
    };
  }

  componentWillMount() {
    let featured;
    const regular = [];
    axios.post('http://172.19.1.14:3000/api/rss', { url: this.props.url })
      .then((res) => {
        const data = res.data;
        const featuredTeaser = data.featured[0].teaser.replace('[…]', '');
        const featuredTitle = <Link to={`${data.featured[0].link}`}>{data.featured[0].title}</Link>;
        featured = (
          <Paper zDepth={2} featured>
            <Link to={`${data.featured[0].link}`}><img src={data.featured[0].img} alt="featured" style={{ width: '100%' }} /></Link>
            <div style={{ padding: 20 }}>
              <h3>{featuredTitle}</h3>
              <P>{featuredTeaser} <Link to={`${data.featured[0].link}`}>[…]</Link></P>
            </div>
            <div style={{ padding: 20, position: 'relative' }}>
              <hr style={{ width: 50, position: 'absolute', top: -10 }} />
              <span>{data.featured[0].date}</span>
            </div>
          </Paper>
        );

        data.data.forEach((item, i) => {
          if (i > 1) return;
          const teaser = item.teaser.replace('[…]', '');
          const title = <Link to={`${item.link}`}>{item.title}</Link>;
          regular.push(
            <Paper zDepth={2} key={i.toString()}>
              <Link to={`${item.link}`}><img src={item.img} alt="featured" style={{ width: '100%' }} /></Link>
              <div style={{ padding: 20 }}>
                <h3>{title}</h3>
                <P>{teaser} <Link to={`${item.link}`}>[…]</Link></P>
              </div>
              <div style={{ padding: 20, position: 'relative' }}>
                <hr style={{ width: 50, position: 'absolute', top: -10 }} />
                <span>{item.date}</span>
              </div>
            </Paper>
          );
        });

        this.setState({ regular });
        this.setState({ featured });
      });
  }

  render() {
    return (
      <div style={{ marginTop: 80 }}>
        <div style={{ color: '#4D4D4D', fontSize: 36, fontWeight: 'bold', lineHeight: '45px' }}>
          <FormattedMessage {...messages.header} />
        </div>
        <hr />
        <Container>
          <Wrapper>
            {this.state.regular}
          </Wrapper>
          {this.state.featured}
        </Container>
        <A href="https://aquablog.ca/" target="_blank">See more on Aquablog.ca &gt;</A>
      </div>
    );
  }
}

LatestNews.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LatestNews;
