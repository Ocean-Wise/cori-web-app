/**
 *
 * ResearchArea
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
import ResearchAreaContent from 'components/ResearchAreaContent';
import FloatingNav from 'components/FloatingNav';

import injectReducer from 'utils/injectReducer';
import makeSelectResearchArea from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class ResearchArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Research</title>
          <meta name="description" content="Description of ResearchArea" />
        </Helmet>
        <Header />
        <FloatingNav active={this.props.match.params.slug} location={this.props.match} />
        <ResearchAreaContent slug={this.props.match.params.slug} match={this.props.match} />
      </div>
    );
  }
}

ResearchArea.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  researcharea: makeSelectResearchArea(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'researchArea', reducer });

export default compose(
  withReducer,
  withConnect,
)(ResearchArea);
