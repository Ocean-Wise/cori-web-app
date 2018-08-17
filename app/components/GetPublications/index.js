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

function GetPublications({ data: { publications }, addToList, removeFromList, selected, match, searchTerm }) {
  const output = [];
  try {
    publications.forEach((publication, i) => {
      let isSelected = false;
      selected.some((item, index) => {
        if (selected[index].key === publication.slug) {
          isSelected = true;
          return true;
        }
        return false;
      });
      if (match === undefined || match.params.slug === undefined) {
        output.push({
          title: publication.title,
          authors: publication.authors.join(),
          year: publication.year,
          abstract: publication.abstract,
          keywords: publication.keywords ? publication.keywords.join() : null,
          item: <PublicationCard isSelected={isSelected} addToList={addToList} removeFromList={removeFromList} data={publication} name={publication.slug} index={i} max={publications.length} key={publication.slug} />,
        });
      } else if (publication.researchArea !== null && match.params.slug === publication.researchArea.slug) {
        output.push({
          title: publication.title,
          authors: publication.authors.join(),
          year: publication.year,
          abstract: publication.abstract,
          keywords: publication.keywords ? publication.keywords.join() : null,
          item: <PublicationCard isSelected={isSelected} addToList={addToList} removeFromList={removeFromList} data={publication} name={publication.slug} index={i} max={publications.length} key={publication.slug} />,
        });
      }
    });
    // return output;
    let filteredOutput;
    if (searchTerm !== undefined) {
      filteredOutput = output.filter(createFilter(searchTerm, KEYS_TO_FILTER));
    } else {
      filteredOutput = output;
    }
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
  // sort: PropTypes.string,
  // alpha: PropTypes.bool,
  addToList: PropTypes.func,
  removeFromList: PropTypes.func,
  match: PropTypes.object,
  searchTerm: PropTypes.string,
};

export default graphql(getPublications, {
  options: (props) => ({
    variables: {
      limit: props.limit,
      skip: props.skip,
      sort: `${props.order}${props.match.params.slug ? `&fields.researchArea.sys.contentType.sys.id=researchArea&fields.researchArea.fields.slug[match]=${props.match.params.slug}` : ''}`,
    },
  }),
})(GetPublications);
