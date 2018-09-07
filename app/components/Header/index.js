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
import Logo from 'styles/icons/logo.svg';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// import H1 from './H1';
import Container from './Container';

function Header({ active }) {
  const isIE = /* @cc_on!@ */false || !!document.documentMode;
  return (
    <div style={{ borderBottom: '1px solid #CED5E9' }}>
      <OceanWiseNav />
      <Container>
        <Link to="/">
          {/* <H1>Ocean Wise<sup>&reg;</sup> <span>Research</span></H1> */}
          <img id="logo" alt="Ocean Wise Research" src={Logo} style={isIE ? { width: 275, height: 20 } : { width: 275 }} />
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
