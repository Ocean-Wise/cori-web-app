/**
*
* ProgramContentIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Grid, Row, Col } from 'react-flexbox-grid';
import client from 'utils/contentful';
import { Helmet } from 'react-helmet';

import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import A from './A';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import Divider from './Divider';
import TitleContainer from './TitleContainer';

/* eslint-disable */
function LinkRenderer(props) {
  return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
}
/* eslint-enable */

class ProgramContentIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    program: {},
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'program',
      'fields.slug[match]': this.props.slug,
    }).then(async (res) => {
      this.setData(res.items[0].fields);
    }).catch();
  }

  setData = (program) => {
    this.setState({ program });
  }

  render() {
    const { program } = this.state;
    const { width, slug } = this.props;
    try {
      const responsiveWidth = width < 769 ? '100%' : 850;
      const InitiativesComponent = (
        <Grid fluid style={{ padding: '60px 0' }}>
          <Row style={{ margin: 0 }}>
            <Col xl={4}>
              <TitleContainer>
                <Divider />
                <H1 className="initiative" style={{ marginTop: 15, position: 'absolute' }}>Initiatives</H1>
              </TitleContainer>
            </Col>
            <Col xl={7} style={{ maxWidth: responsiveWidth }}>
              <H3>This feature is not avaliable on your browser. Please <A href="http://outdatedbrowser.com">update your browser</A>.</H3>
              <H3>You can still look for projects via the search function located at the top of the page.</H3>
            </Col>
          </Row>
        </Grid>
      );

      // Ensure we render the page even if the editor did not remember to publish the hero image...
      let hero;
      let title;
      if (program.hero) {
        hero = program.hero.fields.file.url;
        title = program.hero.fields.file.title;
      }

      return (
        <div>
          <Helmet>
            {/* Search Engine */}
            <meta name="description" content={program.copy} />
            <meta name="image" content={hero} />
            {/* Schema.org for Google */}
            {/* eslint-disable */}
            <meta itemprop="name" content={`${program.title} - Ocean Wise Research`} />
            <meta itemprop="description" content={program.subheader} />
            <meta itemprop="image" content={hero} />
            {/* eslint-enable */}
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={`${program.title} - Ocean Wise Research`} />
            <meta name="twitter:description" content={program.subheader} />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content={`${program.title} - Ocean Wise Research`} />
            <meta name="og:description" content={program.subheader} />
            <meta name="og:image" content={hero} />
            <meta name="og:url" content={`https://research.ocean.org/program/${slug}`} />
            <meta name="og:site_name" content="Ocean Wise Research" />
            <meta name="og:type" content="article" />
          </Helmet>
          <HeroWrapper>
            <Hero src={hero} alt={title} />
            {program.imageAttribution ? <span id="attribution">{program.imageAttribution}</span> : ''}
          </HeroWrapper>
          <Section style={{ paddingBottom: 20 }}>
            <Grid fluid>
              <Row>
                <Col xl={4} />
                <Col xl={7} style={{ maxWidth: responsiveWidth }}>
                  <H1 style={{ marginTop: 15 }}>{program.title}</H1>
                  <H3>{program.subheader}</H3>
                  <MarkdownWrapper>
                    <ReactMarkdown source={program.copy} renderers={{ link: LinkRenderer }} />
                  </MarkdownWrapper>
                </Col>
              </Row>
            </Grid>
          </Section>
          <Section>
            {InitiativesComponent}
          </Section>
        </div>
      );
    } catch (err) {
      return <div></div>;
    }
  }
}

ProgramContentIe.propTypes = {
  width: PropTypes.number,
  slug: PropTypes.string.isRequired,
};

export default ProgramContentIe;
