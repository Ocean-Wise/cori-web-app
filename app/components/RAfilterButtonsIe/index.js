/**
*
* RAfilterButtonsIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import client from 'utils/contentful';
import Button from 'components/Button/Loadable';
import Container from './Container';

class RAfilterButtonsIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    researchAreas: [],
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'researchArea',
    }).then((res) => this.setData(res.items))
      .catch();
  }

  setData = (researchAreas) => {
    this.setState({ researchAreas });
  }

  render() {
    const { researchAreas } = this.state;
    const { filter } = this.props;
    try {
      const buttons = [];
      const location = /[a-z]+/g.exec(filter.url)[0];
      researchAreas.forEach((area) => {
        const key = `button-${area.fields.slug}`;
        buttons.push(
          <Link key={key} to={`/${location}/${area.fields.slug}`}>
            <Button noBorder selected={filter.params.slug === area.fields.slug} id={key}>
              {area.fields.title}
            </Button>
          </Link>
        );
      });
      // Sort for CORI and VA to be 0 and 1, respectively
      let coriIndex;
      let vaIndex;
      buttons.map((item, i) => {
        if (item.key === 'button-cori') coriIndex = i;
        return true;
      });
      let tmp = buttons[0];
      buttons[0] = buttons[coriIndex];
      buttons[coriIndex] = tmp;

      buttons.map((item, i) => {
        if (item.key === 'button-vancouver-aquarium') vaIndex = i;
        return true;
      });
      tmp = buttons[1];
      buttons[1] = buttons[vaIndex];
      buttons[vaIndex] = tmp;

      // Add All button to position 0
      buttons.unshift(
        <Link to={`/${location}`} key="button-all">
          <Button noBorder selected={filter.path === `/${location}`} id="button-all">
            All
          </Button>
        </Link>
      );
      return (
        <Container>
          {buttons}
        </Container>
      );
    } catch (err) {
      // An error occurred
      return <div></div>;
    }
  }
}

RAfilterButtonsIe.propTypes = {
  filter: PropTypes.object,
};

export default RAfilterButtonsIe;
