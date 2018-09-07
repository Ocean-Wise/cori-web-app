/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header';
import Breadcrumbs from 'components/Breadcrumbs';
import ProjectContent from 'components/ProjectContent';
import ProjectContentIe from 'components/ProjectContentIe';

import injectReducer from 'utils/injectReducer';
import makeSelectProject from './selectors';
import reducer from './reducer';

export class Project extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  deslugify = (slug) =>
    slug
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());

  render() {
    const isIE = /* @cc_on!@ */false || !!document.documentMode;
    return (
      <div>
        <Helmet>
          <title>{this.deslugify(this.props.match.params.slug)}</title>
          <meta name="description" content="Description of Project" />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        {isIE ? '' : <Breadcrumbs slug={this.props.match.params.slug} location={this.props.match} project />}
        {isIE ? <ProjectContentIe slug={this.props.match.params.slug} match={this.props.match} history={this.props.history} /> : <ProjectContent slug={this.props.match.params.slug} match={this.props.match} history={this.props.history} />}
      </div>
    );
  }
}

Project.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object,
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
