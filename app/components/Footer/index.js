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
            <a href="https://ocean.org/" target="_blank">
              <Logo src={OWLogo} alt="Ocean Wise" />
            </a>
          </Section>
        </Wrapper>
      </div>
      <Wrapper style={{ backgroundColor: '#f8f9f9' }}>
        <Section>
          <Container>
            <span><a href="https://ocean.org/about" target="_blank">About Ocean Wise&reg;</a></span>
            <span><a href="https://ocean.org/terms-conditions" target="_blank">Terms</a></span>
            <span><a href="https://ocean.org/privacy-policy" target="_blank">Privacy</a></span>
            <span id="copy"><a href="https://ocean.org" target="_blank">&copy; 2018 Ocean Wise</a></span>
            <span><a href="https://www.contentful.com/" rel="nofollow" target="_blank"><img src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" style={{ maxWidth: 100, width: '100%', margin: '0 25px' }} alt="Powered By Contentful" /></a></span>
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
