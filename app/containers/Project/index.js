/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import ProjectMembers from 'components/ProjectMembers';

import injectReducer from 'utils/injectReducer';
import makeSelectProject from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class Project extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Project</title>
          <meta name="description" content="Description of Project" />
        </Helmet>
        <Link to={`/team/${this.props.match.params.slug}`}>
          <h3>View our team</h3>
        </Link>
        {/* <ProjectMembers slug={this.props.match.params.slug} /> */}
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
