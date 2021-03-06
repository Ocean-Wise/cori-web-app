/**
*
* ResearchAreaContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import getResearchArea from 'graphql/queries/getResearchArea.graphql';
import { Grid, Row } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet';

import ChevronRight from '@material-ui/icons/ChevronRight';
import ProgramTiles from 'components/ProgramTiles/Loadable';
import LatestNews from 'components/LatestNews/Loadable';
import MediaReleases from 'components/MediaReleases/Loadable';
import Button from 'components/Button/Loadable';
import SpotlightTag from 'components/SpotlightTag/Loadable';
import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import Container from './Container';
import H1 from './H1';
// import Divider from './Divider';
import H2 from './H2';
import MarkdownWrapper from './MarkdownWrapper';
import H3 from './H3';
import Col from './Col';
import SupporterRow from './SupporterRow';

/* eslint-disable */
function LinkRenderer(props) {
  return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
}
/* eslint-enable */

function ResearchAreaContent({ data: { researchAreas }, slug, width, spotlight }) {
  let area = {};
  try {
    area = researchAreas[0];
    const LatestNewsComponent = area.newsRSS !== null ? (
      <LatestNews url={area.newsRSS} />
    ) : '';
    const MediaReleasesComponent = area.mediaRSS !== null ? (
      <MediaReleases url={area.mediaRSS} />
    ) : '';

    let supporters;
    let supportersComponent;
    try {
      supporters = area.supporters.map((supporter) => { // eslint-disable-line
        return (
          <div key={`supporter-${supporter.name}`} style={{ margin: 'auto 20px', display: 'inline-block', height: '100%', verticalAlign: 'middle' }}>
            <img src={supporter.logo.url} alt={supporter.name} style={{ display: 'inline-block', width: 150, height: '100% !important', verticalAlign: 'middle' }} />
          </div>
        );
      });
      supportersComponent = area.supporters !== null ? (
        <Section>
          <center>
            <H1 style={{ fontSize: 48, lineHeight: '50px', marginTop: 0 }} supporters>Our Supporters</H1>
            {/* <Divider /> */}
            {area.supportersCopy ? <p>{area.supportersCopy}</p> : ''}
            <Grid fluid>
              <Row>
                <Col xl={8} style={{ margin: '0 auto' }}>
                  <SupporterRow>
                    {supporters}
                  </SupporterRow>
                </Col>
              </Row>
            </Grid>
          </center>
        </Section>
      ) : '';
    } catch (err) {
      supporters = '';
      supportersComponent = '';
    }

    const Spotlight = spotlight ? <SpotlightTag /> : '';

    // Ensure we render the page even if the editor did not remember to publish the hero image...
    let hero;
    let title;
    if (area.hero) {
      hero = area.hero.url;
      title = area.hero.title;
    }

    return (
      <div style={{ overflow: 'hidden' }}>
        <Helmet>
          {/* Search Engine */}
          <meta name="description" content={area.copy} />
          <meta name="image" content={hero} />
          {/* Schema.org for Google */}
          {/* eslint-disable */}
          <meta itemprop="name" content={`${area.title} - Ocean Wise Research`} />
          <meta itemprop="description" content={area.copy} />
          <meta itemprop="image" content={hero} />
          {/* eslint-enable */}
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={`${area.title} - Ocean Wise Research`} />
          <meta name="twitter:description" content={area.copy} />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:title" content={`${area.title} - Ocean Wise Research`} />
          <meta name="og:description" content={area.copy} />
          <meta name="og:image" content={hero} />
          <meta name="og:url" content={`https://research.ocean.org/research/${slug}`} />
          <meta name="og:site_name" content="Ocean Wise Research" />
          <meta name="og:type" content="article" />
        </Helmet>
        <HeroWrapper>
          <Hero src={hero} alt={title} />
          {area.imageAttribution ? <span id="attribution">{area.imageAttribution}</span> : ''}
        </HeroWrapper>
        <Section first>
          <Grid fluid>
            <Row>
              <Col xl={4} />
              <Col xl={7} style={{ paddingLeft: 0, maxWidth: 850 }}>
                {/* <Breadcrumbs slug={slug} location={match} research /> */}
                {Spotlight}
                <H1 style={{ marginTop: 25 }}>{area.title}</H1>
                <H2>{area.subheader}</H2>
                <MarkdownWrapper>
                  <ReactMarkdown source={area.copy} renderers={{ link: LinkRenderer }} />
                </MarkdownWrapper>
              </Col>
            </Row>
          </Grid>
        </Section>
        <Section>
          <ProgramTiles slug={slug} width={width} />
        </Section>
        {LatestNewsComponent}
        {MediaReleasesComponent}
        <Section>
          <Grid fluid>
            <Row style={{ position: 'relative', zIndex: 10 }}>
              <Col xl={1} />
              <Col xl={4} team>
                <Container>
                  <H3>The Team</H3>
                  <p>{area.teamCopy}</p>
                  <Link to={`/team/${slug}`}>
                    <Button id="team">
                      Get to know our researchers <ChevronRight style={{ fontSize: 30, marginLeft: 15 }} />
                    </Button>
                  </Link>
                </Container>
              </Col>
            </Row>
            <Row style={{ position: 'relative', zIndex: 5 }}>
              <Col xl={6} />
              <Col xl={4}>
                <Container second>
                  <H3>Read Our Work</H3>
                  <p>{area.publicationCopy}</p>
                  <Link to={`/publications/${slug}`}>
                    <Button id="publications">
                      Find our publications <ChevronRight style={{ fontSize: 30, marginLeft: 15 }} />
                    </Button>
                  </Link>
                </Container>
              </Col>
            </Row>
          </Grid>
        </Section>
        {supportersComponent}
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchAreaContent.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  spotlight: PropTypes.bool.isRequired,
  width: PropTypes.number,
};

export default graphql(getResearchArea, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ResearchAreaContent);
