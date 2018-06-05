/**
*
* FloatingNav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/Nav';
import Paper from './Paper';

/**
 * FloatingNav renders the floating navigation menu
 */
function FloatingNav({ active }) {
  return (
    <Paper elevation={8}>
      <div style={{ color: '#6A7B83', fontSize: 24, fontWeight: '300', lineHeight: '30px', letterSpacing: '3px', padding: '32px' }}>
        Research Areas
      </div>
      <Nav active={active} />
    </Paper>
  );
}

FloatingNav.propTypes = {
  active: PropTypes.string,
};

export default FloatingNav;
