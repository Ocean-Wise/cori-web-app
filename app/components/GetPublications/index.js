/**
*
* GetPublications
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import getPublications from 'graphql/queries/getPublications.graphql';
import PublicationCard from 'components/PublicationCard';

function GetPublications({ data: { publications }, sort, alpha }) {
  const output = [];
  try {
    const sortDesc = (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10);
    const sortAsc = (a, b) => parseInt(a.year, 10) - parseInt(b.year, 10);
    let sorted = [...publications].sort(
      sort === 'asc' ? sortAsc : sortDesc
    );
    if (alpha) {
      sorted = sorted.sort(
        (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        }
      );
    }
    sorted.forEach((publication, i) => {
      output.push(<PublicationCard data={publication} key={i.toString()} />);
    });
    return output;
  } catch (err) {
    return null;
  }

  // return output;
}

GetPublications.propTypes = {
  data: PropTypes.object.isRequired,
  sort: PropTypes.string,
  alpha: PropTypes.bool,
};

export default graphql(getPublications)(GetPublications);
