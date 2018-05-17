/**
*
* LatestNews
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import P from 'components/P';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Container from './Container';
import Wrapper from './Wrapper';
import Paper from './Paper';
import A from './A';
import H1 from './H1';
import H3 from './H3';
import Divider from './Divider';

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
    axios.post(`${window.location.origin}/api/rss`, { url: this.props.url, news: true })
      .then((res) => {
        const data = res.data;
        const featuredTeaser = data.featured[0].teaser.replace('[…]', '');
        const featuredTitle = <Link to={`${data.featured[0].link}`}>{data.featured[0].title}</Link>;
        featured = (
          <Paper zDepth={1} featured>
            <a href={data.featured[0].link} target="_blank"><img src={data.featured[0].img} alt="featured" style={{ width: '100%' }} /></a>
            <div style={{ padding: '20px 20px 58px 20px', marginBottom: 45 }}>
              <H3>{featuredTitle}</H3>
              <P>{featuredTeaser.substring(0, 250)} <Link to={`${data.featured[0].link}`}>[…]</Link></P>
            </div>
            <div style={{ padding: 20, position: 'absolute', bottom: 5 }}>
              <Divider style={{ width: 50, height: 1, marginBottom: 10, backgroundColor: '#00B398', right: '39px' }} />
              <span>{data.featured[0].date}</span>
            </div>
          </Paper>
        );

        data.data.forEach((item, i) => {
          if (i > 1) return;
          const teaser = item.teaser.replace('[…]', '');
          const title = <a href={item.link} target="_blank">{item.title}</a>;
          regular.push(
            <Paper zDepth={1} key={i.toString()}>
              <a href={item.link} target="_blank"><img src={item.img} alt="featured" style={{ width: '100%' }} /></a>
              <div style={{ padding: '20px 20px 10px 20px', marginBottom: 45 }}>
                <H3>{title}</H3>
                <P>{teaser.substring(0, 100)} <a href={item.link} target="_blank">[…]</a></P>
              </div>
              <div style={{ padding: 20, position: 'absolute', bottom: 5 }}>
                <Divider style={{ width: 50, height: 1, marginBottom: 10, backgroundColor: '#00B398', right: '39px' }} />
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
            <Wrapper>
              {this.state.regular}
            </Wrapper>
            {this.state.featured}
          </Col>
        </Row>
        <Row>
          <Col md={4} />
          <Col md={5} style={{ margin: '-10px 0' }}>
            <A href="https://aquablog.ca/" target="_blank">See more on Aquablog.ca &gt;</A>
          </Col>
        </Row>
      </Grid>
    );
  }
}
// return (
//   <div style={{ marginTop: 80 }}>
//     <center>
//       <H1>
//         <FormattedMessage {...messages.header} />
//       </H1>
//       <Divider />
//     </center>
//     <Container>
//       <Wrapper>
//         {this.state.regular}
//       </Wrapper>
//       {this.state.featured}
//     </Container>
//     <A href="https://aquablog.ca/" target="_blank">See more on Aquablog.ca &gt;</A>
//   </div>
// );

LatestNews.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LatestNews;
