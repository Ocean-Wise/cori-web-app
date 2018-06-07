/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OceanWiseNav from 'components/OceanWiseNav';
import NavLinks from 'components/NavLinks';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import H1 from './H1';
import Container from './Container';

function Header({ active }) {
  return (
    <div>
      <OceanWiseNav />
      <Container>
        <Link to="/">
          <H1>Ocean Wise<sup>&reg;</sup> <span>Research</span></H1>
        </Link>
        <NavLinks active={active} />
      </Container>
    </div>
  );
}

Header.propTypes = {
  active: PropTypes.string,
};

export default (Header);
