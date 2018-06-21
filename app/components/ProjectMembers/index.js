/**
*
* ProjectMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import projectMemberQuery from 'graphql/queries/getProjectMembers.graphql';
import PersonModal from 'components/PersonModal/Loadable';

import Container from './Container';
import H1 from './H1';
import P from './P';

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
        <PersonModal key={`person-${i.toString()}`} person={member} />
      );
    });
  } catch (err) {
    members = [];
  }

  return (
    <div>
      <H1>Research Team</H1>
      <P>Vivamus non quam efficitur, consectetur ante sed, tincidunt tortor. Fusce ut tincidunt nisi, ac condimentum quam.</P>
      <Container>
        {members}
      </Container>
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
