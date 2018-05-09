/**
*
* TeamMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import teamQuery from 'graphql/queries/getAllPeople.graphql';

import Wrapper from './Wrapper';
import Person from './Person';
import Img from './Img';

/*
 * Returns all the people in the CMS
 *
 */
function TeamMembers({ data: { people } }) {
  let renderedPeople;
  try {
    renderedPeople = people.map((person, i) => { // eslint-disable-line
      return (
        <Person key={`member-${i.toString()}`}>
          <Img src={person.image.url} alt={person.image.title} /><br />
          <span>{person.honorifictitle}. {person.first} {person.last}</span>
        </Person>
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
};

export default graphql(teamQuery)(TeamMembers);
