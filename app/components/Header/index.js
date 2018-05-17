import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import OceanWiseNav from 'components/OceanWiseNav';

import H1 from './H1';

import Container from './Container';
// import messages from './messages';
import DeskLogo from './logo.svg';
import MobiLogo from './logo-mobile.svg';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight, source: '' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (this.state.width > 768) {
      this.state.source = DeskLogo;
    } else {
      this.state.source = MobiLogo;
    }
  }

  render() {
    return (
      <div>
        <OceanWiseNav />
        <Container>
          <Link to="/">
            <H1>Ocean Wise <span>Research</span></H1>
          </Link>
          <div style={{ display: 'flex', flexDirection: 'row', color: '#73838b', fontWeight: 700, fontSize: '1rem', float: 'right' }}>
            <Link to="/about">
              About
            </Link>
            <Link to="/team" style={{ marginLeft: 15 }}>
              Team
            </Link>
            <Link to="/media" style={{ marginLeft: 15 }}>
              Media
            </Link>
            <Link to="/Publications" style={{ marginLeft: 15 }}>
              Publications
            </Link>
            <span style={{ marginLeft: 15 }}>S-Icon</span>
          </div>
        </Container>
      </div>
    );
  }
}

export default Header;
