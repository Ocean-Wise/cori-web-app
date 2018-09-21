/**
*
* ProjectMembersIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import PersonModal from 'components/PersonModal/Loadable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import client from 'utils/contentful';

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
class ProjectMembersIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    let members;
    let copyString;
    try {
      copyString = project.researchTeamCopy ? project.researchTeamCopy : 'Meet the Ocean Wise Research team behind this project';
      members = project.members
        .slice()
        .sort((a, b) => a.last.localeCompare(b.last))
        .map((member, i) =>
          <PersonModal isIE key={`person-${i.toString()}`} person={member.fields} />
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
}

ProjectMembersIe.propTypes = {
  slug: PropTypes.string,
};

export default ProjectMembersIe;
