/**
*
* PublicationContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import getPublicationCopy from 'graphql/queries/getPublicationCopy.graphql';
import Container from './Container';
import H3 from './H3';

function PublicationContent({ data: { publicationCopies } }) {
  try {
    return (
      <Container>
        <center>
          <h1>Publications</h1>
          <H3>{publicationCopies[0].copy}</H3>
        </center>
      </Container>
    );
  } catch (err) {
    return <div></div>;
  }
}

PublicationContent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getPublicationCopy)(PublicationContent);
