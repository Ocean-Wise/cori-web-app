/**
*
* Breadcrumbs
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ResearchAreaTeaser from 'graphql/queries/getResearchAreaTeaser.graphql';
import ProgramTeaser from 'graphql/queries/getProgramTeaser.graphql';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Set up our variables pertaining to the query
let query;
let dataQuery;
let type;
if (location.href.match(/\/research\//g)) {
  // We are on a reasearch area page, so query the research area
  type = 'researchArea';
  query = ResearchAreaTeaser;
  dataQuery = 'researchAreas';
} else if (location.href.match(/\/program\//g)) {
  // We are an a program page, so query the program and its back references
  type = 'program';
  query = ProgramTeaser;
  dataQuery = 'programs';
}

// TODO: This will need an extra check to see if the /program/ is actually a 'Working Group'. Will need an extra query.
function Breadcrumbs({ data }) {
  try {
    // console.log(data[dataQuery][0]);
    // Initialize our breadcrumb string
    let string;
    switch (type) {
      case 'researchArea':
        // This is a research area, so highlight the title
        string = <span style={{ color: 'rgb(0, 179, 152)', fontWeight: 'bold', lineHeight: '18px' }}>{data[dataQuery][0].title}</span>;
        break;
      case 'program':
        // This is a program, so Link to the research area via backref, then highlight the program title
        string = <span><Link to={`/research/${data[dataQuery][0]._backrefs.researchAreas__via__programs[0].slug}`}>{data[dataQuery][0]._backrefs.researchAreas__via__programs[0].title}</Link> / <span style={{ color: 'rgb(0, 179, 152)', fontWeight: 'bold', lineHeight: '18px' }}>{data[dataQuery][0].title}</span></span>; // eslint-disable-line
        break;
      default:
        string = '';
    }
    return (
      <div style={{ paddingTop: 15, color: '#B2BEC4', fontSize: 14 }}>
        <Link to={'/'}><FormattedMessage {...messages.home} /></Link> / {string}
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

Breadcrumbs.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired, // eslint-disable-line
};

// Run the appropriate query based on our logic at the top of the file
export default graphql(query, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(Breadcrumbs);
