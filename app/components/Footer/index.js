import React from 'react';
// import { FormattedMessage } from 'react-intl';

// import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import Section from './Section';
// import messages from './messages';
import Logo from './Logo';
import OWLogo from './logo.svg';
import Links from './Links';

function Footer() {
  return (
    <div>
      <Wrapper style={{ backgroundColor: '#fff' }}>
        <Section>
          <Logo src={OWLogo} alt="Ocean Wise" />
        </Section>
        <Section>
          <Links />
        </Section>
      </Wrapper>
      <Wrapper style={{ backgroundColor: '#f8f9f9' }}>
        <Section>
          <span>About Ocean Wise&reg;</span>
          <span>Terms</span>
          <span>Privacy</span>
        </Section>
        <Section>
          <span>&copy; 2018 Ocean Wise</span>
          <LocaleToggle />
        </Section>
      </Wrapper>
    </div>
  );
}

export default Footer;
