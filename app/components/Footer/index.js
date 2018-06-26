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
import Hr from './Hr';

function Footer() {
  return (
    <div>
      <div style={{ backgroundColor: '#fff' }}>
        <Wrapper>
          <Section>
            <Links />
          </Section>
          <Hr />
          <Section>
            <Logo src={OWLogo} alt="Ocean Wise" />
          </Section>
        </Wrapper>
      </div>
      <Wrapper style={{ backgroundColor: '#f8f9f9' }}>
        <Section>
          <Container>
            <span>About Ocean Wise&reg;</span>
            <span>Terms</span>
            <span>Privacy</span>
            <span id="copy">&copy; 2018 Ocean Wise</span>
          </Container>
        </Section>
        <Section>
          Social Media Icons
        </Section>
      </Wrapper>
    </div>
  );
}

export default Footer;
