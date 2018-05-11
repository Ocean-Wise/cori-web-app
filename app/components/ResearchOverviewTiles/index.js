/**
*
* ResearchOverviewTiles
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAllResearchAreas from 'graphql/queries/getAllResearchAreas.graphql';

import Container from './Container';
import Row from './Row';
import Tile from './Tile';

function ResearchOverviewTiles({ data: { researchAreas } }) { // eslint-disable-line
  return (
    <Container>
      <Row>
        <Tile image="http://via.placeholder.com/951x460" width="100%">
          <span>Coastal Ocean Research Institute</span>
        </Tile>
        <Tile image="http://via.placeholder.com/951x460" width="100%">
          <span>Vancouver Aquarium</span>
        </Tile>
      </Row>
      <Row>
        <Tile image="http://via.placeholder.com/601x460" width="31.7%">
          <span>Arctic</span>
        </Tile>
        <Tile image="http://via.placeholder.com/348x460" width="18.3%">
          <span>Plastic</span>
        </Tile>
        <Tile image="http://via.placeholder.com/348x460" width="18.3%">
          <span>Special Places</span>
        </Tile>
        <Tile image="http://via.placeholder.com/601x460" width="31.7%">
          <span>Threatened Species</span>
        </Tile>
      </Row>
    </Container>
  );
}

ResearchOverviewTiles.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getAllResearchAreas)(ResearchOverviewTiles);
