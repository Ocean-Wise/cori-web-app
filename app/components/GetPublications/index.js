/**
*
* GetPublications
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import getPublications from 'graphql/queries/getPublications.graphql';

class ListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { publication } = this.props;
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={`publication-${this.props.index}`} className={listClass} style={style}>
        <h3>{publication.title}</h3>
        <h5>{publication.authors}</h5>
        <h6>{publication.journal}</h6>
        <span>{publication.year}</span>
      </li>
    );
  }
}

ListItem.propTypes = {
  publication: PropTypes.object,
  view: PropTypes.string,
  index: PropTypes.number,
};

function GetPublications({ data: { publications }, sort }) {
  const output = [];
  try {
    const sortDesc = (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10);
    const sortAsc = (a, b) => parseInt(a.year, 10) - parseInt(b.year, 10);
    const sorted = [...publications].sort(
        sort ? sortAsc : sortDesc
      );
    sorted.forEach((publication, i) => {
      output.push(<ListItem key={publication.slug} view={'list'} index={i} publication={publication} />);
    });
    console.log(sorted);
    return output;
  } catch (err) {
    return null;
  }

  // return output;
}

GetPublications.propTypes = {
  data: PropTypes.object.isRequired,
  sort: PropTypes.string,
};

export default graphql(getPublications)(GetPublications);
