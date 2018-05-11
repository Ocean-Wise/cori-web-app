/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ResearchOverviewTiles from 'components/ResearchOverviewTiles';
import HomeCopy from 'components/HomeCopy';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Header from 'components/Header';
// import CenteredSection from './CenteredSection';
import Wrapper from './Wrapper';
// import messages from './messages';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      first: 951,
      second: 601,
      third: 348,
      fourth: 348,
      fifth: 601,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      first: document.getElementById('tile-1').clientWidth,
      second: document.getElementById('tile-2').clientWidth,
      third: document.getElementById('tile-3').clientWidth,
      fourth: document.getElementById('tile-4').clientWidth,
      fifth: document.getElementById('tile-5').clientWidth,
    });
  }

  render() {
    return (
      <article>
        <Header />
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Ocean Wise Research" />
        </Helmet>
        <Wrapper>
          <ResearchOverviewTiles first={this.state.first} second={this.state.second} third={this.state.third} fourth={this.state.fourth} fifth={this.state.fifth} />
          <HomeCopy />
        </Wrapper>
      </article>
    );
  }
}

HomePage.propTypes = {

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
