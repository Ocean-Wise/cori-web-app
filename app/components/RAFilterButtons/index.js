/**
*
* RAFilterButtons
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAreas from 'graphql/queries/getResearchAreaTeasers.graphql';
import Button from 'components/Button';
import Container from './Container';

function RAFilterButtons({ data: { researchAreas }, filter }) {
  try {
    const buttons = [];
    const location = /[a-z]+/g.exec(filter.url)[0];
    researchAreas.forEach((area) => {
      const key = `button-${area.slug}`;
      buttons.push(
        <Link key={key} to={`/${location}/${area.slug}`}>
          <Button noBorder selected={filter.params.slug === area.slug} id={key}>
            {area.title}
          </Button>
        </Link>
      );
    });
    // Sort for CORI and VA to be 0 and 1, respectively
    let coriIndex;
    let vaIndex;
    buttons.map((item, i) => {
      if (item.key === 'button-cori') coriIndex = i;
      return true;
    });
    let tmp = buttons[0];
    buttons[0] = buttons[coriIndex];
    buttons[coriIndex] = tmp;

    buttons.map((item, i) => {
      if (item.key === 'button-vancouver-aquarium') vaIndex = i;
      return true;
    });
    tmp = buttons[1];
    buttons[1] = buttons[vaIndex];
    buttons[vaIndex] = tmp;

    // Add All button to position 0
    buttons.unshift(
      <Link to={`/${location}`} key="button-all">
        <Button noBorder selected={filter.path === `/${location}`} id="button-all">
          All
        </Button>
      </Link>
    );
    return (
      <Container>
        {buttons}
      </Container>
    );
  } catch (err) {
    // An error occurred
    return <div></div>;
  }
}

RAFilterButtons.propTypes = {
  data: PropTypes.object.isRequired,
  filter: PropTypes.object,
};

export default graphql(getAreas)(RAFilterButtons);
