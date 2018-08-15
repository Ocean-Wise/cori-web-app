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
import Header from 'components/Header';
import AnnapolisSurvey from 'components/AnnapolisSurvey';
import LingcodSurvey from 'components/LingcodSurvey';
import RockfishSurvey from 'components/RockfishSurvey';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import makeSelectSurvey from './selectors';
import reducer from './reducer';
import { uploadRequest } from './actions';
import saga from './saga';
// import messages from './messages';

let SURVEY;

export class Survey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  // Check if we have received an updated survey prop from our submission saga
  componentDidUpdate(prevProps) {
    if (prevProps.survey !== this.props.survey) {
      // The survey prop has changed. Update the submitted state value to be equal to the value in the prop
      this.updateSubmit();
    }
  }

  updateSubmit = () => {
    this.setState({ submitted: this.props.survey.submitted });
  }

  // Handle the dispatch our uploadRequest Redux action
  handleSubmit = ({ files, name, surveyData }) => {
    this.props.dispatch(uploadRequest({
      // Send our files to upload...
      files,
      // the survey name...
      name,
      // and the survey data
      surveyData,
    }));
  }

  // Make a passed slug into a well formatted string
  deslugify = (slug) =>
    slug
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());

  render() {
    // Select which survey to show based on the current slug
    switch (this.props.match.params.slug) {
      case 'annapolis':
        // Set the SURVEY variable. Pass our handleFileUpload function as upload() and our submitted boolean state value to the component
        SURVEY = <AnnapolisSurvey upload={this.handleSubmit} submitted={this.state.submitted} />;
        break;
      case 'lingcod':
        SURVEY = <LingcodSurvey upload={this.handleSubmit} submitted={this.state.submitted} />;
        break;
      case 'rockfish':
        SURVEY = <RockfishSurvey upload={this.handleSubmit} submitted={this.state.submitted} />;
        break;
      default:
        break;
    }

    return (
      <div>
        <Helmet>
          <title>{this.deslugify(this.props.match.params.slug)} Survey</title>
          <meta name="description" content="Completing our citizen science surveys helps us our researchers by providing valuable data for research projects." />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        {SURVEY}
      </div>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  survey: PropTypes.object,
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
