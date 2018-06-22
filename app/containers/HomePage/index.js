/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ResearchOverviewTiles from 'components/ResearchOverviewTiles/Loadable';
import HomeCopy from 'components/HomeCopy/Loadable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Header from 'components/Header';
// import CenteredSection from './CenteredSection';
import Wrapper from './Wrapper';
// import messages from './messages';
import reducer from './reducer';
import saga from './saga';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <article>
        <Header active={this.props.match.params.slug} />
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Ocean Wise Research" />
        </Helmet>
        <Wrapper>
          <ResearchOverviewTiles />
          <HomeCopy />
        </Wrapper>
      </article>
    );
  }
}

HomePage.propTypes = {
  match: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
