/**
*
* ProjectMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import projectMemberQuery from 'graphql/queries/getProjectMembers.graphql';

import Person from './Person';
import Img from './Img';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/*
 * Returns the ProjectMembers for a particular project.
 * Requires the project's slug to be passed as a prop
 * to the component called in the parent container.
 *
 */
function ProjectMembers({ data: { projects } }) {
  let members;
  try {
    members = projects[0].members.map((member, i) => { // eslint-disable-line
      return (
        <Person key={`member-${i.toString()}`}>
          <Img src={member.image.url} alt={member.image.title} /><br />
          <span>{member.honorifictitle}. {member.first} {member.last}</span>
        </Person>
      );
    });
  } catch (err) {
    members = [];
  }

  return (
    <div>
      {members}
    </div>
  );
}

ProjectMembers.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string, // eslint-disable-line
};

// Use the projectMemberQuery GraphQL query
// Pass a query string variable required to
// filter for our requested project
export default graphql(projectMemberQuery, {
  options: (props) => ({
    variables: {
      projectName: `fields.slug=${props.slug}`,
    },
  }),
})(ProjectMembers);
