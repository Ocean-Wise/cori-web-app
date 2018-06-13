/**
 *
 * Publications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import GetPublications from 'components/GetPublications';
import Header from 'components/Header';
// import { createClient } from 'contentful';
// import { AutoSizer, List } from 'react-virtualized';

// const client = createClient({
//   space: 'fsquhe7zbn68',
//   accessToken: 'b1cb5f035189ddc9c2e21ad0746109e08620755b3db8ad6655852295e6baba00',
// });

export class Publications extends React.PureComponent { // eslint-disable-line
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     publications: [],
  //   };
  // }

  // componentWillMount() {
  //   client.getEntries({
  //     content_type: 'researchPapers',
  //   })
  //   .then((content) => {
  //     const publications = [];
  //     content.items.forEach((entry) => {
  //       // Create our Publication object for the current entry
  //       const item = {
  //         objectID: entry.fields.slug,
  //         authors: entry.fields.authors.join(';'),
  //         title: entry.fields.title,
  //         journal: entry.fields.journal,
  //         volume: entry.fields.volume,
  //         number: entry.fields.number,
  //         pages: entry.fields.pages,
  //         year: parseInt(entry.fields.year, 10),
  //       };
  //       // Add our Publication object to our publications array
  //       publications.push(item);
  //     });
  //     return publications;
  //   })
  //   .then((publications) => {
  //     this.setState({ publications });
  //   });
  // }

  render() {
    return (
      <div>
        <Helmet>
          <title>Publications</title>
          <meta name="description" content="Description of Publications" />
        </Helmet>
        <Header />
        <GetPublications />
      </div>
    );
  }
}

Publications.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Publications);
