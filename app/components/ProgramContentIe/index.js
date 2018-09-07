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

import Hero from './Hero';
import HeroWrapper from './HeroWrapper';
import Section from './Section';
import A from './A';
import H1 from './H1';
import H3 from './H3';
import MarkdownWrapper from './MarkdownWrapper';
import Divider from './Divider';
import TitleContainer from './TitleContainer';

class ProgramContentIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    program: {},
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'program',
      'fields.slug[match]': this.props.slug,
    }).then(async (res) => {
      this.setData(res.items[0].fields);
    }).catch();
  }

  setData = (program) => {
    this.setState({ program });
  }

  render() {
    const { program } = this.state;
    const { width } = this.props;
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
              <H3>This feature is not avaliable on your browser. Please <A href="http://outdatedbrowser.com">update your browser</A>.</H3>
              <H3>You can still look for projects via the search function located at the top of the page.</H3>
            </Col>
          </Row>
        </Grid>
      );
      return (
        <div>
          <HeroWrapper>
            <Hero src={program.hero.fields.file.url} alt={program.hero.fields.title} />
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
}

ProgramContentIe.propTypes = {
  width: PropTypes.number,
  slug: PropTypes.string.isRequired,
};

export default ProgramContentIe;
