/**
*
* Breadcrumbs
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import ResearchAreaTeaser from 'graphql/queries/getResearchAreaTeaser.graphql';
import ProgramTeaser from 'graphql/queries/getProgramTeaser.graphql';
import ProjectTeaser from 'graphql/queries/getProjectTeaser.graphql';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// TODO: This will need an extra check to see if the /program/ is actually a 'Working Group'. Will need an extra query.
function Breadcrumbs({ data, location, slug }) {
  try {
    // Set up our variables pertaining to the query
    let dataQuery;
    if (location.path.match(/\/research\//g)) {
      // We are on a reasearch area page, so query the research area
      dataQuery = 'researchAreas';
    } else if (location.path.match(/\/program\//g)) {
      // We are an a program page, so query the program and its back references
      dataQuery = 'programs';
    } else if (location.path.match(/\/project\//g)) {
      // We are on a project page so query the project and its back references
      dataQuery = 'projects';
    }

    // Initialize our breadcrumb string
    let string;
    switch (dataQuery) {
      case 'researchAreas':
        // This is a research area, so highlight the title
        string = <span style={{ color: 'rgb(0, 179, 152)', fontWeight: 'bold', lineHeight: '18px' }}>{data[dataQuery][0].title}</span>;
        break;
      case 'programs':
        // This is a program, so Link to the research area via backref, then highlight the program title
        string = <span><Link to={`/research/${data[dataQuery][0]._backrefs.researchAreas__via__programs[0].slug}`}>{data[dataQuery][0]._backrefs.researchAreas__via__programs[0].title}</Link> / <span style={{ color: 'rgb(0, 179, 152)', fontWeight: 'bold', lineHeight: '18px' }}>{data[dataQuery][0].title}</span></span>; // eslint-disable-line
        break;
      case 'projects':
        // This is a project, so Link to the research area and program via backref, then highlight the program project title
        if (data[dataQuery][0]._backrefs.researchAreas__via__projects.length !== 0) { // eslint-disable-line
          string = <span><Link to={`/research/${data[dataQuery][0]._backrefs.researchAreas__via__projects[0].slug}`}>{data[dataQuery][0]._backrefs.researchAreas__via__projects[0].title}</Link> /  <span style={{ color: 'rgb(0, 179, 152)', fontWeight: 'bold', lineHeight: '18px' }}>{data[dataQuery][0].title}</span></span>; // eslint-disable-line
        } else {
          const initiatives = data[dataQuery][0]._backrefs.initiatives__via__projects; // eslint-disable-line

          let currentInitiative = '';
          initiatives.map((initiative) => { // eslint-disable-line
            initiative.projects.map((project) => { // eslint-disable-line
              if (project.slug === slug) {
                currentInitiative = initiative;
              }
            });
          });

          const currentProgram = data[dataQuery][0]._backrefs.initiatives__via__projects[0]._backrefs.programs__via__initiatives[0]; // eslint-disable-line
          const currentArea = data[dataQuery][0]._backrefs.initiatives__via__projects[0]._backrefs.programs__via__initiatives[0]._backrefs.researchAreas__via__programs[0]; // eslint-disable-line

          string = <span><Link to={`/research/${currentArea.slug}`}>{currentArea.title}</Link> / <Link to={`/program/${currentProgram.slug}`}>{currentProgram.title}</Link> / {currentInitiative.title} / <span style={{ color: 'rgb(0, 179, 152)', fontWeight: 'bold', lineHeight: '18px' }}>{data[dataQuery][0].projectTitle}</span></span>;
        }
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
  location: PropTypes.object.isRequired,
};

/**
 * Run the appropriate query based on whether or not
 * the 'research' boolean property has been passed.
 * If research is true run ResearchAreaTeaser
 * else run ProgramTeaser
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
  }))(Breadcrumbs);
