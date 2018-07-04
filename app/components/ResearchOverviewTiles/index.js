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

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import HoverContainer from './HoverContainer';
import Tile from './Tile';
import H1 from './H1';
import P from './P';

function ResearchOverviewTiles({ data: { researchAreas } }) { // eslint-disable-line

  try {
    let areas = researchAreas;
    const topRow = [];
    const cori = areas.find((x) => x.slug === 'cori');
    const va = areas.find((x) => x.slug === 'vancouver-aquarium');
    topRow.push(
      <Col key="cori-tile" md={6} style={{ padding: 0 }}>
        <Tile id="tile-1" image={cori.hero.url} width="100%">
          <div id="hover" style={{ zIndex: 10, position: 'relative', top: 65, padding: 30 }}>
            <H1>{cori.title}</H1>
            <P>{cori.subheader}</P>
            <center>
              <Link to={`/research/${cori.slug}`}>
                <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                  <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                </Button>
              </Link>
            </center>
          </div>
          <span id="topTitle" className="initialTitle">{cori.title}</span>
        </Tile>
      </Col>
    );
    topRow.push(
      <Col key="va-tile" md={6} style={{ padding: 0 }}>
        <Tile id="tile-1" image={va.hero.url} width="100%">
          <div id="hover" style={{ zIndex: 10, position: 'relative', top: 65, padding: 30 }}>
            <H1>{va.title}</H1>
            <P>{va.subheader}</P>
            <center>
              <Link to={`/research/${va.slug}`}>
                <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                  <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginRight: -15 }} /></span>
                </Button>
              </Link>
            </center>
          </div>
          <span id="topTitle" className="initialTitle">{va.title}</span>
        </Tile>
      </Col>
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
        <Col key={`${area.slug}-tile`} md={6} lg={3} style={{ padding: 0 }}>
          <Tile last id={`tile-${i.toString()}`} image={area.hero.url} width="100%">
            <HoverContainer>
              <H1>{area.title}</H1>
              <P>{area.subheader}</P>
              <center>
                <Link to={`/research/${area.slug}`}>
                  <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                    <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginRight: -15 }} /></span>
                  </Button>
                </Link>
              </center>
            </HoverContainer>
            <span className="initialTitle subsequent"><div id="hotTopic">Hot Topic</div>{area.title}</span>
          </Tile>
        </Col>
      );
      if (i !== 0 && i % 4 === 0) {
        subsequentRows.push(
          <Row key={`row-${i.toString()}`}>
            {row}
          </Row>
        );
        row = [];
      }
      return true;
    });

    subsequentRows.push(
      <div key={'subsequent'} style={{ display: 'flex', boxSizing: 'border-box', flex: '0 1 auto', WebkitBoxOrient: 'horizontal', WebkitBoxDirection: 'normal', flexDirection: 'row', flexWrap: 'wrap', marginLeft: -8, marginRight: -8 }}>
        {row}
      </div>
    );

    return (
      <Grid fluid style={{ padding: 0, overflow: 'hidden', marginBottom: -48 }}>
        <Row>
          {topRow}
        </Row>
        {subsequentRows}
      </Grid>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchOverviewTiles.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getAllResearchAreas)(ResearchOverviewTiles);
