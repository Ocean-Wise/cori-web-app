/**
*
* TeamCopy
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import getTeamCopy from 'graphql/queries/getTeamCopy.graphql';

import Container from './Container';
import H3 from './H3';

function TeamCopy({ data: { teamCopies } }) {
  try {
    return (
      <Container>
        <h1>{teamCopies[0].headline}</h1>
        <H3>{teamCopies[0].copy}</H3>
      </Container>
    );
  } catch (err) {
    // An error occurred
    return <div></div>;
  }
}

TeamCopy.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getTeamCopy)(TeamCopy);
