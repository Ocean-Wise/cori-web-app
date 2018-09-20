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
import { Helmet } from 'react-helmet';

import Button from 'components/Button/Loadable';

import H1 from './H1';
import Blockquote from './Blockquote';
import IntroContainer from './IntroContainer';
import Wrapper from './Wrapper';
import Section from './Section';
import CopyBlock from './CopyBlock';
import Img from './Img';
import Divider from './Divider';

/* eslint-disable */
function LinkRenderer(props) {
  return <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>;
}
/* eslint-enable */

function HomeCopy({ data: { homeCopies } }) {
  try {
    const data = homeCopies[0];

    const firstButtonData = JSON.parse(data.firstLinks);
    const firstButtons = [];
    Object.entries(firstButtonData).forEach(
      ([key, value], i) => { // eslint-disable-line
        firstButtons.push(
          <Link to={value} key={i.toString()}>
            <Button inverted id={`link-${i.toString()}`}>
              {key}
            </Button>
          </Link>
        );
      }
    );

    const secondButtonData = JSON.parse(data.secondLinks);
    const secondButtons = [];
    Object.entries(secondButtonData).forEach(
      ([key, value], i) => { // eslint-disable-line
        secondButtons.push(
          <Link to={value} key={i.toString()}>
            <Button inverted id={`link-${i.toString()}`}>
              {key}
            </Button>
          </Link>
        );
      }
    );

    const thirdButtonData = JSON.parse(data.thirdLinks);
    const thirdButtons = [];
    Object.entries(thirdButtonData).forEach(
      ([key, value], i) => { // eslint-disable-line
        thirdButtons.push(
          <Link to={value} key={i.toString()}>
            <Button inverted id={`link-${i.toString()}`}>
              {key}
            </Button>
          </Link>
        );
      }
    );

    return (
      <div>
        <Helmet>
          {/* Search Engine */}
          <meta name="description" content={data.introCopy} />
          {/* Schema.org for Google */}
          {/* eslint-disable */}
          <meta itemprop="description" content={data.introCopy} />
          {/* eslint-enable */}
          {/* Twitter */}
          <meta name="twitter:description" content={data.introCopy} />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:description" content={data.introCopy} />
        </Helmet>
        <Wrapper>
          <IntroContainer>
            <center>
              <H1>{data.headline}</H1>
              <Blockquote>{data.subheader}</Blockquote>
              <ReactMarkdown renderers={{ link: LinkRenderer }} source={data.introCopy} />
            </center>
          </IntroContainer>
        </Wrapper>
        <Wrapper>
          <Section flexDirection="column">
            <Img src={data.firstImage ? data.firstImage.url : null} alt={data.firstImage ? data.firstImage.title : null} float="left" />
            <CopyBlock float="right">
              <Divider />
              <H1 section>{data.firstHeader}</H1>
              <ReactMarkdown renderers={{ link: LinkRenderer }} source={data.firstCopy} />
              {firstButtons}
            </CopyBlock>
          </Section>
        </Wrapper>
        <Wrapper>
          <Section flexDirection="column-reverse">
            <CopyBlock float="left">
              <Divider />
              <H1 section>{data.secondHeader}</H1>
              <ReactMarkdown renderers={{ link: LinkRenderer }} source={data.secondCopy} />
              {secondButtons}
            </CopyBlock>
            <Img src={data.secondImage ? data.secondImage.url : null} alt={data.secondImage ? data.secondImage.title : null} float="right" />
          </Section>
        </Wrapper>
        <Wrapper>
          <Section flexDirection="column">
            <Img src={data.thirdImage ? data.thirdImage.url : null} alt={data.thirdImage ? data.thirdImage.title : null} float="left" />
            <CopyBlock float="right">
              <Divider />
              <H1 section>{data.thirdHeader}</H1>
              <ReactMarkdown renderers={{ link: LinkRenderer }} source={data.thirdCopy} />
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
