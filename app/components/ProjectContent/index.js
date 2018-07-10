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
import { Grid, Row, Col } from 'react-flexbox-grid';

import ResearchAreaTag from 'components/ResearchAreaTag';
import ProjectMembers from 'components/ProjectMembers';
import Hero from './Hero';
import Section from './Section';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import Hr from './Hr';

function ProjectContent({ data: { projects }, slug, match }) {
  let project = {};
  try {
    project = projects[0];
    const supporters = project.supporters.map((supporter, i) => { // eslint-disable-line
      return (
        <div key={`supporter-${i.toString()}`}>
          <img src={supporter.logo.url} alt={supporter.name} />
        </div>
      );
    });

    const supportersComponent = project.supporters !== null ? (
      <div style={{ backgroundColor: '#F8F9F9', marginTop: 100, paddingBottom: 80, paddingTop: 80 }}>
        <center>
          <H1 style={{ fontSize: 48, lineHeight: '50px', marginTop: 0, marginBottom: 16 }}>Our Supporters</H1>
          <p style={{ fontSize: 16, lineHeight: '26px', color: '#4D4D4D', maxWidth: 730 }}>{project.supportersCopy}</p>
          <div style={{ display: 'inline-flex', flexDirection: 'row', marginTop: 64 }}>{supporters}</div>
        </center>
      </div>
    ) : '';

    let copy = project.copy;
    const regex = /!\[(.*)\]\(.*\)/g;
    let images = regex.exec(copy);
    while (images != null) {
      const imageWithCaption = `${images[0]}*${images[1]}*`;
      copy = copy.replace(images[0], imageWithCaption);
      images = regex.exec(copy);
    }

    return (
      <div>
        <Hero src={project.hero.url} alt={project.hero.title} />
        <Section>
          <Grid fluid>
            <Row>
              <Col xl={2} />
              <Col xl={8}>
                <ResearchAreaTag slug={slug} match={match} project />
                <H1>{project.projectTitle}</H1>
                <H3>{project.subheader}</H3>
                <MarkdownWrapper>
                  <ReactMarkdown source={copy} />
                </MarkdownWrapper>
              </Col>
            </Row>
          </Grid>
        </Section>
        <div style={{ width: '80%', margin: '0 auto', marginTop: -50 }}>
          <Hr />
        </div>
        <Section>
          <Grid fluid>
            <Row>
              <Col xl={2} />
              <Col xl={8}>
                <ProjectMembers slug={slug} />
              </Col>
            </Row>
          </Grid>
        </Section>
        {supportersComponent}
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
