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
import { Grid, Col } from 'react-flexbox-grid';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Row from './Row';
import H1 from './H1';
import Divider from './Divider';
import Tile from './Tile';
import Title from './Title';

function ProgramTiles({ data: { researchAreas } }) {
  try {
    const tiles = [];
    researchAreas[0].programs.map((program, i) => {
      tiles.push(
        <Link to={`/program/${program.slug}`} key={`programLink-${i.toString()}`}>
          <Tile image={program.hero.url}>
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
            <div style={{ textAlign: 'center' }}>
              <Divider />
              <H1>
                <FormattedMessage {...messages.header} />
              </H1>
            </div>
          </Col>
          <Col xl={7}>
            <Row style={{ marginBottom: 0, width: 730 }}>
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
  // slug: PropTypes.string.isRequired, // eslint-dis
};

export default graphql(getRAPrograms, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProgramTiles);
