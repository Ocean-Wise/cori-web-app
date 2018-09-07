/**
*
* TeamCopyIe
*
*/

import React from 'react';
import client from 'utils/contentful';
import Container from './Container';
import H3 from './H3';

class TeamCopyIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    teamCopy: [],
  };

  componentWillMount() {
    client.getEntries({
      content_type: 'teamCopy',
    }).then((res) => this.setData(res.items[0].fields))
      .catch();
  }

  setData = (teamCopy) => {
    this.setState({ teamCopy });
  }

  render() {
    const { teamCopy } = this.state;
    return (
      <Container>
        <h1>{teamCopy.headline}</h1>
        <H3>{teamCopy.copy}</H3>
      </Container>
    );
  }
}

TeamCopyIe.propTypes = {

};

export default TeamCopyIe;
