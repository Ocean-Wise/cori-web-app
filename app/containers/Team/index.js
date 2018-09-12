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
          {/* Search Engine */}
          <meta name="description" content="Meet the Ocean Wise Research team" />
          <meta name="image" content="http://images.ctfassets.net/fsquhe7zbn68/1W8cGTEbmQaYIoYMEIQWCO/a59d36fa88a13e2f7a0ba446a60b0309/frank-busch-731184-unsplash.jpg" />
          {/* Schema.org for Google */}
          {/* eslint-disable */}
          <meta itemprop="name" content="Ocean Wise Research Team" />
          <meta itemprop="image" content="http://images.ctfassets.net/fsquhe7zbn68/1W8cGTEbmQaYIoYMEIQWCO/a59d36fa88a13e2f7a0ba446a60b0309/frank-busch-731184-unsplash.jpg" />
          {/* eslint-enable */}
          {/* Twitter */}
          <meta name="twitter:title" content="Ocean Wise Research Team" />
          <meta name="twitter:description" content="Meet the Ocean Wise Research team" />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:title" content="Ocean Wise Research Team" />
          <meta name="og:description" content="Meet the Ocean Wise Research team" />
          <meta name="og:image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
          <meta name="og:url" content="https://research.ocean.org/team" />
          <meta name="og:site_name" content="Ocean Wise Research" />
          <meta name="og:type" content="website" />
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
