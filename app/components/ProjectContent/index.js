/**
*
* ProjectContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
// import ReactMarkdown from 'react-markdown';
import getProject from 'graphql/queries/getProject.graphql';

import Breadcrumbs from 'components/Breadcrumbs';
import Hero from './Hero';
import Section from './Section';
import Container from './Container';
import H1 from './H1';
import H3 from './H3';

function ProjectContent({ data: { projects }, slug, match }) {
  let project = {};
  try {
    project = projects[0];
    // console.log(project);
    return (
      <div>
        <Hero src={project.hero.url} alt={project.hero.title} />
        <Section>
          <Container>
            <Breadcrumbs slug={slug} location={match} />
            <H1>{project.projectTitle}</H1>
            <H3>{project.subheader}</H3>
          </Container>
        </Section>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProjectContent.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default graphql(getProject, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProjectContent);
