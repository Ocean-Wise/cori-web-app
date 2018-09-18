/**
*
* HomeCopyIe
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import client from 'utils/contentful';
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


class HomeCopyIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    data: [],
  };

  componentWillMount() {
    client.getEntries({
      content_type: 'homeCopy',
    }).then((res) => this.setData(res.items[0].fields))
      .catch();
  }

  setData = (data) => {
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    try {
      const firstButtons = [];
      Object.entries(data.firstLinks).forEach(
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

      const secondButtons = [];
      Object.entries(data.secondLinks).forEach(
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

      const thirdButtons = [];
      Object.entries(data.thirdLinks).forEach(
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
                <ReactMarkdown source={data.introCopy} />
              </center>
            </IntroContainer>
          </Wrapper>
          <Wrapper>
            <Section flexDirection="column">
              <Img src={data.firstImage ? data.firstImage.fields.file.url : null} alt={data.firstImage ? data.firstImage.fields.title : null} float="left" />
              <CopyBlock float="right">
                <Divider />
                <H1 section>{data.firstHeader}</H1>
                <ReactMarkdown source={data.firstCopy} />
                {firstButtons}
              </CopyBlock>
            </Section>
          </Wrapper>
          <Wrapper>
            <Section flexDirection="column-reverse">
              <CopyBlock float="left">
                <Divider />
                <H1 section>{data.secondHeader}</H1>
                <ReactMarkdown source={data.secondCopy} />
                {secondButtons}
              </CopyBlock>
              <Img src={data.secondImage ? data.secondImage.fields.file.url : null} alt={data.secondImage ? data.secondImage.fields.title : null} float="right" />
            </Section>
          </Wrapper>
          <Wrapper>
            <Section flexDirection="column">
              <Img src={data.thirdImage ? data.thirdImage.fields.file.url : null} alt={data.thirdImage ? data.thirdImage.fields.title : null} float="left" />
              <CopyBlock float="right">
                <Divider />
                <H1 section>{data.thirdHeader}</H1>
                <ReactMarkdown source={data.thirdCopy} />
                {thirdButtons}
              </CopyBlock>
            </Section>
          </Wrapper>
        </div>
      );
    } catch (err) {
      return <div />;
    }
  }
}

HomeCopyIe.propTypes = {

};

export default HomeCopyIe;
