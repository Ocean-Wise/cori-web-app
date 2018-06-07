/**
*
* ProgramTiles
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getRAPrograms from 'graphql/queries/getRAPrograms.graphql';
import { Col } from 'react-flexbox-grid';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Container from './Container';
import Grid from './Grid';
import Row from './Row';
import H1 from './H1';
import Divider from './Divider';
import Tile from './Tile';
import Title from './Title';

function ProgramTiles({ data: { researchAreas }, width }) {
  try {
    const tiles = [];
    researchAreas[0].programs.map((program, i) => {
      tiles.push(
        <Link to={`/program/${program.slug}`} key={`programLink-${i.toString()}`}>
          <Tile image={program.hero.url} width={width}>
            <Title>{program.title}</Title>
          </Tile>
        </Link>
      );
      return true;
    });
    return (
      <Grid fluid>
        <Row>
          <Col xl={4}>
            <Container>
              <Divider />
              <H1>
                <FormattedMessage {...messages.header} />
              </H1>
            </Container>
          </Col>
          <Col xl={7}>
            <Row tileContainer>
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

ProgramTiles.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number,
};

export default graphql(getRAPrograms, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProgramTiles);
