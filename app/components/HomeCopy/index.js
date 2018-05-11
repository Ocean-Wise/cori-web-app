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

import H1 from 'components/H1';
import Blockquote from 'components/Blockquote';
import Button from 'components/Button';

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
        <div style={{ width: '50%', display: 'block', margin: '0 auto' }}>
          <center>
            <H1>{data.headline}</H1>
            <Blockquote>{data.subheader}</Blockquote>
            <ReactMarkdown source={data.introCopy} />
          </center>
        </div>
        <div style={{ width: '55%', display: 'block', margin: '70px auto', height: 450 }}>
          <img src={data.firstImage.url} alt={data.firstImage.title} style={{ float: 'left', marginLeft: 10 }} />
          <div style={{ float: 'right', maxWidth: 405 }}>
            <H1>{data.firstHeader}</H1>
            <ReactMarkdown source={data.firstCopy} />
            {firstButtons}
          </div>
        </div>
        <div style={{ width: '55%', display: 'block', margin: '70px auto', height: 450 }}>
          <div style={{ float: 'left', maxWidth: 405, marginLeft: 10 }}>
            <H1>{data.secondHeader}</H1>
            <ReactMarkdown source={data.secondCopy} />
            {secondButtons}
          </div>
          <img src={data.secondImage.url} alt={data.secondImage.title} style={{ float: 'right' }} />
        </div>
        <div style={{ width: '55%', display: 'block', margin: '70px auto', height: 450 }}>
          <img src={data.thirdImage.url} alt={data.thirdImage.title} style={{ float: 'left', marginLeft: 10 }} />
          <div style={{ float: 'right', maxWidth: 405 }}>
            <H1>{data.thirdHeader}</H1>
            <ReactMarkdown source={data.thirdCopy} />
            {thirdButtons}
          </div>
        </div>
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
