import React from 'react';
// import { FormattedMessage } from 'react-intl';

// import A from 'components/A';
import Wrapper from './Wrapper';
import Section from './Section';
// import messages from './messages';
import Logo from './Logo';
import OWLogo from './logo.svg';
import Links from './Links';
import Container from './Container';

function Footer() {
  return (
    <div>
      <Wrapper style={{ backgroundColor: '#fff' }}>
        <Section>
          <Logo src={OWLogo} alt="Ocean Wise" />
        </Section>
        <div style={{ marginTop: 45, borderTop: '1px solid #E9EEF6', width: '95%', height: 1 }} />
        <Section>
          <Links />
        </Section>
      </Wrapper>
      <Wrapper style={{ backgroundColor: '#f8f9f9' }}>
        <Section>
          <Container>
            <span>About Ocean Wise&reg;</span>
            <span>Terms</span>
            <span>Privacy</span>
          </Container>
        </Section>
        <Section>
          <span>&copy; 2018 Ocean Wise</span>
        </Section>
      </Wrapper>
    </div>
  );
}

export default Footer;
