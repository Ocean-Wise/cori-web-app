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

import ChevronRight from '@material-ui/icons/ChevronRight';
import ProgramTiles from 'components/ProgramTiles';
// import Breadcrumbs from 'components/Breadcrumbs';
import LatestNews from 'components/LatestNews/Loadable';
import MediaReleases from 'components/MediaReleases/Loadable';
import Button from 'components/Button';
import SpotlightTag from 'components/SpotlightTag';
import Hero from './Hero';
import Section from './Section';
import Container from './Container';
import H1 from './H1';
// import Divider from './Divider';
import H2 from './H2';
import MarkdownWrapper from './MarkdownWrapper';
import H3 from './H3';
import Col from './Col';
import SupporterRow from './SupporterRow';

function ResearchAreaContent({ data: { researchAreas }, slug, width, spotlight }) {
  let area = {};
  try {
    area = researchAreas[0];
    const LatestNewsComponent = area.newsRSS !== null ? (
      <Section>
        <LatestNews url={area.newsRSS} />
      </Section>
    ) : '';
    const MediaReleasesComponent = area.mediaRSS !== null ? (
      <MediaReleases url={area.mediaRSS} />
    ) : '';

    let supporters;
    let supportersComponent;
    try {
      supporters = area.supporters.map((supporter) => { // eslint-disable-line
        return (
          <div key={`supporter-${supporter.name}`} style={{ margin: 10 }}>
            <img src={supporter.logo.url} alt={supporter.name} width={250} />
          </div>
        );
      });
      supportersComponent = area.supporters !== null ? (
        <Section>
          <center>
            <H1 style={{ fontSize: 48, lineHeight: '50px', paddingTop: 15 }}>Our Supporters</H1>
            {/* <Divider /> */}
            <p>{area.supportersCopy}</p>
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

    return (
      <div style={{ overflow: 'hidden' }}>
        <Hero src={area.hero.url} alt={area.hero.title} />
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
                  <ReactMarkdown source={area.copy} />
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
    console.log(err.stack);
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
