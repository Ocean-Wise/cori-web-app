/**
*
* HomeCopy
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import getHomeCopy from 'graphql/queries/getHomeCopy.graphql';

import Blockquote from 'components/Blockquote';
import Button from 'components/Button';

import H1 from './H1';
import IntroContainer from './IntroContainer';
import Wrapper from './Wrapper';
import Section from './Section';
import CopyBlock from './CopyBlock';
import Img from './Img';

function HomeCopy({ data: { homeCopies } }) {
  try {
    const data = homeCopies[0];

    const firstButtonData = JSON.parse(data.firstLinks);
    const firstButtons = [];
    Object.entries(firstButtonData).forEach(
      ([key, value], i) => { // eslint-disable-line
        firstButtons.push(
          <Button inverted id={`link-${i.toString()}`} key={i.toString()}>
            <Link to={value}>{key}</Link>
          </Button>
        );
      }
    );

    const secondButtonData = JSON.parse(data.secondLinks);
    const secondButtons = [];
    Object.entries(secondButtonData).forEach(
      ([key, value], i) => { // eslint-disable-line
        secondButtons.push(
          <Button inverted id={`link-${i.toString()}`} key={i.toString()}>
            <Link to={value}>{key}</Link>
          </Button>
        );
      }
    );

    const thirdButtonData = JSON.parse(data.thirdLinks);
    const thirdButtons = [];
    Object.entries(thirdButtonData).forEach(
      ([key, value], i) => { // eslint-disable-line
        thirdButtons.push(
          <Button inverted id={`link-${i.toString()}`} key={i.toString()}>
            <Link to={value}>{key}</Link>
          </Button>
        );
      }
    );

    return (
      <div>
        <IntroContainer>
          <center>
            <H1>{data.headline}</H1>
            <Blockquote>{data.subheader}</Blockquote>
            <ReactMarkdown source={data.introCopy} />
          </center>
        </IntroContainer>
        <Wrapper>
          <Section flexDirection="column">
            <Img src={data.firstImage.url} alt={data.firstImage.title} float="left" />
            <CopyBlock float="right">
              <H1 section>{data.firstHeader}</H1>
              <ReactMarkdown source={data.firstCopy} />
              {firstButtons}
            </CopyBlock>
          </Section>
        </Wrapper>
        <Wrapper>
          <Section flexDirection="column-reverse">
            <CopyBlock float="left">
              <H1 section>{data.secondHeader}</H1>
              <ReactMarkdown source={data.secondCopy} />
              {secondButtons}
            </CopyBlock>
            <Img src={data.secondImage.url} alt={data.secondImage.title} float="right" />
          </Section>
        </Wrapper>
        <Wrapper>
          <Section flexDirection="column">
            <Img src={data.thirdImage.url} alt={data.thirdImage.title} float="left" />
            <CopyBlock float="right">
              <H1 section>{data.thirdHeader}</H1>
              <ReactMarkdown source={data.thirdCopy} />
              {thirdButtons}
            </CopyBlock>
          </Section>
        </Wrapper>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

HomeCopy.propTypes = {
  data: PropTypes.object.isRequired,
};

export default graphql(getHomeCopy)(HomeCopy);
