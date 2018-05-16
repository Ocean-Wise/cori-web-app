/**
*
* ProjectContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import getProject from 'graphql/queries/getProject.graphql';

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectMembers from 'components/ProjectMembers';
import Hero from './Hero';
import Section from './Section';
import Container from './Container';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import Divider from './Divider';

function ProjectContent({ data: { projects }, slug, match }) {
  let project = {};
  try {
    project = projects[0];
    // console.log(project);
    const supporters = project.supporters.map((supporter) => { // eslint-disable-line
      return (
        <div>
          <img src={supporter.logo.url} alt={supporter.name} />
        </div>
      );
    });

    const supportersComponent = project.supporters !== null ? (
      <div style={{ backgroundColor: '#efefef', marginTop: 100, paddingBottom: 25 }}>
        <center>
          <H1 style={{ fontSize: 48, lineHeight: '50px', paddingTop: 15 }}>Our Supporters</H1>
          <Divider />
          <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum ue turpis vitae egestas.</p>
          <div style={{ display: 'inline-flex', flexDirection: 'row' }}>{supporters}</div>
        </center>
      </div>
    ) : '';

    return (
      <div>
        <Hero src={project.hero.url} alt={project.hero.title} />
        <Section>
          <Container>
            <Breadcrumbs slug={slug} location={match} project />
            <H1>{project.projectTitle}</H1>
            <H3>{project.subheader}</H3>
            <MarkdownWrapper>
              <ReactMarkdown source={project.copy} />
            </MarkdownWrapper>
            <ProjectMembers slug={slug} />
          </Container>
          {supportersComponent}
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
