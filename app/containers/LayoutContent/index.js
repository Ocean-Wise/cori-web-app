/**
 *
 * LayoutContent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LayoutHero from 'components/LayoutHero';
import LayoutCopy from 'components/LayoutCopy';

import injectReducer from 'utils/injectReducer';
import makeSelectLayoutContent from './selectors';
import reducer from './reducer';

export class LayoutContent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <LayoutHero heroId={this.props.heroId} />
        <LayoutCopy copyId={this.props.copyId} />
      </div>
    );
  }
}

LayoutContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  heroId: PropTypes.string,
  copyId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  layoutcontent: makeSelectLayoutContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'layoutContent', reducer });

export default compose(
  withReducer,
  withConnect,
)(LayoutContent);
