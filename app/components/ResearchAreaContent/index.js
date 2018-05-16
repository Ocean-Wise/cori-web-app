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

import ProjectTiles from 'components/ProjectTiles';
import Breadcrumbs from 'components/Breadcrumbs';
import LatestNews from 'components/LatestNews/Loadable';
import MediaReleases from 'components/MediaReleases/Loadable';
import Button from 'components/Button';
import Hero from './Hero';
import Container from './Container';
import H1 from './H1';
import Divider from './Divider';
import H2 from './H2';
import MarkdownWrapper from './MarkdownWrapper';
import H3 from './H3';

function ResearchAreaContent({ data: { researchAreas }, slug, match }) {
  let area = {};
  try {
    area = researchAreas[0];
    const LatestNewsComponent = area.newsRSS !== null ? <LatestNews url={area.newsRSS} /> : '';
    const MediaReleasesComponent = area.mediaRSS !== null ? <MediaReleases url={area.mediaRSS} /> : '';
    return (
      <div>
        <Hero src={area.hero.url} alt={area.hero.title} />
        <Container>
          <Breadcrumbs slug={slug} location={match} research />
          <H1>{area.title}</H1>
          <Divider />
          <H2>{area.subheader}</H2>
          <MarkdownWrapper>
            <ReactMarkdown source={area.copy} />
          </MarkdownWrapper>
          <ProjectTiles />
          {LatestNewsComponent}
          {MediaReleasesComponent}
          <div style={{ backgroundColor: '#efefef', padding: 10, marginTop: 80 }}>
            <center>
              <H3>The Team</H3>
              <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
              <Link to={`/team/${slug}`}>
                <Button id="team">
                  Get to know our researchers &gt;
                </Button>
              </Link>
            </center>
          </div>
          <div style={{ backgroundColor: '#efefef', padding: 10, marginTop: 35 }}>
            <center>
              <H3>Read Our Work</H3>
              <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
              <Link to={`/publications/${slug}`}>
                <Button id="publications">
                  Find our publications &gt;
                </Button>
              </Link>
            </center>
          </div>
        </Container>
        <div style={{ backgroundColor: '#efefef', marginTop: 100 }}>
          <center>
            <H1 style={{ fontSize: 48, lineHeight: '50px', paddingTop: 15 }}>Our Supporters</H1>
            <Divider />
            <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
          </center>
        </div>
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
