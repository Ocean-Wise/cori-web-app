/**
*
* ProjectTiles
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAllPrograms from 'graphql/queries/getAllPrograms.graphql';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import H1 from './H1';
import Divider from './Divider';
import Tile from './Tile';
import Img from './Img';
import Title from './Title';

function ProjectTiles({ data: { programs } }) {
  try {
    const tiles = [];
    programs.map((program, i) => {
      tiles.push(
        <Link to={`/program/${program.slug}`} key={`programLink-${i.toString()}`}>
          <Tile>
            <Img src={program.hero.url} />
            <Title>{program.title}</Title>
          </Tile>
        </Link>
      );
      return true;
    });
    return (
      <Grid fluid>
        <Row>
          <Col md={4}>
            <div style={{ textAlign: 'center' }}>
              <Divider />
              <H1>
                <FormattedMessage {...messages.header} />
              </H1>
            </div>
          </Col>
          <Col md={5}>
            <Row style={{ marginBottom: 0 }}>
              {tiles}
              {tiles}
            </Row>
            <Row>
              {tiles}
              {tiles}
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProjectTiles.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getAllPrograms)(ProjectTiles);
