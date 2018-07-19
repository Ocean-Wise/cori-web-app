/**
 *
 * Project
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
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectContent from 'components/ProjectContent';
// import FloatingNav from 'components/FloatingNav';

import injectReducer from 'utils/injectReducer';
import makeSelectProject from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class Project extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     width: window.innerWidth,
  //   };
  // }

  componentDidMount() {
    // this.updateWindowDimensions();
    window.scrollTo(0, 0);
    // window.addEventListener('resize', this.updateWindowDimensions);
  }

  // updateWindowDimensions = () => {
  //   this.setState({ width: window.innerWidth });
  // }

  deslugify = (slug) =>
    slug
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());

  render() {
    // const NAV = this.state.width < 1200 ? '' : <FloatingNav active={this.props.match.params.slug} location={this.props.match} />;
    return (
      <div>
        <Helmet>
          <title>{this.deslugify(this.props.match.params.slug)}</title>
          <meta name="description" content="Description of Project" />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        <Breadcrumbs slug={this.props.match.params.slug} location={this.props.match} project />
        {/* <div style={{ left: 65 }}>
          {NAV}
        </div> */}
        <ProjectContent slug={this.props.match.params.slug} match={this.props.match} />
      </div>
    );
  }
}

Project.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  project: makeSelectProject(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'project', reducer });

export default compose(
  withReducer,
  withConnect,
)(Project);
