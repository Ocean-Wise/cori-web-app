/**
*
* TeamFilterButtons
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAreas from 'graphql/queries/getResearchAreaTeasers.graphql';
import Button from 'components/Button';
import Container from './Container';

function TeamFilterButtons({ data: { researchAreas }, isFiltered }) {
  try {
    const buttons = [];
    researchAreas.forEach((area) => {
      const key = `button-${area.slug}`;
      buttons.push(
        <Link key={key} to={`/team/${area.slug}`}>
          <Button noBorder id={key}>
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

    // Has the user filtered by Research Area?
    if (isFiltered) {
      buttons.unshift(
        <Link to="/team">
          <Button noBorder id="button-all">
            All researchers
          </Button>
        </Link>
      );
    }

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

TeamFilterButtons.propTypes = {
  data: PropTypes.object.isRequired,
  isFiltered: PropTypes.bool,
};

export default graphql(getAreas)(TeamFilterButtons);
