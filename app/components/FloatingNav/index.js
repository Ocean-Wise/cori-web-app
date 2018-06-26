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
      <Nav active={active} />
    </Paper>
  );
}

FloatingNav.propTypes = {
  active: PropTypes.string,
};

export default FloatingNav;
