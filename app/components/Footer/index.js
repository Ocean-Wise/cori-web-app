import React from 'react';
// import { FormattedMessage } from 'react-intl';

// import A from 'components/A';
// import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import Section from './Section';
// import messages from './messages';
import Logo from './Logo';
import OWLogo from './logo.svg';
import Links from './Links';

function Footer() {
  return (
    <div>
      <Wrapper>
        <Section>
          <Logo src={OWLogo} alt="Ocean Wise" />
        </Section>
        <Section>
          <Links />
        </Section>
      </Wrapper>
      <Wrapper style={{ backgroundColor: 'rgb(220,220,220)' }}>
        <Section>
          <span>About Ocean Wise&reg;</span>
          <span>Terms</span>
          <span>Privacy</span>
        </Section>
        <Section>
          <span>&copy; 2018 Ocean Wise</span>
        </Section>
      </Wrapper>
    </div>
  );
}

export default Footer;
