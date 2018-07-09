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

function PublicationContent({ data: { publicationCopies } }) {
  return (
    <Container>
      <center>
        <h1>Publications</h1>
        <p>{publicationCopies[0].copy}</p>
      </center>
    </Container>
  );
}

PublicationContent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getPublicationCopy)(PublicationContent);
