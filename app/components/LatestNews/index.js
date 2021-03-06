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

import ChevronRight from 'styles/icons/ChevronRight.svg';
import P from 'components/P';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Container from './Container';
import Wrapper from './Wrapper';
import Paper from './Paper';
import Img from './Img';
import A from './A';
import H1 from './H1';
import H3 from './H3';
import Divider from './Divider';
import Section from './Section';

class LatestNews extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      featured: '',
      regular: [],
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

  getData = async () => {
    let featured;
    const regular = [];
    await axios.post('/api/rss', { url: this.props.url, news: true })
      .then((res) => {
        const data = res.data;
        // There were no items in the RSS feed
        if (data.featured.length < 1) {
          // So don't render and skip the rest of this function
          this.setState({ shouldRender: false });
          return false;
        } else { // eslint-disable-line
          // There was at least one item in the RSS feed. Ensure that the shouldRender state
          // variable is at set correctly if the route has changed.
          this.setState({ shouldRender: true });
        }
        const featuredTeaser = data.featured[0].teaser.replace('[…]', '');
        const featuredTitle = <Link to={`${data.featured[0].link}`}>{data.featured[0].title}</Link>;
        featured = (
          <Paper elevation={1} featured>
            <a href={data.featured[0].link} target="_blank"><Img src={data.featured[0].img} featured /></a>
            <div style={{ padding: '20px 20px 58px 20px', marginBottom: 45 }}>
              <H3>{featuredTitle}</H3>
              <P>{featuredTeaser.substring(0, 250)} <Link to={`${data.featured[0].link}`}>[…]</Link></P>
            </div>
            <div style={{ position: 'absolute', bottom: 5 }}>
              <div style={{ padding: 20, display: 'inline-flex', flexDirection: 'column', justifyContent: 'left' }}>
                <Divider style={{ width: 50, height: 1, marginBottom: 10, backgroundColor: '#00B398' }} news />
                <div>{data.featured[0].date}</div>
              </div>
            </div>
          </Paper>
        );

        data.data.forEach((item, i) => {
          if (i > 1) return;
          const teaser = item.teaser.replace('[…]', '');
          const title = <a href={item.link} target="_blank">{item.title}</a>;
          regular.push(
            <Paper elevation={1} key={i.toString()}>
              <a href={item.link} target="_blank"><Img src={item.img} /></a>
              <div style={{ padding: '20px 20px 10px 20px', marginBottom: 45 }}>
                <H3>{title}</H3>
                <P>{teaser.substring(0, 100)} <a href={item.link} target="_blank">[…]</a></P>
              </div>
              <div style={{ position: 'absolute', bottom: 5 }}>
                <div style={{ padding: 20, display: 'inline-flex', flexDirection: 'column', justifyContent: 'left' }}>
                  <Divider style={{ width: 50, height: 1, marginBottom: 10, backgroundColor: '#00B398' }} news />
                  <div>{item.date}</div>
                </div>
              </div>
            </Paper>
          );
        });

        this.setState({ regular, featured });
        return true;
      });
  }

  render() {
    if (this.state.shouldRender) {
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
              <Col xl={7} style={{ maxWidth: 850, padding: 0 }}>
                <Wrapper>
                  {this.state.regular}
                </Wrapper>
                {this.state.featured}
              </Col>
            </Row>
            <Row>
              <Col xl={4} />
              <Col xl={5} style={{ margin: '-10px 0' }}>
                <A href="https://aquablog.ca/" target="_blank">See more on Aquablog.ca <img style={{ width: 25 }} alt="ChevronRight" src={ChevronRight} /></A>
              </Col>
            </Row>
          </Grid>
        </Section>
      );
    } else return null; // eslint-disable-line
  }
}

LatestNews.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LatestNews;
