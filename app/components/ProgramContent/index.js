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
import ChevronRight from 'styles/icons/ChevronRight.svg';

import ResearchAreaTag from 'components/ResearchAreaTag/Loadable';
import InitiativeFeatured from 'components/InitiativeFeatured/Loadable';
import Hero from './Hero';
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

function ProgramContent({ data: { programs }, slug, match, width }) {
  let program = {};
  try {
    program = programs[0];
    const initiativesList = program.initiatives.map((initiative, i) => {
      const projects = [];
      let column = [];
      initiative.projects.map((project, j) => {
        if (j === initiative.projects.length / 2) {
          projects.push(<Col md={5} key={`column-${j.toString()}`}>{column}</Col>);
          column = [];
        }
        if (project.showOnSite) {
          if (project.type !== 'Internal') {
            if (project.type === 'Link') {
              column.push(
                <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
                  <a href={project.externalLink} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
                    <span style={{ color: '#00B398' }}>{project.projectTitle} <img alt="Chevron" style={{ width: 25, marginLeft: 0 }} src={ChevronRight} /></span>
                  </a>
                </div>
              );
            } else if (project.type === 'PDF') {
              column.push(
                <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
                  <a href={project.pdf.url} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
                    <span style={{ color: '#00B398' }}>{project.projectTitle} <img alt="Chevron" style={{ width: 25, marginLeft: 0 }} src={ChevronRight} /></span>
                  </a>
                </div>
              );
            }
          } else {
            column.push(
              <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
                <Link to={`/project/${project.slug}`} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
                  <span style={{ color: '#00B398' }}>{project.projectTitle} <img alt="Chevron" style={{ width: 25, marginLeft: 0 }} src={ChevronRight} /></span>
                </Link>
              </div>
            );
          }
        } else {
          column.push(
            <div key={`project-${j.toString()}`} style={{ paddingBottom: 10, wordWrap: 'break-word' }}>
              <span style={{ color: '#B2BEC4', fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>{project.projectTitle}</span>
            </div>
          );
        }

        if (j === initiative.projects.length - 1) {
          projects.push(<Col key={`projectCol-${j.toString()}`} md={5}>{column}</Col>);
        }
        return true;
      });

      const sponsors = [];
      try {
        initiative.sponsors.map((sponsor, j) => { // eslint-disable-line
          sponsors.push(
            <Col sm={3} xs={5} key={`sponsor-${j.toString()}`} style={{ margin: 'auto' }}>
              <img style={{ padding: '16px 0 32px 0', maxWidth: '100%', display: 'block', margin: 'auto' }} src={sponsor.logo.url} alt={sponsor.logo.title} />
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
                <ReactMarkdown source={initiative.copy} />
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

    return (
      <div>
        <Hero src={program.hero.url} alt={program.hero.title} />
        <Section style={{ paddingBottom: 20 }}>
          <Grid fluid>
            <Row>
              <Col xl={4} />
              <Col xl={7} style={{ maxWidth: responsiveWidth }}>
                <ResearchAreaTag slug={slug} match={match} program />
                <H1 style={{ marginTop: 15 }}>{program.title}</H1>
                <H3>{program.subheader}</H3>
                <MarkdownWrapper>
                  <ReactMarkdown source={program.copy} />
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
