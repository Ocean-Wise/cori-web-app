/**
*
* ProgramContentIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Grid, Row, Col } from 'react-flexbox-grid';
import client from 'utils/contentful';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import InitiativeFeatured from 'components/InitiativeFeatured/Loadable';

import Paper from './Paper';
import H4 from './H4';
import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import Divider from './Divider';
import TitleContainer from './TitleContainer';
import ProjectCol from './ProjectCol';
import H5 from './H5';
import Hr from './Hr';

/* eslint-disable */
function LinkRenderer(props) {
  return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
}
/* eslint-enable */

class ProgramContentIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    program: {},
    initiatives: [],
  }

  // Get our program data from the Contentful API
  componentWillMount() {
    client.getEntries({
      content_type: 'program',
      'fields.slug[match]': this.props.slug,
    }).then((res) => {
      this.setData(res.items[0].fields);
    }).catch();
  }

  setData = (program) => {
    this.setState({ program }); // Set the program into the state
    program.initiatives.map((initiative, i) => { // eslint-disable-line
      // Initialize variables
      const projects = [];
      const projectItems = [];
      // Calculate how many project columns are needed for this initiative
      const roundCols = Math.ceil(initiative.fields.projects.length / 3.0);
      const numCols = roundCols > 1 ? roundCols : 2;
      // Get the initiative data from the API
      client.getEntries({
        content_type: 'initiative',
        'fields.slug[match]': initiative.fields.slug,
      }).then((res) => {
        // Set fields to data for easier access
        const data = res.items[0].fields;
        // Loop over all the projects for this initiative
        data.projects.map((projectObj, j) => {
          // Set fields to project for easier access
          const project = projectObj.fields;
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

        // Loop over the sponsors and create their logo
        const sponsors = [];
        try {
          data.sponsors.map((sponsorObj, j) => { // eslint-disable-line
            const sponsor = sponsorObj.fields;
            sponsors.push(
              <Col sm={3} xs={5} key={`sponsor-${j.toString()}`} style={{ margin: 'auto' }}>
                <img style={{ padding: '16px 0 32px 0', maxWidth: '150px', margin: 'auto', height: '100% !important' }} src={sponsor.logo.fields.file.url} alt={sponsor.logo.fields.title} />
              </Col>
            );
          });
        } catch (err) {
          // Error
        }

        // Create our containing box for the sponsors
        const SponsorComponent = sponsors.length === 0 ? '' : (
          <div>
            <Hr style={{ marginBottom: 15 }} />
            <H5>INITIATIVE SPONSORS</H5>
            <p>{initiative.fields.supportersCopy}</p>
            <Grid fluid style={{ padding: 0 }}>
              <Row>
                {sponsors}
              </Row>
            </Grid>
          </div>
        );

        // Load in the featured blog story
        const spotlight = (initiative.fields.rssLink !== null && initiative.fields.rssLink !== undefined) ? (
          <InitiativeFeatured url={initiative.fields.rssLink} />
        ) : '';

        // Create our containing box for the current initative
        const renderedInitiative = (
          <div id={`${initiative.fields.slug}`} key={`card-${i.toString()}`}>
            <Paper zDepth={1}>
              <div style={{ padding: '32px 32px 16px 32px' }}>
                <H4>{initiative.fields.title}</H4>
              </div>
              <div style={{ padding: '0 32px' }}>
                <MarkdownWrapper>
                  <ReactMarkdown source={initiative.fields.copy} renderers={{ link: LinkRenderer }} />
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

        // Set initiatives state array to include the new initiative
        this.setState({ initiatives: [...this.state.initiatives, renderedInitiative] });
      });
    });
  }

  render() {
    const { program, initiatives } = this.state;
    const { width, slug } = this.props;
    try {
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
              {initiatives}
            </Col>
          </Row>
        </Grid>
      );

      // Ensure we render the page even if the editor did not remember to publish the hero image...
      let hero;
      let title;
      if (program.hero) {
        hero = program.hero.fields.file.url;
        title = program.hero.fields.file.title;
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
}

ProgramContentIe.propTypes = {
  width: PropTypes.number,
  slug: PropTypes.string.isRequired,
};

export default ProgramContentIe;
