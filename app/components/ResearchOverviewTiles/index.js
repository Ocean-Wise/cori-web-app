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
// import { Grid, Row, Col } from 'react-flexbox-grid';

function ResearchOverviewTiles({ data: { researchAreas } }) { // eslint-disable-line

  try {
    let areas = researchAreas;
    const topRow = [];
    const cori = areas.find((x) => x.slug === 'cori');
    const va = areas.find((x) => x.slug === 'vancouver-aquarium');
    topRow.push(
      <Tile id="tile-1" image={cori.hero.url} width="100%">
        <div style={{ zIndex: 10, position: 'relative', top: 65, padding: 30 }}>
          <H1>{cori.title}</H1>
          <P>{cori.subheader}</P>
          <center>
            <Link to={`/research/${cori.slug}`} style={{ border: '1px solid #FFFFFF', padding: 15, position: 'relative', top: 30 }}>
              <span className="explore">Explore &gt;</span>
            </Link>
          </center>
        </div>
        <span className="initialTitle">{cori.title}</span>
      </Tile>
    );
    topRow.push(
      <Tile id="tile-1" image={va.hero.url} width="100%">
        <div style={{ zIndex: 10, position: 'relative', top: 65, padding: 30 }}>
          <H1>{va.title}</H1>
          <P>{va.subheader}</P>
          <center>
            <Link to={`/research/${va.slug}`} style={{ border: '1px solid #FFFFFF', padding: 15, position: 'relative', top: 30 }}>
              <span className="explore">Explore &gt;</span>
            </Link>
          </center>
        </div>
        <span className="initialTitle">{va.title}</span>
      </Tile>
    );
    areas = areas.filter((el) => { // eslint-disable-line
      let bool = true;
      if (el.slug === 'cori' || el.slug === 'vancouver-aquarium') bool = !bool;
      return bool;
    });

    const subsequentRows = [];
    let row = [];
    areas.map((area, i) => {
      row.push(
        <Tile id={`tile-${i.toString()}`} image={area.hero.url} width="25%">
          <div style={{ zIndex: 10, position: 'relative', top: 65, padding: 30 }}>
            <H1>{area.title}</H1>
            <P>{area.subheader}</P>
            <center>
              <Link to={`/research/${area.slug}`} style={{ border: '1px solid #FFFFFF', padding: 15, position: 'relative', top: 30 }}>
                <span className="explore">Explore &gt;</span>
              </Link>
            </center>
          </div>
          <span className="initialTitle subsequent">{area.title}</span>
        </Tile>
      );
      if (i !== 0 && i % 4 === 0) {
        subsequentRows.push(
          <Row>
            {row}
          </Row>
        );
        row = [];
      }
      return true;
    });
    subsequentRows.push(<Row>{row}</Row>);
    return (
      <Container>
        <Row>
          {topRow}
        </Row>
        {subsequentRows}
      </Container>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchOverviewTiles.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getAllResearchAreas)(ResearchOverviewTiles);
