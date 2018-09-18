/**
*
* AboutContentIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Grid, Row, Col } from 'react-flexbox-grid';
import client from 'utils/contentful';

import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import A from './A';
import Divider from './Divider';
import MarkdownWrapper from './MarkdownWrapper';

class AboutContentIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    data: [],
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'about',
    }).then((res) => this.setData(res.items[0].fields))
      .catch();
  }

  setData = (data) => {
    this.setState({ data });
  }

  render() {
    try {
      const { data } = this.state;
      const { width } = this.props;

      let copy = data.copy;
      const regex = /!\[(.*)\]\(.*\)/g;
      let images = regex.exec(copy);
      while (images != null) {
        const imageWithCaption = `${images[0]}*${images[1]}*`;
        copy = copy.replace(images[0], imageWithCaption);
        images = regex.exec(copy);
      }

      const responsiveWidth = width < 769 ? '100%' : 850;
      return (
        <div>
          <HeroWrapper>
            <Hero src={data.hero ? data.hero.fields.file.url : null} alt="About Us" />
            {data.imageAttribution ? <span id="attribution">{data.imageAttribution}</span> : ''}
          </HeroWrapper>
          <Section>
            <Grid fluid>
              <Row>
                <Col xl={3} />
                <Col xl={6}>
                  <H1>{data.title}</H1>
                  <H3>{data.subheader}</H3>
                  <MarkdownWrapper>
                    <ReactMarkdown source={copy} />
                  </MarkdownWrapper>
                </Col>
              </Row>
            </Grid>
          </Section>
          <Section>
            <Grid fluid id="contact">
              <Row>
                <Col xl={1} />
                <Col xl={4}>
                  <Divider />
                  <H1>Contact Us</H1>
                </Col>
                <Col xl={6} style={{ maxWidth: responsiveWidth }}>
                  <Row>
                    <Col xl={5}>
                      <H2>General Inquries</H2>
                      <div>
                        <span style={{ color: 'rgb(113, 113, 113)', fontSize: 18, lineHeight: '21px', fontWeight: 'bold' }}>Email:</span> <A href="mailto:research@ocean.org">research@ocean.org</A>
                      </div>
                    </Col>
                    <Col xl={5}>
                      <H2>Media Inquries</H2>
                      <div>
                        <span style={{ color: 'rgb(113, 113, 113)', fontSize: 18, lineHeight: '21px', fontWeight: 'bold' }}>Email:</span> <A href="mailto:publicrelations@ocean.org">publicrelations@ocean.org</A>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={5}>
                      <H2>Mailing Address</H2>
                      <div style={{ color: '#4D4D4D', fontSize: 18, fontWeight: 'bold', lineHeight: '21px' }}>
                        Ocean Wise<br />
                        PO Box 3232<br />
                        Vancouver, British Columbia<br />
                        Canada V6B 3X8
                      </div>
                    </Col>
                    <Col xl={5}>
                      <H2>Courier Address</H2>
                      <div style={{ color: '#4D4D4D', fontSize: 18, fontWeight: 'bold', lineHeight: '21px' }}>
                        Ocean Wise at Vancouver Aquarium<br />
                        845 Avison Way<br />
                        Vancouver, British Columbia<br />
                        Canada V6G 3E2
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </Section>
        </div>
      );
    } catch (err) {
      return <div></div>;
    }
  }
}

AboutContentIe.propTypes = {
  width: PropTypes.number,
};

export default AboutContentIe;
