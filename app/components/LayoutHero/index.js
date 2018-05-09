/**
*
* LayoutCopy
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getLayoutHero from 'graphql/queries/getLayoutHero.graphql';

function LayoutHero({ data: { layoutHero } }) {
  let title;
  let image;
  try {
    title = layoutHero.image.title;
    image = layoutHero.image.url;
  } catch (err) {
    title = '';
    image = '';
  }
  return (
    <div>
      <h1>Hero: {title}</h1>
      <img style={{ width: '100%' }} src={image} alt={title} />
    </div>
  );
}

LayoutHero.propTypes = {
  data: PropTypes.object.isRequired,
  heroId: PropTypes.string,
};

export default graphql(getLayoutHero, {
  options: (props) => ({
    variables: {
      heroId: props.heroId,
    },
  }),
})(LayoutHero);
