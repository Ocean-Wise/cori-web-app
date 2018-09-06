/**
*
* TeamMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import teamQuery from 'graphql/queries/getAllPeople.graphql';
import PersonModal from 'components/PersonModal/Loadable';

import Wrapper from './Wrapper';

/*
 * Returns all the people in the CMS
 *
 */
function TeamMembers({ data: { people }, member }) {
  let renderedPeople;
  try {
    renderedPeople = people.map((person, i) => { // eslint-disable-line
      return (
        <PersonModal key={`person-${i.toString()}`} person={person} active={person.slug === member} />
      );
    });
  } catch (err) {
    renderedPeople = [];
  }
  return (
    <Wrapper>
      {renderedPeople}
    </Wrapper>
  );
}

TeamMembers.propTypes = {
  data: PropTypes.object.isRequired,
  member: PropTypes.string,
};

export default graphql(teamQuery)(TeamMembers);
