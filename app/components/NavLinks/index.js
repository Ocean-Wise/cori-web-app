/**
*
* NavLinks
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DrawerNav from 'components/DrawerNav';


// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import Container from './Container';

class NavLinks extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const NAV = this.state.width < 1226 ? <DrawerNav active={this.props.active} /> : (
      <Container>
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
        <IconButton aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Container>
    );
    return NAV;
  }
}

NavLinks.propTypes = {
  active: PropTypes.string,
};

export default NavLinks;
