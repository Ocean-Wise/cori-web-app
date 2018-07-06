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
import DownloadIcon from 'styles/icons/download.svg';

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
        {/* TODO: Make this a function component that pulls in CMS data */}
        <div style={{ maxWidth: 730, margin: '0 auto' }}>
          <center>
            <h1>Publications</h1>
            <p>Vivamus non quam, efficitur, consectetur ante sed, tincidunt tortor. Fusce ut tincidunt nisi, ac condimentum quam.</p>
          </center>
        </div>
        {/* TODO: Make this a select menu. Make this div into a styled component
                  Add a function to the backend that ensures there is at least one citation!
         */}
        <div style={{ borderBottom: '1px solid #00B398', maxWidth: 1120, margin: '63px auto' }}>
          <Button onClick={this.swapSort}>Sort Year {this.state.sorting === 'asc' ? 'Descending' : 'Ascending'}</Button>
          <Button onClick={this.setAlpha}>Sort Alphabetically</Button>
          <Button onClick={this.generateList}>Generate Citation List <img src={DownloadIcon} alt="Download" style={{ height: 25 }} /></Button>
        </div>
        {/* TODO: Make this div into a styled component. Update styles within GetPublications' PublicationCard */}
        <div style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.24), 8px -8px 0 0 #CCF0EA', maxWidth: 1120, margin: '0 auto 120px' }}>
          <GetPublications
            match={this.props.match}
            selected={this.props.publications.list}
            sort={this.state.sorting}
            alpha={this.state.alpha}
            addToList={this.props.addItem}
            removeFromList={this.props.removeItem}
          />
        </div>
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
