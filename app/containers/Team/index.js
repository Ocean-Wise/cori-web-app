/**
 *
 * Team
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import R from 'ramda';

import Header from 'components/Header/Loadable';
import TeamMembers from 'components/TeamMembers';
// import ProjectMembers from 'components/ProjectMembers';
import AreaMembers from 'components/AreaMembers';

import injectReducer from 'utils/injectReducer';
import makeSelectTeam from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class Team extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const MemberComponent = R.isEmpty(this.props.match.params) ? <TeamMembers /> : <AreaMembers slug={this.props.match.params.slug} />;
    return (
      <div>
        <Helmet>
          <title>Team</title>
          <meta name="description" content="Description of Team" />
        </Helmet>
        <Header />
        {MemberComponent}
      </div>
    );
  }
}

Team.propTypes = {
  match: PropTypes.object,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  team: makeSelectTeam(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'team', reducer });

export default compose(
  withReducer,
  withConnect,
)(Team);
