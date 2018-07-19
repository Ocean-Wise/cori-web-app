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
import Breadcrumbs from 'components/Breadcrumbs';
import ResearchAreaContent from 'components/ResearchAreaContent';
import FloatingNav from 'components/FloatingNav';

import injectReducer from 'utils/injectReducer';
import makeSelectResearchArea from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class ResearchArea extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.scrollTo(0, 0);
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const NAV = this.state.width < 1200 ? '' : <FloatingNav active={this.props.match.params.slug} location={this.props.match} />;
    const spotlight = !(this.props.match.params.slug === 'cori' || this.props.match.params.slug === 'vancouver-aquarium');

    return (
      <div>
        <Helmet>
          <title>Research</title>
          <meta name="description" content="Description of ResearchArea" />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        <Breadcrumbs slug={this.props.match.params.slug} location={this.props.match} research />
        {NAV}
        <ResearchAreaContent spotlight={spotlight} slug={this.props.match.params.slug} match={this.props.match} width={this.state.width} />
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
