/**
*
* PublicationContentIe
*
*/

import React from 'react';
import client from 'utils/contentful';
import Container from './Container';
import H3 from './H3';

class PublicationContentIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    copy: {},
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'publicationCopy',
    }).then((res) => this.setData(res.items[0]))
      .catch();
  }

  setData = (copy) => {
    this.setState({ copy });
  }


  render() {
    const { copy } = this.state;
    try {
      return (
        <Container>
          <center>
            <h1>Publications</h1>
            <H3>{copy.copy}</H3>
          </center>
        </Container>
      );
    } catch (err) {
      return <div></div>;
    }
  }
}

PublicationContentIe.propTypes = {

};

export default PublicationContentIe;
