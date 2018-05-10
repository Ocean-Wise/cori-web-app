/**
*
* ProgramContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import LayoutContent from 'containers/LayoutContent';
import getProgram from 'graphql/queries/getProgram.graphql';

function ProgramContent({ data: { programs } }) {
  let initiatives;
  const moduleIds = {
    layoutHero: '',
    layoutCopy: '',
  };
  try {
    programs[0].layout.contentModules.map((module) => { // eslint-disable-line
      moduleIds[module.sys.contentTypeId] = module.sys.id;
    });

    initiatives = programs[0].initiatives.map((initiative, i) => {
      const projects = initiative.projects.map((project, j) => { // eslint-disable-line
        return (
          <li key={`project-${j.toString()}`}>
            <Link to={`/project/${project.slug}`}>
              {project.projectTitle}
            </Link>
          </li>
        );
      });
      return (
        <li key={`initiative-${i.toString()}`}>
          <h3>{initiative.title}</h3>
          <ul>
            {projects}
          </ul>
        </li>
      );
    });
  } catch (err) {

  }

  return (
    <div>
      <LayoutContent heroId={moduleIds.layoutHero} copyId={moduleIds.layoutCopy} />
      <h1>Initiatives under this program:</h1>
      <ul>
        {initiatives}
      </ul>
    </div>
  );
}

ProgramContent.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string,
};

export default graphql(getProgram, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProgramContent);
