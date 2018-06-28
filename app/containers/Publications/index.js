/**
 *
 * Publications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import GetPublications from 'components/GetPublications/Loadable';
import Header from 'components/Header';

import injectReducer from 'utils/injectReducer';
import makeSelectPublications from './selectors';
import reducer from './reducer';
import { addToList, removeFromList } from './actions';
// import messages from './messages';

export class Publications extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

  generateList = () => {
    const list = this.props.publications.list;
    axios.post(`${window.location.origin}/api/citation`, { list })
      .then((res) => {
        // BUG: This does not work in Firefox. Why?
        const element = document.createElement('a');
        const file = new Blob([res.data], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'OceanWiseResearch.bib';
        element.click();
      })
      .catch();
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
        <Button onClick={this.generateList}>Generate Reading List</Button>
        <GetPublications
          match={this.props.match}
          selected={this.props.publications.list}
          sort={this.state.sorting}
          alpha={this.state.alpha}
          addToList={this.props.addItem}
          removeFromList={this.props.removeItem}
        />
      </div>
    );
  }
}

Publications.propTypes = {
  // updateList: PropTypes.func,
  match: PropTypes.object,
  publications: PropTypes.object,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  dispatch: PropTypes.func.isRequired, // eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  publications: makeSelectPublications(),
});

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) => dispatch(addToList(item)),
    removeItem: (item) => dispatch(removeFromList(item)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'publications', reducer });

export default compose(
  withReducer,
  withConnect,
)(Publications);
