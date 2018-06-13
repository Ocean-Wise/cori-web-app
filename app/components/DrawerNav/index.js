/**
*
* DrawerNav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Nav from 'components/Nav';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import Search from 'containers/Search/Loadable';

import Container from './Container';

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

  /**
   * This functions ensures that the drawer will close when
   * switching between routes that only differ by slug
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({ open: false });
    }
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.button} onClick={this.toggleDrawer}><Menu style={{ stroke: 'rgb(178, 190, 196)', color: 'rgb(178, 190, 196)' }} /></Button>
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
          <Container>
            <Search />
            <Link to="/about">
              <Button>
                About
              </Button>
            </Link>
            <Link to="/team">
              <Button>
                Team
              </Button>
            </Link>
            <Link to="/media">
              <Button>
                Media
              </Button>
            </Link>
            <Link to="/publications">
              <Button>
                Publications
              </Button>
            </Link>
          </Container>
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
