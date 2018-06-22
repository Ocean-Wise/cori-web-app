/**
*
* ResearchAreaTag
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import ResearchAreaTeaser from 'graphql/queries/getResearchAreaTeaser.graphql';
import ProgramTeaser from 'graphql/queries/getProgramTeaser.graphql';
import ProjectTeaser from 'graphql/queries/getProjectTeaser.graphql';

import Container from './Container';

function ResearchAreaTag({ data, slug, match }) {
  try {
    // Set up our variables pertaining to the query
    let dataQuery;
    if (match.path.match(/\/research\//g)) {
      // We are on a reasearch area page, so query the research area
      dataQuery = 'researchAreas';
    } else if (match.path.match(/\/program\//g)) {
      // We are an a program page, so query the program and its back references
      dataQuery = 'programs';
    } else if (match.path.match(/\/project\//g)) {
      // We are on a project page so query the project and its back references
      dataQuery = 'projects';
    }

    let string;
    switch (dataQuery) {
      case 'researchAreas':
        string = data[dataQuery][0].title;
        break;
      case 'programs':
        string = data[dataQuery][0]._backrefs.researchAreas__via__programs[0].title; // eslint-disable-line
        break;
      case 'projects':
        string = data[dataQuery][0]._backrefs.initiatives__via__projects[0]._backrefs.programs__via__initiatives[0]._backrefs.researchAreas__via__programs[0].title; // eslint-disable-line
        break;
      default:
        string = '';
        break;
    }

    return (
      <Container>
        <Link to={`/research/${slug}`}>{string}</Link>
      </Container>
    );
  } catch (err) {
    return <div></div>;
  }
}

ResearchAreaTag.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

/**
 * Run the appropriate query based on whether or not
 * the 'research' boolean property has been passed.
 * If research is true run ResearchAreaTeaser
 * else run subsequently tagged queries
 */
export default compose(
 graphql(ResearchAreaTeaser, {
   skip: (props) => !props.research,
   options: (props) => ({
     variables: {
       slug: `fields.slug=${props.slug}`,
     },
   }),
 }),
 graphql(ProgramTeaser, {
   skip: (props) => !props.program,
   options: (props) => ({
     variables: {
       slug: `fields.slug=${props.slug}`,
     },
   }),
 }),
 graphql(ProjectTeaser, {
   skip: (props) => !props.project,
   options: (props) => ({
     variables: {
       slug: `fields.slug=${props.slug}`,
     },
   }),
 }))(ResearchAreaTag);
