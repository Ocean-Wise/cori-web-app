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

function ResearchOverviewTiles({ data: { researchAreas }, first, second, third, fourth, fifth }) { // eslint-disable-line
  return (
    <Container>
      <Row>
        <Tile id="tile-1" image={`http://via.placeholder.com/${first}x460`} width="100%">
          <span>Coastal Ocean Research Institute</span>
        </Tile>
        <Tile image={`http://via.placeholder.com/${first}x460`} width="100%">
          <span>Vancouver Aquarium</span>
        </Tile>
      </Row>
      <Row>
        <Tile id="tile-2" image={`http://via.placeholder.com/${second}x460`} width="31.7%">
          <span>Arctic</span>
        </Tile>
        <Tile id="tile-3" image={`http://via.placeholder.com/${third}x460`} width="18.3%">
          <span>Plastic</span>
        </Tile>
        <Tile id="tile-4" image={`http://via.placeholder.com/${fourth}x460`} width="18.3%">
          <span>Special Places</span>
        </Tile>
        <Tile id="tile-5" image={`http://via.placeholder.com/${fifth}x460`} width="31.7%">
          <span>Threatened Species</span>
        </Tile>
      </Row>
    </Container>
  );
}

ResearchOverviewTiles.propTypes = {
  data: PropTypes.object.isRequired,
  first: PropTypes.number,
  second: PropTypes.number,
  third: PropTypes.number,
  fourth: PropTypes.number,
  fifth: PropTypes.number,
};

export default graphql(getAllResearchAreas)(ResearchOverviewTiles);
