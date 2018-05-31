/**
 *
 * ApolloWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import injectReducer from 'utils/injectReducer';
import { makeSelectLocale } from './selectors';
import reducer from './reducer';

// Set up the Apollo clients to interface with our GraphQL endpoints
const enClient = new ApolloClient({ uri: `${window.location.origin}/graphql-en` });
const frClient = new ApolloClient({ uri: `${window.location.origin}/graphql-fr` });

export class ApolloWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      locale: this.props.locale,
    };
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props;
    if (this.props.locale !== prevProps.locale) {
      this.updateApollo(locale);
    }
  }

  updateApollo = (locale) => {
    this.setState({ locale });
  }

  render() {
    const client = this.props.locale === 'en' ? enClient : frClient;
    return (
      <ApolloProvider client={client}>
        <div>
          {this.props.children}
        </div>
      </ApolloProvider>
    );
  }
}

ApolloWrapper.propTypes = {
  children: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'apolloWrapper', reducer });

export default compose(
  withReducer,
  withConnect,
)(ApolloWrapper);
