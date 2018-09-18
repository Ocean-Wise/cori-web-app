/**
*
* ResearchOverviewTilesIe
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import client from 'utils/contentful';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import HoverContainer from './HoverContainer';
import Tile from './Tile';
import H1 from './H1';
import P from './P';

class ResearchOverviewTilesIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    areas: [],
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'researchArea',
    }).then((res) => this.setAreas(res.items))
      .catch();
  }

  setAreas = (areas) => {
    this.setState({ areas });
  }

  render() {
    let { areas } = this.state;
    try {
      const topRow = [];
      const cori = areas.find((x) => x.fields.slug === 'cori');
      const va = areas.find((x) => x.fields.slug === 'vancouver-aquarium');

      topRow.push(
        <Col key="cori-tile" md={6} style={{ padding: 0 }}>
          <Tile id="tile-1" image={cori.fields.hero ? cori.fields.hero.fields.file.url : null} width="100%" imageAlign={cori.fields.imageAlign}>
            <div id="hover" style={{ zIndex: 10, position: 'relative', bottom: 100, padding: 30 }}>
              <H1>{cori.fields.title}</H1>
              <P>{cori.fields.subheader}</P>
              <center>
                <Link to={`/research/${cori.fields.slug}`}>
                  <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                    <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                  </Button>
                </Link>
              </center>
            </div>
            <span id="topTitle" className="initialTitle">{cori.fields.title}</span>
            {cori.fields.imageAttribution ? <span id="attribution">{cori.fields.imageAttribution}</span> : ''}
          </Tile>
        </Col>
      );
      topRow.push(
        <Col key="va-tile" md={6} style={{ padding: 0 }}>
          <Tile id="tile-1" image={va.fields.hero ? va.fields.hero.fields.file.url : null} width="100%" imageAlign={va.fields.imageAlign}>
            <div id="hover" style={{ zIndex: 10, position: 'relative', bottom: 100, padding: 30 }}>
              <H1>{va.fields.title}</H1>
              <P>{va.fields.subheader}</P>
              <center>
                <Link to={`/research/${va.fields.slug}`}>
                  <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                    <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginRight: -15 }} /></span>
                  </Button>
                </Link>
              </center>
            </div>
            <span id="topTitle" className="initialTitle">{va.fields.title}</span>
            {va.fields.imageAttribution ? <span id="attribution">{va.fields.imageAttribution}</span> : ''}
          </Tile>
        </Col>
      );
      areas = areas.filter((el) => { // eslint-disable-line
        let bool = true;
        if (el.fields.slug === 'cori' || el.fields.slug === 'vancouver-aquarium') bool = !bool;
        return bool;
      });

      const subsequentRows = [];
      let row = [];
      areas.map((area, i) => {
        row.push(
          <Col key={`${area.fields.slug}-tile`} md={6} lg={3} style={{ padding: 0 }}>
            <Tile last id={`tile-${i.toString()}`} image={area.fields.hero ? area.fields.hero.fields.file.url : null} width="100%" imageAlign={area.fields.imageAlign}>
              <HoverContainer>
                <H1>{area.fields.title}</H1>
                <P>{area.fields.subheader}</P>
                <center>
                  <Link to={`/research/${area.fields.slug}`}>
                    <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                      <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginRight: -15 }} /></span>
                    </Button>
                  </Link>
                </center>
              </HoverContainer>
              <span className="initialTitle subsequent"><div id="spotlight">Spotlight</div>{area.fields.title}</span>
              {area.fields.imageAttribution ? <span id="attribution">{area.fields.imageAttribution}</span> : ''}
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
      return <div />;
    }
  }
}

ResearchOverviewTilesIe.propTypes = {

};

export default ResearchOverviewTilesIe;
