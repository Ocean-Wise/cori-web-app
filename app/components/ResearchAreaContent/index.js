/**
*
* ResearchAreaContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getResearchArea from 'graphql/queries/getResearchArea.graphql';

function ResearchAreaContent({ data: { researchAreas } }) {
  let programs;
  let area = {};
  try {
    area = researchAreas[0];

    programs = area.programs.map((program, i) => { // eslint-disable-line
      return (
        <li key={`program-${i.toString()}`}>
          <Link to={`/program/${program.slug}`}>
            {program.title}
          </Link>
        </li>
      );
    });
  } catch (err) {
    programs = [];
  }

  return (
    <div>
      <h1>{area.title}</h1>
      <h3>Programs under this research area:</h3>
      <ul>
        {programs}
      </ul>
    </div>
  );
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
