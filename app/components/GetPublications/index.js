/**
*
* GetPublications
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import getPublications from 'graphql/queries/getPublications.graphql';
import PublicationCard from 'components/PublicationCard/Loadable';

function GetPublications({ data: { publications }, addToList, removeFromList, selected, match }) {
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
    if (output.length > 0) {
      return (
        <div style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.24), 8px -8px 0 0 #CCF0EA', maxWidth: 1120, margin: '0 auto', overflow: 'hidden' }}>
          {output.map((item) => item.item)}
        </div>
      );
    } else { // eslint-disable-line
      return (
        <div />
      );
    }
  } catch (err) {
    return null;
  }
}

GetPublications.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.object.isRequired,
  addToList: PropTypes.func,
  removeFromList: PropTypes.func,
  match: PropTypes.object,
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
