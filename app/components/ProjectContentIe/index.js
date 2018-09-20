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
import { Helmet } from 'react-helmet';

import ProjectMembersIe from 'components/ProjectMembersIe/Loadable';
import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import SupporterRow from './SupporterRow';

/* eslint-disable */
function LinkRenderer(props) {
  return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
}
/* eslint-enable */

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

      // Ensure we render the page even if the editor did not remember to publish the hero image...
      let hero;
      let title;
      if (project.hero) {
        hero = project.hero.fields.file.url;
        title = project.hero.fields.file.title;
      }

      return (
        <div>
          <Helmet>
            {/* Search Engine */}
            <meta name="description" content={project.subheader} />
            <meta name="image" content={hero} />
            {/* Schema.org for Google */}
            {/* eslint-disable */}
            <meta itemprop="name" content={`${project.title} - Ocean Wise Research`} />
            <meta itemprop="description" content={project.subheader} />
            <meta itemprop="image" content={hero} />
            {/* eslint-enable */}
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={`${project.title} - Ocean Wise Research`} />
            <meta name="twitter:description" content={project.subheader} />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content={`${project.title} - Ocean Wise Research`} />
            <meta name="og:description" content={project.subheader} />
            <meta name="og:image" content={hero} />
            <meta name="og:url" content={`https://research.ocean.org/project/${slug}`} />
            <meta name="og:site_name" content="Ocean Wise Research" />
            <meta name="og:type" content="article" />
          </Helmet>
          <HeroWrapper>
            <Hero src={hero} alt={title} />
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
                    <ReactMarkdown source={copy} escapeHtml={false} renderers={{ link: LinkRenderer }} />
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
};

export default ProjectContentIe;
