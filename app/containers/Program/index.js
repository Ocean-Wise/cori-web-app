/**
 *
 * Program
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header/Loadable';
import FloatingNav from 'components/FloatingNav/Loadable';
import ProgramContent from 'components/ProgramContent';

import injectReducer from 'utils/injectReducer';
import makeSelectProgram from './selectors';
import reducer from './reducer';
// import messages from './messages';

export class Program extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const NAV = this.state.width < 1226 ? '' : <FloatingNav active={this.props.match.params.slug} location={this.props.match} />;
    return (
      <div>
        <Helmet>
          <title>Program</title>
          <meta name="description" content="Description of Program" />
        </Helmet>
        <Header active={this.props.match.params.slug} />
        {NAV}
        <ProgramContent slug={this.props.match.params.slug} match={this.props.match} />
      </div>
    );
  }
}

Program.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  program: makeSelectProgram(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'program', reducer });

export default compose(
  withReducer,
  withConnect,
)(Program);
