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
import LatestNews from 'components/LatestNews/Loadable';
import MediaReleases from 'components/MediaReleases/Loadable';
// import Button from 'components/Button';
import Hero from './Hero';
import Container from './Container';
import H1 from './H1';
import H2 from './H2';

function ResearchAreaContent({ data: { researchAreas }, slug }) {
  // let programs;
  let area = {};
  try {
    area = researchAreas[0];
    // programs = area.programs.map((program, i) => { // eslint-disable-line
    //   return (
    //     <li key={`program-${i.toString()}`}>
    //       <Link to={`/program/${program.slug}`}>
    //         {program.title}
    //       </Link>
    //     </li>
    //   );
    // });
    const LatestNewsComponent = area.newsRSS !== null ? <LatestNews url={area.newsRSS} /> : '';
    const MediaReleasesComponent = area.mediaRSS !== null ? <MediaReleases url={area.mediaRSS} /> : '';
    return (
      <div>
        <Hero src={area.hero.url} alt={area.hero.title} />
        <Container>
          <H1>{area.title}</H1>
          <H2>{area.subheader}</H2>
          <ReactMarkdown source={area.copy} />
          <ProjectTiles />
          {LatestNewsComponent}
          {MediaReleasesComponent}
          <div style={{ backgroundColor: '#efefef', padding: 10, marginTop: 80 }}>
            <center>
              <h3>The Team</h3>
              <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
              <Link to={`/team/${slug}`}>
                Get to know our researchers &gt;
              </Link>
            </center>
          </div>
          <div style={{ backgroundColor: '#efefef', padding: 10, marginTop: 35 }}>
            <center>
              <h3>Read Our Work</h3>
              <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
              <Link to={`/publications/${slug}`}>
                Find our publications &gt;
              </Link>
            </center>
          </div>
        </Container>
        <div style={{ backgroundColor: '#efefef' }}>
          <center>
            <h2>Our Supporters</h2>
            <hr style={{ width: 100 }} />
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
  slug: PropTypes.string,
};

export default graphql(getResearchArea, {
  options: (props) => ({
    variables: {
      area: `fields.slug=${props.slug}`,
    },
  }),
})(ResearchAreaContent);
