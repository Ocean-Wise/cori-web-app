/**
*
* ProjectContentIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Grid, Row, Col } from 'react-flexbox-grid';
import client from 'utils/contentful';

import ProjectMembersIe from 'components/ProjectMembersIe/Loadable';
import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import SupporterRow from './SupporterRow';

class ProjectContentIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    project: {},
  };

  componentWillMount() {
    client.getEntries({
      content_type: 'projects',
      'fields.slug[match]': this.props.slug,
    }).then((res) => this.setData(res.items[0].fields))
      .catch();
  }

  setData = (project) => {
    this.setState({ project });
  }

  render() {
    const { project } = this.state;
    const { slug } = this.props;
    try {
      /*
       * Some projects are able to only be listed and not visitable, but can still be navigated to
       * so we want to ensure that a redirection occurs if they are landed on for whatever reason
       */
      if (!project.showOnSite && (project.showOnSite !== undefined || project.showOnSite !== null)) {
        return (
          <div>
            <Section>
              <Grid fluid>
                <Row>
                  <Col xl={2} />
                  <Col xl={8}>
                    <H1>{project.projectTitle}</H1>
                    <H3>Coming soon!</H3>
                  </Col>
                </Row>
              </Grid>
            </Section>
          </div>
        );
      }
      // This project has no text content and is just an externalLink or pdf,
      // but has been navigated to somehow. So redirect to the proper external URL
      if (project.externalLink || project.pdf) {
        const redirect = project.externalLink || project.pdf;
        // Set the window's location to the externalLink or the PDF link
        window.location = redirect;
      }

      let supporters;
      let supportersComponent;
      try {
        supporters = project.supporters.map((supporter, i) => { // eslint-disable-line
          return (
            <div key={`supporter-${i.toString()}`} style={{ margin: 'auto', padding: 10 }}>
              <img src={supporter.fields.logo.file.url} alt={supporter.fields.name} width={250} />
            </div>
          );
        });

        supportersComponent = project.supporters !== null ? (
          <div style={{ backgroundColor: '#F8F9F9', paddingBottom: 80, paddingTop: 80 }}>
            <center>
              <H1 style={{ fontSize: 48, lineHeight: '50px', marginTop: 0, marginBottom: 16 }}>Our Supporters</H1>
              <H3 style={{ maxWidth: 730 }}>{project.supportersCopy ? project.supportersCopy : ''}</H3>
              <Grid fluid>
                <Row>
                  <Col xl={8} style={{ margin: '0 auto' }}>
                    <SupporterRow>
                      {supporters}
                    </SupporterRow>
                  </Col>
                </Row>
              </Grid>
            </center>
          </div>
        ) : '';
      } catch (err) {
        supporters = null;
        supportersComponent = '';
      }

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
          <HeroWrapper>
            <Hero src={project.hero.fields.file.url} alt={project.hero.fields.title} />
            {project.imageAttribution ? <span id="attribution">{project.imageAttribution}</span> : ''}
          </HeroWrapper>
          <Section>
            <Grid fluid>
              <Row>
                <Col xl={2} />
                <Col xl={8}>
                  <H1>{project.projectTitle}</H1>
                  <H3>{project.subheader}</H3>
                  <MarkdownWrapper>
                    <ReactMarkdown source={copy} />
                  </MarkdownWrapper>
                </Col>
              </Row>
            </Grid>
          </Section>
          <ProjectMembersIe slug={slug} />
          {supportersComponent}
        </div>
      );
    } catch (err) {
      return <div></div>;
    }
  }
}

ProjectContentIe.propTypes = {
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default ProjectContentIe;
