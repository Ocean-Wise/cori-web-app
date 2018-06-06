/**
*
* DrawerNav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Nav from 'components/Nav';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const styles = () => ({
  paper: {
    width: '100%',
  },
  button: {
    minWidth: 28,
    padding: 0,
  },
  menuButton: {
    float: 'right',
  },
});

class DrawerNav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    open: false,
  };

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.button} onClick={this.toggleDrawer}><Menu /></Button>
        <SwipeableDrawer
          anchor="right"
          open={this.state.open}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
          classes={classes}
        >
          <div>
            <Button className={classes.menuButton} onClick={this.toggleDrawer}><Close /></Button>
          </div>
          <Nav active={this.props.active} />
        </SwipeableDrawer>
      </div>
    );
  }
}

DrawerNav.propTypes = {
  classes: PropTypes.object,
  active: PropTypes.string,
};

export default withStyles(styles)(DrawerNav);
