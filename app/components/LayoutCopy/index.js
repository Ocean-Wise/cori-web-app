/**
*
* LayoutCopy
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import getLayoutCopy from 'graphql/queries/getLayoutCopy.graphql';

function LayoutCopy({ data: { layoutCopy } }) {
  let copy;
  try {
    copy = layoutCopy.copy;
  } catch (err) {
    copy = '';
  }

  return (
    <ReactMarkdown source={copy} />
  );
}

LayoutCopy.propTypes = {
  data: PropTypes.object.isRequired,
  copyId: PropTypes.string,
};

export default graphql(getLayoutCopy, {
  options: (props) => ({
    variables: {
      copyId: props.copyId,
    },
  }),
})(LayoutCopy);
