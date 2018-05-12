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

import Tile from './Tile';
import Img from './Img';

function ProjectTiles({ data: { programs } }) {
  try {
    return (
      <div style={{ marginTop: 100 }}>
        <div style={{ color: '#4D4D4D', fontSize: 36, fontWeight: 'bold', lineHeight: '45px' }}>
          <FormattedMessage {...messages.header} />
        </div>
        <hr />
        <Tile>
          <Img src={programs[0].hero.url} alt={programs[0].hero.title} />
          <span>{programs[0].title}</span>
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
