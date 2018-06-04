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
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import H1 from './H1';
import Container from './Container';

const styles = () => ({
  button: {
    color: '#6A7B83',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    lineHeight: '14px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    textTransform: 'capitalize',
    minWidth: 66,
    minHeight: 45,
    padding: '6px 12px',
  },
});

function Header(props) {
  const { classes } = props;
  return (
    <div>
      <OceanWiseNav />
      <Container>
        <Link to="/">
          <H1>Ocean Wise <span>Research</span></H1>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'row', color: '#73838b', fontWeight: 700, fontSize: '1rem', float: 'right' }}>
          <Link to="/about">
            <Button className={classes.button}>
              About
            </Button>
          </Link>
          <Link to="/team">
            <Button className={classes.button}>
              Team
            </Button>
          </Link>
          <Link to="/media">
            <Button className={classes.button}>
              Media
            </Button>
          </Link>
          <Link to="/publications">
            <Button className={classes.button}>
              Publications
            </Button>
          </Link>
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
      </Container>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
