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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Header from 'components/Header';
import H2 from 'components/H2';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import PublicationContent from 'components/PublicationContent';
import PublicationContentIe from 'components/PublicationContentIe';
import GetPublications from 'components/GetPublications/Loadable';
import RAFilterButtons from 'components/RAFilterButtons';
import DownloadIcon from 'styles/icons/download.svg';
import { saveAs } from 'file-saver/FileSaver';
import ReactGA from 'react-ga';
import client from 'utils/contentful';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import PubSearch from 'containers/PubSearch';
import ReactPaginate from 'react-paginate';

import injectReducer from 'utils/injectReducer';
import makeSelectPublications from './selectors';
import reducer from './reducer';
import { addToList, removeFromList, setLimit } from './actions';

import SelectContainer from './SelectContainer';
import H3 from './H3';
import A from './A';

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

export class Publications extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    sortType: 'descending',
    searchTerm: '',
    pubSkip: 0,
    page: 0,
    pubOrder: 'order=-fields.year',
    totalPubs: 0,
    totalPages: 0,
  };

  componentWillMount() {
    this.getTotalEntries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getTotalEntries();
    }
  }

  getTotalEntries = () => { // eslint-disable-line
    return new Promise((res) => {
      if (this.props.match.params.slug !== undefined) {
        client.getEntries({
          content_type: 'researchPapers',
          'fields.researchArea.sys.contentType.sys.id': 'researchArea',
          'fields.researchArea.fields.slug[match]': this.props.match.params.slug,
        })
        .then((content) => {
          this.setState({ totalPubs: content.total, totalPages: content.total / this.props.publications.limit });
          res();
        });
      } else {
        client.getEntries({
          content_type: 'researchPapers',
        })
        .then((content) => {
          this.setState({ totalPubs: content.total, totalPages: content.total / this.props.publications.limit });
          res();
        });
      }
    });
  }

  setOrder = (alpha, dir) => {
    if (alpha) {
      this.setState({ pubOrder: dir ? 'order=-fields.title' : 'order=fields.title' });
    } else {
      this.setState({ pubOrder: dir ? 'order=-fields.year' : 'order=fields.year' });
    }
  }

  deslugify = (slug) =>
    slug.replace(/-/gi, ' ')
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

  handlePageClick = (data) => {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.props.publications.limit);
    this.setState({ page: selected, pubSkip: offset, totalPages: this.state.totalPubs / this.props.publications.limit });
  }

  generateList = () => {
    const list = this.props.publications.list;
    if (list.length > 0) {
      axios.post(`${window.location.origin}/api/citation`, { list })
        .then((res) => {
          // Record this in Google Analytics
          ReactGA.event({
            category: 'Publications',
            action: 'Downloaded citation list',
            value: list.length,
          });
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

  toggleLimit = (evt) => {
    const pubLimit = evt.target.value;
    this.getTotalEntries().then(() => {
      const totalPages = this.state.totalPubs / pubLimit;
      this.props.setLimit(pubLimit);
      this.setState({ totalPages, page: 0 });
    });
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
    this.setState({ sortType: sort, page: 0, pubSkip: 0 });
    this.setOrder(alpha, dir);
  };

  searchUpdated = (term) => {
    this.setState({ searchTerm: term });
  }

  render() {
    const isIE = /* @cc_on!@ */false || !!document.documentMode;
    if (isIE) {
      return (
        <div>
          <Helmet>
            <title>Publications</title>
            {/* Search Engine */}
            <meta name="description" content="Read the research articles that our researchers have published" />
            <meta name="image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
            {/* Schema.org for Google */}
            {/* eslint-disable */}
            <meta itemprop="name" content="Ocean Wise Research Publications" />
            <meta itemprop="description" content="Read the research articles that our researchers have published" />
            <meta itemprop="image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
            {/* eslint-enable */}
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Ocean Wise Research Publications" />
            <meta name="twitter:description" content="Read the research articles that our researchers have published" />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content="Ocean Wise Research Publications" />
            <meta name="og:description" content="Read the research articles that our researchers have published" />
            <meta name="og:image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
            <meta name="og:url" content="https://research.ocean.org" />
            <meta name="og:site_name" content="Ocean Wise Research" />
            <meta name="og:type" content="website" />
          </Helmet>
          <Header />
          <PublicationContentIe />
          <center>
            <H3>This feature is not avaliable on your browser. Please <A href="http://outdatedbrowser.com">update your browser</A>.</H3>
            <H3>You can still look for research papers via the search function located at the top of the page.</H3>
          </center>
        </div>
      );
    }
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
            <div style={{ marginLeft: 10 }}>
              <span style={{ fontSize: 12, lineHeight: '12px', color: '#4D4D4D', marginTop: 12 }}>LIMIT:&nbsp;&nbsp;</span>
              <Select value={this.props.publications.limit} onChange={this.toggleLimit} name="limit" input={<Input disableUnderline />} classes={{ root: this.props.classes.root, selectMenu: this.props.classes.selectMenu, icon: this.props.classes.icon }}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
              </Select>
            </div>
          </div>
          <Button classes={{ root: this.props.classes.buttonRoot }} onClick={this.generateList}>Generate Citation List <Badge classes={{ badge: this.props.classes.badge, colorPrimary: this.props.classes.badgeColor }} badgeContent={this.props.publications.list.length > 0 ? this.props.publications.list.length : ''} color={this.props.publications.list.length > 0 ? 'primary' : 'default'}><img src={DownloadIcon} alt="Download" style={{ height: 25 }} /></Badge></Button>
        </SelectContainer>
        {/* eslint-disable */}
        {this.state.totalPages > 0 ? (
          <div>
            <div style={{ maxWidth: 1120, margin: '0 auto' }}>
              <ReactPaginate
                previousLabel={window.innerWidth < 415 ? '<' : 'Previous'}
                nextLabel={window.innerWidth < 415 ? '>' : 'Next'}
                forcePage={this.state.page}
                /* eslint-disable */
                breakLabel={<a href="#">...</a>}
                /* eslint-enable */
                breakClassName={'break-me'}
                pageCount={this.state.totalPages}
                marginPagesDisplayed={window.innerWidth < 415 ? 0 : 1}
                pageRangeDisplayed={window.innerWidth < 415 ? 2 : 3}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
            <GetPublications
              match={this.props.match}
              selected={this.props.publications.list}
              addToList={this.props.addItem}
              removeFromList={this.props.removeItem}
              searchTerm={this.state.searchTerm}
              limit={this.props.publications.limit}
              skip={this.state.pubSkip}
              order={this.state.pubOrder}
            />
            <div style={{ maxWidth: 1120, margin: '5px auto 120px' }}>
              <ReactPaginate
                previousLabel={window.innerWidth < 415 ? '<' : 'Previous'}
                nextLabel={window.innerWidth < 415 ? '>' : 'Next'}
                forcePage={this.state.page}
                /* eslint-disable */
                breakLabel={<a href="#">...</a>}
                /* eslint-enable */
                breakClassName={'break-me'}
                pageCount={this.state.totalPages}
                marginPagesDisplayed={window.innerWidth < 415 ? 0 : 1}
                pageRangeDisplayed={window.innerWidth < 415 ? 2 : 3}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        ) : this.props.match.params.slug ? (
          <div style={{ textAlign: 'center', maxWidth: 1120, margin: '0 auto', overflow: 'hidden' }}>
            <H2>No publications found under &#8216;{this.deslugify(this.props.match.params.slug)}&#8217;</H2>
          </div>
        ) : ''}
        {/* eslint-enable */}
      </div>
    );
  }
}

Publications.propTypes = {
  match: PropTypes.object,
  publications: PropTypes.object,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  setLimit: PropTypes.func,
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
    setLimit: (limit) => dispatch(setLimit(limit)),
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
