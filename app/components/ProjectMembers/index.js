/**
*
* ProjectMembers
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import projectMemberQuery from 'graphql/queries/getProjectMembers.graphql';
import PersonModal from 'components/PersonModal/Loadable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Container from './Container';
import H1 from './H1';
import H3 from './H3';
import Hr from './Hr';
import Section from './Section';

/*
 * Returns the ProjectMembers for a particular project.
 * Requires the project's slug to be passed as a prop
 * to the component called in the parent container.
 *
 */
function ProjectMembers({ data: { projects } }) {
  let members;
  let copyString;
  try {
    copyString = projects[0].researchTeamCopy ? projects[0].researchTeamCopy : 'Meet the Ocean Wise Research team behind this project';
    members = projects[0].members
      .slice()
      .sort((a, b) => a.last.localeCompare(b.last))
      .map((member, i) =>
        <PersonModal key={`person-${i.toString()}`} person={member} />
      );
  } catch (err) {
    return <div />;
  }

  return (
    <div>
      <div style={{ width: '80%', margin: '0 auto', marginTop: -50 }}>
        <Hr />
      </div>
      <Section>
        <Grid fluid>
          <Row>
            <Col xl={2} />
            <Col xl={8}>
              <H1>Research Team</H1>
              <H3>{copyString}</H3>
              <Container>
                {members}
              </Container>
            </Col>
          </Row>
        </Grid>
      </Section>
    </div>
  );
}

ProjectMembers.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string, // eslint-disable-line
};

// Use the projectMemberQuery GraphQL query
// Pass a query string variable required to
// filter for our requested project
export default graphql(projectMemberQuery, {
  options: (props) => ({
    variables: {
      projectName: `fields.slug=${props.slug}`,
    },
  }),
})(ProjectMembers);
