/**
 *
 * SurveyCopy
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import client from 'utils/contentful';
import { Helmet } from 'react-helmet';

import H1 from './H1';
import IntroContainer from './IntroContainer';
import Wrapper from './Wrapper';
import Divider from './Divider';

/* eslint-disable */
function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
/* eslint-enable */

class SurveyCopy extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    data: [],
  };

  componentWillMount() {
    client
      .getEntries({
        content_type: 'survey',
      })
      .then((res) => {
        // Get the data
        const survey = res.items.find((item) => item.fields.slug === this.props.surveySlug);
        this.setData(survey.fields);
      })
      .catch();
  }

  setData = (data) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    try {
      return (
        <div>
          <Helmet>
            {/* Search Engine */}
            <meta name="description" content={data.bodyCopy} />
            {/* Schema.org for Google */}
            {/* eslint-disable */}
            <meta itemprop="description" content={data.bodyCopy} />
            {/* eslint-enable */}
            {/* Twitter */}
            <meta name="twitter:description" content={data.bodyCopy} />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:description" content={data.bodyCopy} />
          </Helmet>
          <Wrapper>
            <IntroContainer>
              <H1>{data.title}</H1>
              <Divider />
              <ReactMarkdown
                renderers={{ link: LinkRenderer }}
                escapeHtml={false}
                source={data.bodyCopy}
              />
            </IntroContainer>
          </Wrapper>
        </div>
      );
    } catch (err) {
      return <div />;
    }
  }
}

SurveyCopy.propTypes = {
  surveySlug: PropTypes.string,
};

export default SurveyCopy;
