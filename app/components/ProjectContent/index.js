/**
*
* ProjectContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import LayoutContent from 'containers/LayoutContent/Loadable';
import getProject from 'graphql/queries/getProject.graphql';

function ProjectContent({ data: { projects } }) {
  const moduleIds = {
    layoutHero: '',
    layoutCopy: '',
  };
  try {
    projects[0].layout.contentModules.map((module) => { // eslint-disable-line
      moduleIds[module.sys.contentTypeId] = module.sys.id;
    });
  } catch (err) {

  }
console.log(moduleIds);
  return (
    <div>
      <LayoutContent heroId={moduleIds.layoutHero} copyId={moduleIds.layoutCopy} />
    </div>
  );
}

ProjectContent.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string,
};

export default graphql(getProject, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProjectContent);
