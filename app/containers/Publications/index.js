/**
 *
 * Publications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import GetPublications from 'components/GetPublications';
import Header from 'components/Header';

export class Publications extends React.PureComponent { // eslint-disable-line
  state = {
    sorting: 'asc',
    alpha: false,
  };

  setAlpha = () => {
    this.setState({ alpha: !this.state.alpha, sorting: 'asc' });
  }

  swapSort = () => {
    this.setState({ sorting: this.state.sorting === 'desc' ? 'asc' : 'desc', alpha: false });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Publications</title>
          <meta name="description" content="Description of Publications" />
        </Helmet>
        <Header />
        <Button onClick={this.swapSort}>Sort Year {this.state.sorting === 'asc' ? 'Descending' : 'Ascending'}</Button>
        <Button onClick={this.setAlpha}>Sort Alphabetically</Button>
        <GetPublications sort={this.state.sorting} alpha={this.state.alpha} />
      </div>
    );
  }
}

Publications.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Publications);
