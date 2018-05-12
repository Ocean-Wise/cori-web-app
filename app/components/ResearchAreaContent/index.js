/**
*
* ResearchAreaContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import getResearchArea from 'graphql/queries/getResearchArea.graphql';

import ProjectTiles from 'components/ProjectTiles';
import Hero from './Hero';
import Container from './Container';
import H1 from './H1';
import H2 from './H2';

function ResearchAreaContent({ data: { researchAreas } }) {
  // let programs;
  let area = {};
  try {
    // console.log(researchAreas[0]);
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

    return (
      <div>
        <Hero src={area.hero.url} alt={area.hero.title} />
        <Container>
          <H1>{area.title}</H1>
          <H2>{area.subheader}</H2>
          <ReactMarkdown source={area.copy} />
          <ProjectTiles />
        </Container>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchAreaContent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getResearchArea, {
  options: (props) => ({
    variables: {
      area: `fields.slug=${props.slug}`,
    },
  }),
})(ResearchAreaContent);
