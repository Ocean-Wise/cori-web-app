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
import Header from 'components/Header';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import PublicationContent from 'components/PublicationContent';
import GetPublications from 'components/GetPublications/Loadable';
import DownloadIcon from 'styles/icons/download.svg';

import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import injectReducer from 'utils/injectReducer';
import makeSelectPublications from './selectors';
import reducer from './reducer';
import { addToList, removeFromList } from './actions';

import SelectContainer from './SelectContainer';
// import messages from './messages';

const styles = () => ({
  root: {
    fontSize: 12,
    border: '1px solid #B2BEC4',
    borderRadius: 2,
  },
  selectMenu: {
    paddingLeft: 9,
    paddingTop: 7,
  },
  icon: {
    color: '#00B398',
  },
  badge: {
    paddingTop: 2,
    paddingLeft: 1,
  },
});

export class Publications extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    sorting: 'desc',
    alpha: false,
    sortType: 'descending',
  };

  setAlpha = () => {
    this.setState({ alpha: !this.state.alpha, sorting: 'asc' });
  }

  swapSort = () => {
    this.setState({ sorting: this.state.sorting === 'desc' ? 'asc' : 'desc', alpha: false });
  }

  generateList = () => {
    const list = this.props.publications.list;
    if (list.length > 0) {
      axios.post(`${window.location.origin}/api/citation`, { list })
        .then((res) => {
          // BUG: This does not work in Firefox. Why?
          const element = document.createElement('a');
          const file = new Blob([res.data], { type: 'text/richtext' });
          element.href = URL.createObjectURL(file);
          element.download = 'OceanWiseResearchCitations.rtf';
          element.click();
        })
        .catch();
    }
  }

  toggleSort = (evt) => {
    const sort = evt.target.value;

    switch (sort) {
      case 'descending':
        this.setState({ sortType: 'descending', sorting: 'desc', alpha: false });
        break;
      case 'ascending':
        this.setState({ sortType: 'ascending', sorting: 'asc', alpha: false });
        break;
      case 'az':
        this.setState({ sortType: 'az', alpha: true, sorting: 'asc' });
        break;
      case 'za':
        this.setState({ sortType: 'za', alpha: true, sorting: 'desc' });
        break;
      default:
        this.setState({ sortType: 'descending', sorting: 'desc', alpha: false });
    }
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Publications</title>
          <meta name="description" content="Description of Publications" />
        </Helmet>
        <Header />
        <PublicationContent />
        <SelectContainer>
          <div>
            <span style={{ fontSize: 12, lineHeight: '12px', color: '#4D4D4D' }}>SORT:&nbsp;&nbsp;</span>
            <Select value={this.state.sortType} onChange={this.toggleSort} displayEmpty name="sort" classes={{ root: this.props.classes.root, selectMenu: this.props.classes.selectMenu, icon: this.props.classes.icon }}>
              <MenuItem value="descending">
                Year: Descending
              </MenuItem>
              <MenuItem value="ascending">
                Year: Ascending
              </MenuItem>
              <MenuItem value="az">
                Title: A-Z
              </MenuItem>
              <MenuItem value="za">
                Title: Z-A
              </MenuItem>
            </Select>
          </div>
          <Button onClick={this.generateList}>Generate Citation List <Badge classes={{ badge: this.props.classes.badge }} badgeContent={this.props.publications.list.length > 0 ? this.props.publications.list.length : ''} color={this.props.publications.list.length > 0 ? 'primary' : 'default'}><img src={DownloadIcon} alt="Download" style={{ height: 25 }} /></Badge></Button>
        </SelectContainer>
        <div style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.24), 8px -8px 0 0 #CCF0EA', maxWidth: 1120, margin: '0 auto 120px', overflow: 'hidden' }}>
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
  match: PropTypes.object,
  publications: PropTypes.object,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  dispatch: PropTypes.func.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired,
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
  withStyles(styles),
)(Publications);
