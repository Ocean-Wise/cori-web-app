/**
*
* NavLinks
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DrawerNav from 'components/DrawerNav/Loadable';
import Search from 'containers/Search/Loadable';
import OWButton from 'components/Button/Loadable';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import Container from './Container';

class NavLinks extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      search: true,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const NAV = this.state.width < 1200 ? <DrawerNav active={this.props.active} /> : (
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
        <OWButton inverted noMargin width={100} height={40} id="donate">
          <a target="_blank" href="http://support.ocean.org/site/Donation2?df_id=3006&3006.donation=form1&mfc_pref=T">
            Donate
          </a>
        </OWButton>
        <Search />
      </Container>
    );
    return NAV;
  }
}

NavLinks.propTypes = {
  active: PropTypes.string,
};

export default NavLinks;
