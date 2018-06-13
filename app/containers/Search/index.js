/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { InstantSearch, SearchBox, Index, Highlight, PoweredBy, Configure } from 'react-instantsearch/dom';
import { connectHits } from 'react-instantsearch/connectors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const styles = () => ({
  paper: {
    width: '85%',
  },
});

class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      searchState: {},
    };
  }

  onSearchStateChange = (searchState) => {
    this.setState({ searchState });
  }

  toggleSearch = () => {
    this.setState({ search: !this.state.search });
  }

  render() {
    const { fullScreen, classes } = this.props;
    const showHits = Object.keys(this.state.searchState).length !== 0;

    const CustomHits = connectHits(({ hits, type }) => { // eslint-disable-line
      if (this.state.searchState.query === '') return null;
      if (hits.length > 0) {
        return (
          <div style={{ borderBottom: '1px solid black' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>{type}</span>
            {hits.map((hit) => { // eslint-disable-line
              const result = hit.slug ? (
                <Link to={hit.slug}>
                  <Highlight attribute="title" hit={hit} />
                </Link>
              ) : <Highlight attribute="title" hit={hit} />;

              return (
                <div key={hit.objectID}>
                  <span>
                    {result}
                  </span>
                </div>
              );
            })}
          </div>
        );
      } else { // eslint-disable-line
        return null;
      }
    });

    return (
      <div>
        <IconButton aria-label="Search" onClick={this.toggleSearch}>
          <SearchIcon />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.search}
          onClose={this.toggleSearch}
          aria-labelledby="responsive-search-dialog"
          classes={classes}
        >
          <DialogTitle id="responsive-search-dialog">{'Search'}</DialogTitle>
          <DialogActions>
            <Button onClick={this.toggleSearch} color="primary">
              Close
            </Button>
          </DialogActions>
          <DialogContent>
            <InstantSearch
              appId="KOG4SU5EI9"
              apiKey="71bf64d883b42cdf7ee10f58595ff891"
              indexName="ResearchAreas"
              searchState={this.state.searchState}
              onSearchStateChange={this.onSearchStateChange}
            >
              <SearchBox />
              <Configure hitsPerPage={5} />
              <Index indexName="ResearchAreas">
                {showHits ? <CustomHits type="Research Areas" /> : ''}
              </Index>
              <Index indexName="Programs">
                {showHits ? <CustomHits type="Programs" /> : ''}
              </Index>
              <Index indexName="Projects">
                {showHits ? <CustomHits type="Projects" /> : ''}
              </Index>
              <Index indexName="Publications">
                {showHits ? <CustomHits type="Publications" /> : ''}
              </Index>
              <Index indexName="People">
                {showHits ? <CustomHits type="People" /> : ''}
              </Index>
              <PoweredBy />
            </InstantSearch>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Search.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired, // eslint-disable-line
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
  withMobileDialog(),
  withStyles(styles)
)(Search);
