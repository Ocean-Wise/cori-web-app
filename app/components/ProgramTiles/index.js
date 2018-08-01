/**
*
* ProgramTiles
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getRAPrograms from 'graphql/queries/getRAPrograms.graphql';
import { Col } from 'react-flexbox-grid';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Container from './Container';
import Grid from './Grid';
import Row from './Row';
import HoverContainer from './HoverContainer';
import H1 from './H1';
import H2 from './H2';
import P from './P';
import Divider from './Divider';
import Tile from './Tile';
import Title from './Title';

function ProgramTiles({ data: { researchAreas }, width }) {
  try {
    const tiles = [];
    researchAreas[0].programs.map((program, i) => {
      tiles.push(
        // <Link to={`/program/${program.slug}`} key={`programLink-${i.toString()}`}>
        <Tile image={program.hero.url} key={`programLink-${i.toString()}`} width={width}>
          <HoverContainer>
            <H2>{program.title}</H2>
            <P>{program.overlay}</P>
            <center>
              <Link to={`/program/${program.slug}`}>
                <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                  <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                </Button>
              </Link>
            </center>
          </HoverContainer>
          <Title className="initialTitle">{program.title}</Title>
        </Tile>
        // </Link>
      );
      return true;
    });
    researchAreas[0].projects.map((project, i) => {
      tiles.push(
        <Tile image={project.hero.url} key={`programLink-${i.toString()}`} width={width}>
          <HoverContainer>
            <H2>{project.projectTitle}</H2>
            <P>{project.subheader}</P>
            <center>
              <Link to={`/project/${project.slug}`}>
                <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                  <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                </Button>
              </Link>
            </center>
          </HoverContainer>
          <Title className="initialTitle">{project.projectTitle}</Title>
        </Tile>
      );
      return true;
    });
    return (
      <Grid fluid>
        <Row>
          <Col xl={4}>
            <Container>
              <Divider />
              <H1>
                <FormattedMessage {...messages.header} />
              </H1>
            </Container>
          </Col>
          <Col xl={7}>
            <Row tileContainer>
              {tiles}
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProgramTiles.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.number,
};

export default graphql(getRAPrograms, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProgramTiles);
