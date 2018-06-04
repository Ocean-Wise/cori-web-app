/**
*
* ProjectMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import researchAreaQuery from 'graphql/queries/getResearchArea.graphql';

import Wrapper from './Wrapper';
import Divider from './Divider';
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
function AreaMembers({ data: { researchAreas } }) {
  let members;
  try {
    members = researchAreas[0].teamMembers.map((member, i) => { // eslint-disable-line
      let honorific = '';
      if (member.honorifictitle !== null) {
        honorific = `${member.honorifictitle}. `;
      }
      let phone = '';
      if (member.phone !== null) {
        phone = <span>{member.phone}</span>;
      }

      return (
        <Person key={`member-${i.toString()}`}>
          <Img src={member.image.url} alt={member.image.title} />
          <div>{honorific}{member.first} {member.last}</div>
          <Divider />
          <div>
            <span className="bold">{member.position}</span>
            {phone}
            <span>{member.email}</span>
          </div>
        </Person>
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
