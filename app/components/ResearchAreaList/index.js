/**
*
* ResearchAreaList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAllResearchAreas from 'graphql/queries/getAllResearchAreas.graphql';

function ResearchAreaList({ data: { researchAreas } }) {
  console.log(researchAreas);
  let links;
  try {
    links = researchAreas.map((area, i) => { // eslint-disable-line
      return (
        <li key={`ra-${i.toString()}`}>
          <Link to={`/research/${area.slug}`}>
            {area.title}
          </Link>
        </li>
      );
    });
  } catch (err) {
    links = [];
  }
  return (
    <ul>
      {links}
    </ul>
  );
}

ResearchAreaList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getAllResearchAreas)(ResearchAreaList);
