/**
*
* ResearchOverviewTiles
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAllResearchAreas from 'graphql/queries/getAllResearchAreas.graphql';

import Container from './Container';
import Row from './Row';
import Tile from './Tile';
import H1 from './H1';
import P from './P';

function ResearchOverviewTiles({ data: { researchAreas }, first, second, third, fourth, fifth, width }) { // eslint-disable-line
  try {
    if (width < 992) {
      return (
        <Container>
          <Row>
            <Tile id="tile-1" image={researchAreas[0].hero.url} width="100%">
              <span>Coastal Ocean Research Institute</span>
            </Tile>
            <Tile image={`http://via.placeholder.com/${first}x460`} width="100%">
              <span>Vancouver Aquarium</span>
            </Tile>
          </Row>
          <Row>
            <Tile id="tile-2" image={`http://via.placeholder.com/${second}x460`} width="50%">
              <span>Arctic</span>
            </Tile>
            <Tile id="tile-3" image={`http://via.placeholder.com/${third}x460`} width="50%">
              <span>Plastic</span>
            </Tile>
          </Row>
          <Row>
            <Tile id="tile-4" image={`http://via.placeholder.com/${fourth}x460`} width="50%">
              <span>Special Places</span>
            </Tile>
            <Tile id="tile-5" image={`http://via.placeholder.com/${fifth}x460`} width="50%">
              <span>Threatened Species</span>
            </Tile>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <Tile id="tile-1" image={researchAreas[0].hero.url} width="100%">
            <div style={{ zIndex: 10, position: 'relative', top: 65, padding: 30 }}>
              <H1>{researchAreas[0].title}</H1>
              <P>{researchAreas[0].subheader}</P>
              <center>
                <Link to={`/research/${researchAreas[0].slug}`} style={{ border: '1px solid #FFFFFF', padding: 15, position: 'relative', top: 30 }}>
                  <span className="explore">Explore &gt;</span>
                </Link>
              </center>
            </div>
            <span className="initialTitle">Coastal Ocean Research Institute</span>
          </Tile>
          <Tile image={`http://via.placeholder.com/${first}x460`} width="100%">
            <span>Vancouver Aquarium</span>
          </Tile>
        </Row>
        <Row>
          <Tile id="tile-2" image={`http://via.placeholder.com/${second}x460`} width="25%">
            <span>Arctic</span>
          </Tile>
          <Tile id="tile-3" image={`http://via.placeholder.com/${third}x460`} width="25%">
            <span>Plastic</span>
          </Tile>
          <Tile id="tile-4" image={`http://via.placeholder.com/${fourth}x460`} width="25%">
            <span>Special Places</span>
          </Tile>
          <Tile id="tile-5" image={`http://via.placeholder.com/${fifth}x460`} width="25%">
            <span>Threatened Species</span>
          </Tile>
        </Row>
      </Container>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchOverviewTiles.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  first: PropTypes.number,
  second: PropTypes.number,
  third: PropTypes.number,
  fourth: PropTypes.number,
  fifth: PropTypes.number,
};

export default graphql(getAllResearchAreas)(ResearchOverviewTiles);
