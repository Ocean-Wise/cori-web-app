/**
*
* ProjectMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import researchAreaQuery from 'graphql/queries/getResearchArea.graphql';
import PersonModal from 'components/PersonModal/Loadable';

import Wrapper from './Wrapper';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/*
 * Returns the ProjectMembers for a particular project.
 * Requires the project's slug to be passed as a prop
 * to the component called in the parent container.
 *
 */
function AreaMembers({ data: { researchAreas } }) {
  let members;
  try {
    members = researchAreas[0].teamMembers
      .slice()
      .sort((a, b) => a.last.localeCompare(b.last))
      .map((member, i) => { // eslint-disable-line
        return (
          <PersonModal key={`person-${i.toString()}`} person={member} />
        );
      });
  } catch (err) {
    members = [];
  }

  return (
    <Wrapper>
      {members}
    </Wrapper>
  );
}

AreaMembers.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string, // eslint-disable-line
};

// Use the projectMemberQuery GraphQL query
// Pass a query string variable required to
// filter for our requested project
export default graphql(researchAreaQuery, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(AreaMembers);
