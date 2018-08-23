/**
 *
 * PubSearch
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { InstantSearch, SearchBox, Index, Highlight } from 'react-instantsearch/dom';
import { connectHits, connectStateResults } from 'react-instantsearch/connectors';
import OWButton from 'components/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from 'styles/icons/search.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PoweredBy from 'styles/icons/algolia.svg';
import { Scrollbars } from 'react-custom-scrollbars';

import Link from './Link';
import A from './A';
import Container from './Container';

class PubSearch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      search: false,
    };
  }

  toggleSearch = () => {
    this.setState({ search: !this.state.search });
  }

  render() {
    const { fullScreen } = this.props;

    // The object to hold the Algolia query results
    let queryResults = {};

    /**
     * CustomHits allows us to render our query results however
     * we want. We check to ensure the query is not null which
     * allows us to hide the category if so. We then return a
     * div with the passed 'type' string as the category title
     * before rendering all the results
     */
    const CustomHits = connectHits(({ hits, type }) => { // eslint-disable-line
      if (queryResults.query === '') return null;
      if (hits.length > 0) {
        // If there is a slug in the current hit, render it as a Link
        // otherwise just render the text
        return (
          <div style={{ borderBottom: '1px solid #00B398' }}>
            <span style={{ fontWeight: 'bold', color: '#4D4D4D', fontSize: 18, lineHeight: '21px', paddingBottom: 8 }}>{type}</span>
            {hits.map((hit) => { // eslint-disable-line
              let result;
              // Is there a slug in the hit?
              if (hit.slug) {
                // Is the slug an external link?
                if (hit.slug.match(/https?:\/\//g)) {
                  // Yeah, so link with <a>
                  result = (
                    <A href={hit.slug} target="_blank">
                      <Highlight attribute="title" hit={hit} />
                    </A>
                  );
                } else {
                  // No, so link with react-router
                  result = (
                    <Link to={hit.slug} style={{ color: '' }}>
                      <Highlight attribute="title" hit={hit} />
                    </Link>
                  );
                }
              } else {
                // There is no slug, so just output the highlighted text
                result = (
                  <Highlight attribute="title" hit={hit} />
                );
              }

              return (
                <div key={hit.objectID} style={{ paddingBottom: 8 }}>
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

    /**
     * Results allows us to read the Algolia searchState without updating
     * our component needlessly, thus resulting in a greatly reduced query
     * per second rate.
     */
    const Results = connectStateResults(({ searchState }) => {
      // Set our queryResults object
      queryResults = searchState;
      // Check if there are results
      const hasResults = queryResults.query !== undefined && queryResults.query !== '';
      // Set the height appropiately.
      // If there are results set the height not 0. If we are mobile set 700 else 550
      const height = hasResults ? fullScreen ? 700 : 550 : 0; // eslint-disable-line
      // Return the results for each Algolia index
      return (
        <div>
          {hasResults ? <h2 style={{ color: '#00B398', fontSize: 24, fontWeight: 300, letterSpacing: '2.57px', lineHeight: '35px', textTransform: 'uppercase' }}>Results</h2> : ''}
          <Scrollbars style={{ height, width: 'auto' }}>
            <Index indexName="Publications">
              {hasResults ? <CustomHits type="Publications" /> : ''}
            </Index>
          </Scrollbars>
        </div>
      );
    });

    return (
      <Container>
        <div style={{ position: 'relative', bottom: 5 }}>
          <IconButton aria-label="Search" onClick={this.toggleSearch} >
            <img alt="Search" src={SearchIcon} style={{ width: 25 }} />
          </IconButton>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.search}
          onClose={this.toggleSearch}
          aria-labelledby="responsive-search-dialog"
          PaperProps={{ className: 'search-paper' }}
        >
          <DialogContent>
            <InstantSearch
              appId="KOG4SU5EI9"
              apiKey="71bf64d883b42cdf7ee10f58595ff891"
              indexName="ResearchAreas"
            >
              <SearchBox autoFocus searchAsYouType={false} translations={{ placeholder: 'Searching publications...' }} />
              <Results />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginTop: 29, color: '#CCD0D2', fontSize: 12, lineHeight: '18px' }}>SEARCH BY <img style={{ height: 20 }} src={PoweredBy} alt="Algolia" /></div>
                <div style={{ marginTop: 18 }}><OWButton id="close-search" onClick={this.toggleSearch}>Close</OWButton></div>
              </div>
            </InstantSearch>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
}

PubSearch.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
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
)(PubSearch);
