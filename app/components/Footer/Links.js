import React from 'react';
// import { FormattedMessage } from 'react-intl';

import A from './A';
import LinkWrapper from './LinkWrapper';
// import messages from './messages';
import H4 from './H4';
import Row from './Row';
import LinkSection from './LinkSection';

function Links() {
  return (
    <LinkWrapper>
      <LinkSection>
        <Row>
          <H4>
            Coastal Ocean Research Institute
          </H4>
          <A href="#">
            Marine Mammals
          </A>
          <A href="#">
            Ocean Pollution
          </A>
          <A href="#">
            Plastics Lab
          </A>
          <A href="#">
            Coastal Ocean Health
          </A>
          <A href="#">
            Howe Sound Biodiversity
          </A>
        </Row>
        <Row>
          <H4>
            Vancouver Aquarium
          </H4>
          <A href="#">
            Frog Conservation
          </A>
          <A href="#">
            Fish Propagation
          </A>
          <A href="#">
            Animal Health
          </A>
          <A href="#">
            Energetics and Metabolism
          </A>
          <A href="#">
            Jellyfish Rearing
          </A>
        </Row>
        <Row>
          <H4>
            Working Groups
          </H4>
          <A href="#">
            Arctic
          </A>
          <A href="#">
            Plastic
          </A>
          <A href="#">
            Special Places
          </A>
          <A href="#">
            Species Under Threat
          </A>
        </Row>
        <Row>
          <H4>
            Ocean Wise Research
          </H4>
          <A href="#">
            About
          </A>
          <A href="#">
            Team
          </A>
          <A href="#">
            Media
          </A>
          <A href="#">
            Publications
          </A>
          <A href="#">
            Contact
          </A>
        </Row>
      </LinkSection>
    </LinkWrapper>
  );
}

export default Links;
