import React from 'react';
import Facebook from 'styles/icons/facebook.svg';
import Twitter from 'styles/icons/twitter.svg';
import Instagram from 'styles/icons/instagram.svg';
import YouTube from 'styles/icons/youtube.svg';
import Snapchat from 'styles/icons/snapchat.svg';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// import A from 'components/A';
import Wrapper from './Wrapper';
import Section from './Section';
import SocialWrapper from './SocialWrapper';
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
          <SocialWrapper>
            <a href="https://facebook.com/oceanwise" target="_blank">
              <img alt="Facebook" src={Facebook} />
            </a>
            <a href="https://twitter.com/Oceanwise" target="_blank">
              <img alt="Twitter" src={Twitter} />
            </a>
            <a href="https://www.instagram.com/oceanwise" target="_blank">
              <img alt="Instagram" src={Instagram} />
            </a>
            <a href="https://www.youtube.com/channel/UC0hLWXESQRctgaVPT-8N7Rw" target="_blank">
              <img alt="YouTube" src={YouTube} />
            </a>
            <a href="https://www.snapchat.com/add/oceanwise" target="_blank">
              <img alt="Snapchat" src={Snapchat} />
            </a>
          </SocialWrapper>
        </Section>
      </Wrapper>
    </div>
  );
}

export default Footer;
