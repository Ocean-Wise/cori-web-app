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
import ChevronRight from '@material-ui/icons/ChevronRight';

import Breadcrumbs from 'components/Breadcrumbs';
import ProjectFeatured from 'components/ProjectFeatured/Loadable';
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
          <div key={`project-${j.toString()}`} style={{ paddingBottom: 10 }}>
            <Link to={`/project/${project.slug}`} style={{ fontSize: 14, lineHeight: '18px', fontWeight: 'bold' }}>
              <span style={{ color: '#00B398' }}>{project.projectTitle} <ChevronRight style={{ marginLeft: -5 }} /></span>
            </Link>
          </div>
        );
        if (j === initiative.projects.length - 1) {
          projects.push(<Col key={`projectCol-${j.toString()}`} md={6}>{column}</Col>);
        }
        return true;
      });

      const sponsors = [];
      try {
        initiative.sponsors.map((sponsor, j) => { // eslint-disable-line
          sponsors.push(
            <Col md={2} key={`sponsor-${j.toString()}`}>
              <img style={{ padding: '16px 0 32px 0' }} src={sponsor.logo.url} alt={sponsor.logo.title} />
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
          <p>Ut convallis, metus et convallis mattis, nunc velit placerat quam, sed consectetur risus tellus sed sem. Integer fermentum eu turpis vitae egestas.</p>
          <Grid fluid style={{ padding: 0 }}>
            <Row>
              {sponsors}
            </Row>
          </Grid>
        </div>
      );

      const spotlight = initiative.rssLink !== null ? (
        <div>
          <Hr style={{ marginBottom: 15 }} />
          <H5>SPOTLIGHT</H5>
          <ProjectFeatured url={initiative.rssLink} />
        </div>
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
              <Grid fluid style={{ paddingLeft: 0 }}>
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

    const InitiativesComponent = (
      <Grid fluid style={{ padding: '60px 0' }}>
        <Row style={{ margin: 0 }}>
          <Col xl={4}>
            <TitleContainer>
              <Divider />
              <H1 style={{ marginTop: 15, position: 'absolute' }}>Initiatives</H1>
            </TitleContainer>
          </Col>
          <Col xl={7} style={{ maxWidth: 850 }}>
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
              <Col xl={7} style={{ maxWidth: 850 }}>
                <Breadcrumbs slug={slug} location={match} program />
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
