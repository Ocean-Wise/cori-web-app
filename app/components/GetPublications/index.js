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
import { createFilter } from 'react-search-input';

const KEYS_TO_FILTER = ['title', 'authors', 'year', 'abstract', 'keywords'];

function GetPublications({ data: { publications }, sort, alpha, addToList, removeFromList, selected, match, searchTerm }) {
  const output = [];
  try {
    const sortDesc = (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10);
    const sortAsc = (a, b) => parseInt(a.year, 10) - parseInt(b.year, 10);
    let sorted = [...publications].sort(
      sort === 'asc' ? sortAsc : sortDesc
    );
    if (alpha) {
      if (sort === 'asc') {
        sorted = sorted.sort(
          (a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          }
        );
      } else {
        sorted = sorted.sort(
          (a, b) => {
            if (a.title < b.title) return 1;
            if (a.title > b.title) return -1;
            return 0;
          }
        );
      }
    }
    sorted.forEach((publication, i) => {
      let isSelected = false;
      selected.some((item, index) => {
        if (selected[index].key === publication.slug) {
          isSelected = true;
          return true;
        }
        return false;
      });
      if (match.params.slug === undefined) {
        output.push({
          title: publication.title,
          authors: publication.authors.join(),
          year: publication.year,
          abstract: publication.abstract,
          keywords: publication.keywords.join(),
          item: <PublicationCard isSelected={isSelected} addToList={addToList} removeFromList={removeFromList} data={publication} name={publication.slug} index={i} max={sorted.length} key={publication.slug} />,
        });
      } else if (match.params.slug === publication.researchArea.slug) {
        output.push({
          title: publication.title,
          authors: publication.authors.join(),
          year: publication.year,
          abstract: publication.abstract,
          keywords: publication.keywords.join(),
          item: <PublicationCard isSelected={isSelected} addToList={addToList} removeFromList={removeFromList} data={publication} name={publication.slug} index={i} max={sorted.length} key={publication.slug} />,
        });
      }
    });
    // return output;
    const filteredOutput = output.filter(createFilter(searchTerm, KEYS_TO_FILTER));
    return (
      <div>
        {filteredOutput.map((item) => item.item)}
      </div>
    );
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
  addToList: PropTypes.func,
  removeFromList: PropTypes.func,
  match: PropTypes.object,
  searchTerm: PropTypes.string,
};

export default graphql(getPublications)(GetPublications);
