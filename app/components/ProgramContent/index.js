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

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectFeatured from 'components/ProjectFeatured';
import Hero from './Hero';
import Container from './Container';
import Section from './Section';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import H5 from './H5';
import MarkdownWrapper from './MarkdownWrapper';
import Paper from './Paper';
import Divider from './Divider';
import ProjectList from './ProjectList';
import Column from './Column';

function ProgramContent({ data: { programs }, slug, match }) {
  let program = {};

  try {
    program = programs[0];
    const initiativesList = program.initiatives.map((initiative, i) => {
      const projects = [];
      let column = [];
      initiative.projects.map((project, j) => {
        if (j % 3 && j !== 0) {
          projects.push(column);
          column = [];
        }
        column.push(
          <div key={`project-${j.toString()}`}>
            <Link to={`/project/${project.slug}`}>
              <span style={{ color: '#005EB8' }}>{project.projectTitle} &gt;</span>
            </Link>
          </div>
        );
        if (j === initiative.projects.length - 1) {
          projects.push(<Column key={`projectCol-${j.toString()}`}>{column}</Column>);
        }
        return true;
      });

      return (
        <Paper zDepth={1} key={`card-${i.toString()}`}>
          <H4>{initiative.title}</H4>
          <MarkdownWrapper>
            <ReactMarkdown source={initiative.copy} />
          </MarkdownWrapper>
          <H5>Projects</H5>
          <hr style={{ marginBottom: 15 }} />
          <ProjectList>
            {projects}
          </ProjectList>
          <H5>Feature Story</H5>
          <hr style={{ marginBottom: 15 }} />
          <ProjectFeatured url={initiative.rssLink} />
        </Paper>
      );
    });

    const InitiativesComponent = (
      <div>
        <H2>Initiatives</H2>
        <Divider />
        {initiativesList}
      </div>
    );

    return (
      <div>
        <Hero src={program.hero.url} alt={program.hero.title} />
        <Section style={{ paddingBottom: 20 }}>
          <Container>
            <Breadcrumbs slug={slug} location={match} />
            <H1>{program.title}</H1>
            <H3>{program.subheader}</H3>
            <MarkdownWrapper>
              <ReactMarkdown source={program.copy} />
            </MarkdownWrapper>
          </Container>
        </Section>
        <Section>
          <Container>
            {InitiativesComponent}
          </Container>
        </Section>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProgramContent.propTypes = {
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
