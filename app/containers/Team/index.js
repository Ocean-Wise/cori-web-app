/**
 *
 * Team
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import R from 'ramda';
import injectReducer from 'utils/injectReducer';

import Header from 'components/Header';
import TeamMembers from 'components/TeamMembers/Loadable';
import TeamMembersIe from 'components/TeamMembersIe/Loadable';
import TeamCopy from 'components/TeamCopy';
import TeamCopyIe from 'components/TeamCopyIe';
import AreaMembers from 'components/AreaMembers/Loadable';
import AreaMembersIe from 'components/AreaMembersIe/Loadable';
import RAFilterButtons from 'components/RAFilterButtons';
import RAfilterButtonsIe from 'components/RAfilterButtonsIe';

import makeSelectTeam from './selectors';
import reducer from './reducer';

export class Team extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const isIE = /* @cc_on!@ */false || !!document.documentMode;
    const Copy = isIE ? <TeamCopyIe /> : <TeamCopy />;
    const FilterButtons = isIE ? <RAfilterButtonsIe filter={this.props.match} /> : <RAFilterButtons filter={this.props.match} />;
    const member = /[^#]*$/g.exec(this.props.location.hash)[0];
    const MemberComponent = R.isEmpty(this.props.match.params) ? isIE ? <TeamMembersIe member={member} /> : <TeamMembers member={member} /> : isIE ? <AreaMembersIe slug={this.props.match.params.slug} /> : <AreaMembers slug={this.props.match.params.slug} />; // eslint-disable-line
    return (
      <div>
        <Helmet>
          <title>Our Team</title>
          <meta name="description" content="Description of Team" />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        {Copy}
        {FilterButtons}
        {MemberComponent}
      </div>
    );
  }
}

Team.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
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
