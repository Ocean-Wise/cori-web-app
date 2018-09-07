/**
*
* ProgramTilesIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import client from 'utils/contentful';

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

class ProgramTilesIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    area: [],
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'researchArea',
      'fields.slug[match]': this.props.slug,
    }).then((res) => this.setData(res.items[0].fields))
      .catch();
  }

  setData = (area) => {
    this.setState({ area });
  }

  render() {
    const { area } = this.state;
    const { width } = this.props;
    try {
      const tiles = [];
      try {
        area.programs.map((program, i) => {
          tiles.push(
            <Tile image={program.fields.hero.fields.file.url} key={`programLink-${i.toString()}`} width={width} imageAlign={program.fields.imageAlign}>
              <HoverContainer>
                <H2>{program.fields.title}</H2>
                <P>{program.fields.overlay}</P>
                <center>
                  <Link to={`/program/${program.fields.slug}`}>
                    <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                      <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                    </Button>
                  </Link>
                </center>
              </HoverContainer>
              {program.fields.imageAttribution ? <span id="attribution">{program.fields.imageAttribution}</span> : ''}
              <Title className="initialTitle">{program.fields.title}</Title>
            </Tile>
          );
          return true;
        });
      } catch (err) {
        // No programs, so skip
      }
      try {
        area.projects.map((project, i) => {
          if (project.fields.showOnSite) {
            if (project.fields.type === 'Link') {
              tiles.push(
                <Tile image={project.fields.hero.fields.file.url} key={`programLink-${i.toString()}`} width={width} imageAlign={project.fields.imageAlign}>
                  <HoverContainer>
                    <H2>{project.fields.projectTitle}</H2>
                    <P>{project.fields.subheader}</P>
                    <center>
                      <a href={project.fields.externalLink} target="_blank">
                        <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                          <span className="explore">Visit <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                        </Button>
                      </a>
                    </center>
                  </HoverContainer>
                  {project.fields.imageAttribution ? <span id="attribution">{project.fields.imageAttribution}</span> : ''}
                  <Title className="initialTitle">{project.fields.projectTitle}</Title>
                </Tile>
              );
            } else if (project.fields.type === 'PDF') {
              tiles.push(
                <Tile image={project.fields.hero.fields.file.url} key={`programLink-${i.toString()}`} width={width} imageAlign={project.fields.imageAlign}>
                  <HoverContainer>
                    <H2>{project.fields.projectTitle}</H2>
                    <P>{project.fields.subheader}</P>
                    <center>
                      <a href={project.fields.pdf.url} target="_blank">
                        <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                          <span className="explore">Read <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                        </Button>
                      </a>
                    </center>
                  </HoverContainer>
                  {project.fields.imageAttribution ? <span id="attribution">{project.fields.imageAttribution}</span> : ''}
                  <Title className="initialTitle">{project.fields.projectTitle}</Title>
                </Tile>
              );
            } else {
              tiles.push(
                <Tile image={project.fields.hero.fields.file.url} key={`programLink-${i.toString()}`} width={width} imageAlign={project.fields.imageAlign}>
                  <HoverContainer>
                    <H2>{project.fields.projectTitle}</H2>
                    <P>{project.fields.subheader}</P>
                    <center>
                      <Link to={`/project/${project.fields.slug}`}>
                        <Button style={{ border: '1px solid #FFFFFF', borderRadius: 0, padding: '10px 25px', marginTop: 32 }}>
                          <span className="explore">Explore <ChevronRight style={{ fontSize: 35, marginLeft: -5, marginRight: -15 }} /></span>
                        </Button>
                      </Link>
                    </center>
                  </HoverContainer>
                  {project.fields.imageAttribution ? <span id="attribution">{project.fields.imageAttribution}</span> : ''}
                  <Title className="initialTitle">{project.fields.projectTitle}</Title>
                </Tile>
              );
            }
          }
          return true;
        });
      } catch (err) {
        // No projects, so skip
      }
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
}

ProgramTilesIe.propTypes = {
  width: PropTypes.number,
  slug: PropTypes.string,
};

export default ProgramTilesIe;
