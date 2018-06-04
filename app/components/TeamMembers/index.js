/**
*
* Teampersons
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import teamQuery from 'graphql/queries/getAllPeople.graphql';

import Divider from './Divider';
import Wrapper from './Wrapper';
import Person from './Person';
import Img from './Img';

/*
 * Returns all the people in the CMS
 *
 */
function Teampersons({ data: { people } }) {
  let renderedPeople;
  try {
    renderedPeople = people.map((person, i) => { // eslint-disable-line
      let honorific = '';
      if (person.honorifictitle !== null) {
        honorific = `${person.honorifictitle}. `;
      }
      let phone = '';
      if (person.phone !== null) {
        phone = <span>{person.phone}</span>;
      }

      return (
        <Person key={`person-${i.toString()}`}>
          <Img src={person.image.url} alt={person.image.title} />
          <div>{honorific}{person.first} {person.last}</div>
          <Divider />
          <div>
            <span className="bold">{person.position}</span>
            {phone}
            <span>{person.email}</span>
          </div>
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

Teampersons.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(teamQuery)(Teampersons);
