/**
*
* ProjectTiles
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAllPrograms from 'graphql/queries/getAllPrograms.graphql';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import H1 from './H1';
import Divider from './Divider';
import Tile from './Tile';
import Img from './Img';
import Title from './Title';

function ProjectTiles({ data: { programs } }) {
  try {
    return (
      <div style={{ marginTop: 100 }}>
        <center>
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
          <Divider />
        </center>
        <Tile>
          <Img src={programs[0].hero.url} />
          <Title>{programs[0].title}</Title>
        </Tile>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProjectTiles.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getAllPrograms)(ProjectTiles);
