/**
*
* ProgramContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import getProgram from 'graphql/queries/getProgram.graphql';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet';

import ResearchAreaTag from 'components/ResearchAreaTag/Loadable';
import InitiativeFeatured from 'components/InitiativeFeatured/Loadable';
import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import Hr from './Hr';
import H1 from './H1';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import MarkdownWrapper from './MarkdownWrapper';
import Paper from './Paper';
import Divider from './Divider';
import TitleContainer from './TitleContainer';
import ProjectCol from './ProjectCol';

/* eslint-disable */
function LinkRenderer(props) {
  return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
}
/* eslint-enable */

function ProgramContent({ data: { programs }, slug, match, width }) {
  let program = {};
  try {
    program = programs[0];
    // Loop over all the initiatives
    const initiativesList = program.initiatives.map((initiative, i) => {
      const projects = []; // The array to hold the final rendered project columns to display
      const projectItems = []; // The array to hold the individual formatted project items

      // How many columns should we have?
      const roundCols = Math.ceil(initiative.projects.length / 3.0); // Round up fractions to next highest integer
      const numCols = roundCols > 1 ? roundCols : 2; // Ensure we have at least two columns
      // Loop over all the projects in the current initiative
      initiative.projects.map((project, j) => {
        // Check if we should link, and what type of link to render the project as
        if (project.showOnSite) {
          if (project.type !== 'Internal') {
            if (project.type === 'Link') {
              projectItems.push(
                <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
                  <a href={project.externalLink} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
                    <span style={{ color: '#00B398' }}>{project.projectTitle}</span>
                  </a>
                </div>
              );
            } else if (project.type === 'PDF') {
              projectItems.push(
                <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
                  <a href={project.pdf.url} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
                    <span style={{ color: '#00B398' }}>{project.projectTitle}</span>
                  </a>
                </div>
              );
            }
          } else {
            projectItems.push(
              <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
                <Link to={`/project/${project.slug}`} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
                  <span style={{ color: '#00B398' }}>{project.projectTitle}</span>
                </Link>
              </div>
            );
          }
        } else {
          projectItems.push(
            <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
              <span style={{ color: '#B2BEC4', fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>{project.projectTitle}</span>
            </div>
          );
        }
        return true;
      });

      // Organize the projects into their proper columns.
      // Loop over columns. Appropriate projects calculated by (project index % numCols) === current column
      for (let j = 0; j < numCols; j += 1) {
        projects.push(
          <ProjectCol md={6} key={`column-${j.toString()}`}>
            {projectItems.map((project, k) => {
              if (k % numCols === j) return project;
              return null;
            })}
          </ProjectCol>
        );
      }

      const sponsors = [];
      try {
        initiative.sponsors.map((sponsor, j) => { // eslint-disable-line
          sponsors.push(
            <Col sm={3} xs={5} key={`sponsor-${j.toString()}`} style={{ margin: 'auto' }}>
              <img style={{ padding: '16px 0 32px 0', maxWidth: '150px', margin: 'auto', height: '100% !important' }} src={sponsor.logo.url} alt={sponsor.logo.title} />
            </Col>
          );
        });
      } catch (err) {
        // Error
      }
      const SponsorComponent = sponsors.length === 0 ? '' : (
        <div>
          <Hr style={{ marginBottom: 15 }} />
          <H5>INITIATIVE SPONSORS</H5>
          <p>{initiative.supportersCopy}</p>
          <Grid fluid style={{ padding: 0 }}>
            <Row>
              {sponsors}
            </Row>
          </Grid>
        </div>
      );

      const spotlight = initiative.rssLink !== null ? (
        <InitiativeFeatured url={initiative.rssLink} />
      ) : '';

      return (
        <div id={`${initiative.slug}`} key={`card-${i.toString()}`}>
          <Paper zDepth={1}>
            <div style={{ padding: '32px 32px 16px 32px' }}>
              <H4>{initiative.title}</H4>
            </div>
            <div style={{ padding: '0 32px' }}>
              <MarkdownWrapper>
                <ReactMarkdown source={initiative.copy} renderers={{ link: LinkRenderer }} />
              </MarkdownWrapper>
              <Hr style={{ marginBottom: 15 }} />
              <H5>PROJECTS</H5>
              <Grid fluid style={{ paddingLeft: 8 }}>
                <Row>
                  {projects}
                </Row>
              </Grid>
              {spotlight}
              {SponsorComponent}
            </div>
          </Paper>
        </div>
      );
    });

    const responsiveWidth = width < 769 ? '100%' : 850;

    const InitiativesComponent = (
      <Grid fluid style={{ padding: '60px 0' }}>
        <Row style={{ margin: 0 }}>
          <Col xl={4}>
            <TitleContainer>
              <Divider />
              <H1 className="initiative" style={{ marginTop: 15, position: 'absolute' }}>Initiatives</H1>
            </TitleContainer>
          </Col>
          <Col xl={7} style={{ maxWidth: responsiveWidth }}>
            {initiativesList}
          </Col>
        </Row>
      </Grid>
    );

    // Ensure we render the page even if the editor did not remember to publish the hero image...
    let hero;
    let title;
    if (program.hero) {
      hero = program.hero.url;
      title = program.hero.title;
    }

    return (
      <div>
        <Helmet>
          {/* Search Engine */}
          <meta name="description" content={program.copy} />
          <meta name="image" content={hero} />
          {/* Schema.org for Google */}
          {/* eslint-disable */}
          <meta itemprop="name" content={`${program.title} - Ocean Wise Research`} />
          <meta itemprop="description" content={program.subheader} />
          <meta itemprop="image" content={hero} />
          {/* eslint-enable */}
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={`${program.title} - Ocean Wise Research`} />
          <meta name="twitter:description" content={program.subheader} />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:title" content={`${program.title} - Ocean Wise Research`} />
          <meta name="og:description" content={program.subheader} />
          <meta name="og:image" content={hero} />
          <meta name="og:url" content={`https://research.ocean.org/program/${slug}`} />
          <meta name="og:site_name" content="Ocean Wise Research" />
          <meta name="og:type" content="article" />
        </Helmet>
        <HeroWrapper>
          <Hero src={hero} alt={title} />
          {program.imageAttribution ? <span id="attribution">{program.imageAttribution}</span> : ''}
        </HeroWrapper>
        <Section style={{ paddingBottom: 20 }}>
          <Grid fluid>
            <Row>
              <Col xl={4} />
              <Col xl={7} style={{ maxWidth: responsiveWidth }}>
                <ResearchAreaTag slug={slug} match={match} program />
                <H1 style={{ marginTop: 15 }}>{program.title}</H1>
                <H3>{program.subheader}</H3>
                <MarkdownWrapper>
                  <ReactMarkdown source={program.copy} renderers={{ link: LinkRenderer }} />
                </MarkdownWrapper>
              </Col>
            </Row>
          </Grid>
        </Section>
        <Section>
          {InitiativesComponent}
        </Section>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProgramContent.propTypes = {
  width: PropTypes.number,
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default graphql(getProgram, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProgramContent);
