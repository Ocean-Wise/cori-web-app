/**
 *
 * Survey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Annapolis from 'components/Annapolis';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import makeSelectSurvey from './selectors';
import reducer from './reducer';
import { uploadRequest } from './actions';
import saga from './saga';
// import messages from './messages';

let SURVEY;

export class Survey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    switch (this.props.match.params.slug) {
      case 'annapolis':
        SURVEY = <Annapolis upload={this.handleFileUpload} />;
        break;
      default:
        break;
    }
  }

  handleFileUpload = ({ files, name }) => {
    // const file = files[0];
    this.props.dispatch(uploadRequest({
      files,
      name,
    }));
  }

  deslugify = (slug) =>
    slug
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.deslugify(this.props.match.params.slug)} Survey</title>
          <meta name="description" content="Completing our citizen science surveys helps us our researchers by providing valuable data for research projects." />
        </Helmet>
        {SURVEY}
      </div>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  survey: makeSelectSurvey(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'survey', reducer });
const withSaga = injectSaga({ key: 'survey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Survey);
