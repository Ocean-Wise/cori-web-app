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
import RAFilterButtons from 'components/RAFilterButtons';
import DownloadIcon from 'styles/icons/download.svg';
import { saveAs } from 'file-saver/FileSaver';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import PubSearch from 'containers/PubSearch';

import injectReducer from 'utils/injectReducer';
import makeSelectPublications from './selectors';
import reducer from './reducer';
import { addToList, removeFromList } from './actions';

import SelectContainer from './SelectContainer';
// import SearchInput from './SearchInput';
// import messages from './messages';

const styles = () => ({
  root: {
    fontSize: 12,
    border: '1px solid #B2BEC4',
    borderRadius: 2,
    height: 32,
  },
  buttonRoot: {
    minHeight: 'unset',
    maxHeight: 32,
    padding: '3px',
    position: 'relative',
    top: 13,
  },
  selectMenu: {
    paddingLeft: 9,
    paddingTop: 6,
  },
  icon: {
    color: '#00B398',
  },
  badge: {
    paddingTop: 1,
    paddingLeft: 0,
    height: 19,
    width: 19,
    fontSize: 12,
    lineHeight: '18px',
  },
  badgeColor: {
    backgroundColor: '#6A7B83',
  },
});

// TODO: ADD PAGINATION AND FIX SORTING
export class Publications extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    // sorting: 'desc',
    // alpha: false,
    sortType: 'descending',
    searchTerm: '',
    pubLimit: 25,
    pubSkip: 0,
    pubOrder: 'order=-fields.year',
  };

  // setAlpha = () => {
    // this.setState({ alpha: !this.state.alpha, sorting: 'asc' });
  // }

  // swapSort = () => {
    // this.setState({ sorting: this.state.sorting === 'desc' ? 'asc' : 'desc', alpha: false });
  // }

  setOrder = (alpha, dir) => {
    if (alpha) {
      this.setState({ pubOrder: dir ? 'order=-fields.title' : 'order=fields.title' });
    } else {
      this.setState({ pubOrder: dir ? 'order=-fields.year' : 'order=fields.year' });
    }
  }

  generateList = () => {
    const list = this.props.publications.list;
    if (list.length > 0) {
      axios.post(`${window.location.origin}/api/citation`, { list })
        .then((res) => {
          // Split the data by new line, then add Carriage Return and New Line
          // to each line before rejoining
          const data = res.data.split('\n').map((x) => `${x}\r\n`).join('');
          // Make a new UTF-8 file blob
          const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
          // Download it
          saveAs(file, 'OceanWiseResearchCitations.txt');
        })
        .catch();
    }
  }

  toggleSort = (evt) => {
    const sort = evt.target.value;
    let alpha = false;
    let dir = false;
    switch (sort) {
      case 'descending':
        dir = true;
        break;
      case 'ascending':
        dir = false;
        break;
      case 'az':
        alpha = true;
        dir = false;
        break;
      case 'za':
        alpha = true;
        dir = true;
        break;
      default:
        break;
    }
    this.setState({ sortType: sort });
    this.setOrder(alpha, dir);
  };

  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Publications</title>
          <meta name="description" content="Description of Publications" />
        </Helmet>
        <Header />
        <PublicationContent />
        <RAFilterButtons filter={this.props.match} />
        <SelectContainer>
          <div style={{ display: 'flex', paddingTop: 8, flexWrap: 'wrap' }}>
            {/* <SearchInput classame="search-input" onChange={this.searchUpdated} placeholder="Search publications..." /> */}
            <PubSearch />
            <div>
              <span style={{ fontSize: 12, lineHeight: '12px', color: '#4D4D4D', marginTop: 12 }}>SORT:&nbsp;&nbsp;</span>
              <Select value={this.state.sortType} onChange={this.toggleSort} displayEmpty name="sort" input={<Input disableUnderline />} classes={{ root: this.props.classes.root, selectMenu: this.props.classes.selectMenu, icon: this.props.classes.icon }}>
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
          </div>
          <Button classes={{ root: this.props.classes.buttonRoot }} onClick={this.generateList}>Generate Citation List <Badge classes={{ badge: this.props.classes.badge, colorPrimary: this.props.classes.badgeColor }} badgeContent={this.props.publications.list.length > 0 ? this.props.publications.list.length : ''} color={this.props.publications.list.length > 0 ? 'primary' : 'default'}><img src={DownloadIcon} alt="Download" style={{ height: 25 }} /></Badge></Button>
        </SelectContainer>
        <div style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.24), 8px -8px 0 0 #CCF0EA', maxWidth: 1120, margin: '0 auto 120px', overflow: 'hidden' }}>
          <GetPublications
            match={this.props.match}
            selected={this.props.publications.list}
            // sort={this.state.sorting}
            // alpha={this.state.alpha}
            addToList={this.props.addItem}
            removeFromList={this.props.removeItem}
            searchTerm={this.state.searchTerm}
            limit={this.state.pubLimit}
            skip={this.state.pubSkip}
            order={this.state.pubOrder}
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
