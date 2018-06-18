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

function GetPublications({ data: { publications }, sort, alpha, addToList, removeFromList, selected, match }) {
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
    sorted.forEach((publication) => {
      let isSelected = false;
      selected.some((item, index) => {
        if (selected[index].key === publication.slug) {
          isSelected = true;
          return true;
        }
        return false;
      });

      if (match.params.slug === undefined) {
        output.push(<PublicationCard isSelected={isSelected} addToList={addToList} removeFromList={removeFromList} data={publication} index={publication.slug} key={publication.slug} />);
      } else if (match.params.slug === publication.researchArea.slug) {
        output.push(<PublicationCard isSelected={isSelected} addToList={addToList} removeFromList={removeFromList} data={publication} index={publication.slug} key={publication.slug} />);
      }
    });
    return output;
  } catch (err) {
    return null;
  }

  // return output;
}

GetPublications.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.object.isRequired,
  sort: PropTypes.string,
  alpha: PropTypes.bool,
};

export default graphql(getPublications)(GetPublications);
