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
import Breadcrumbs from 'components/Breadcrumbs';
import LatestNews from 'components/LatestNews/Loadable';
import MediaReleases from 'components/MediaReleases/Loadable';
import Button from 'components/Button';
import Hero from './Hero';
import Section from './Section';
import Container from './Container';
import H1 from './H1';
import Divider from './Divider';
import H2 from './H2';
import MarkdownWrapper from './MarkdownWrapper';
import H3 from './H3';
import Col from './Col';

function ResearchAreaContent({ data: { researchAreas }, slug, match }) {
  let area = {};
  try {
    area = researchAreas[0];
    const LatestNewsComponent = area.newsRSS !== null ? <LatestNews url={area.newsRSS} /> : '';
    const MediaReleasesComponent = area.mediaRSS !== null ? <MediaReleases url={area.mediaRSS} /> : '';
    const supporters = area.supporters.map((supporter) => { // eslint-disable-line
      return (
        <div key={`supporter-${supporter.name}`}>
          <img src={supporter.logo.url} alt={supporter.name} />
        </div>
      );
    });
    const supportersComponent = area.supporters !== null ? (
      <center>
        <H1 style={{ fontSize: 48, lineHeight: '50px', paddingTop: 15 }}>Our Supporters</H1>
        <Divider />
        <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
        <div style={{ display: 'inline-flex', flexDirection: 'row' }}>{supporters}</div>
      </center>
    ) : '';

    return (
      <div style={{ overflow: 'hidden' }}>
        <Hero src={area.hero.url} alt={area.hero.title} />
        <Section style={{ paddingTop: 30 }}>
          <Grid fluid>
            <Row>
              <Col md={4} />
              <Col md={5} style={{ paddingLeft: 0 }}>
                <Breadcrumbs slug={slug} location={match} research />
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
          <ProgramTiles slug={slug} />
        </Section>
        <Section>
          {LatestNewsComponent}
        </Section>
        <Section>
          {MediaReleasesComponent}
        </Section>
        <Section>
          <Grid fluid>
            <Row>
              <Col md={1} />
              <Col md={4} team>
                <Container>
                  <H3>The Team</H3>
                  <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
                  <Link to={`/team/${slug}`}>
                    <Button id="team">
                      Get to know our researchers <ChevronRight style={{ fontSize: 30 }} />
                    </Button>
                  </Link>
                </Container>
              </Col>
            </Row>
            <Row style={{ marginTop: 80 }}>
              <Col md={6} />
              <Col md={4}>
                <Container>
                  <H3>Read Our Work</H3>
                  <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
                  <Link to={`/publications/${slug}`}>
                    <Button id="publications">
                      Find our publications <ChevronRight style={{ fontSize: 30 }} />
                    </Button>
                  </Link>
                </Container>
              </Col>
            </Row>
          </Grid>
        </Section>
        <Section>
          {supportersComponent}
        </Section>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchAreaContent.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default graphql(getResearchArea, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ResearchAreaContent);
