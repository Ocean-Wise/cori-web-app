/**
 *
 * About
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header';
import AboutContent from 'components/AboutContent';
// import FloatingNav from 'components/FloatingNav';

import injectReducer from 'utils/injectReducer';
import makeSelectAbout from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class About extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    if (this.props.location.hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        try {
          const el = document.getElementById(this.props.location.hash.substring(1));
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
          // Element didn't exist yet, but we don't want to stop the page from rendering
        }
      }, 1500);
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    // const NAV = this.state.width < 1200 ? '' : <FloatingNav active={this.props.match.params.slug} location={this.props.match} />;
    return (
      <div>
        <Helmet>
          <title>About</title>
          <meta name="description" content="About Ocean Wise Research" />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        <AboutContent width={this.state.width} />
      </div>
    );
  }
}

About.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  about: makeSelectAbout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'about', reducer });

export default compose(
  withReducer,
  withConnect,
)(About);
