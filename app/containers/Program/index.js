/**
 *
 * Program
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectProgram from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class Program extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Program</title>
          <meta name="description" content="Description of Program" />
        </Helmet>
      </div>
    );
  }
}

Program.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  program: makeSelectProgram(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'program', reducer });

export default compose(
  withReducer,
  withConnect,
)(Program);
