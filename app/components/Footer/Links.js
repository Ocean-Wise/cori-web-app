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
          <A to="/program/marine-mammals">
            Marine Mammals
          </A>
          <A to="/program/ocean-pollution">
            Ocean Pollution
          </A>
          <A to="#">
            Plastics Lab
          </A>
          <A to="/program/coastal-ocean-health">
            Coastal Ocean Health
          </A>
          <A to="/program/howe-sound-biodiversity">
            Howe Sound Biodiversity
          </A>
        </Row>
        <Row>
          <H4>
            Vancouver Aquarium
          </H4>
          <A to="#">
            Frog Conservation
          </A>
          <A to="#">
            Fish Propagation
          </A>
          <A to="#">
            Animal Health
          </A>
          <A to="/program/energetics-and-metabolism">
            Energetics and Metabolism
          </A>
          <A to="#">
            Jellyfish Rearing
          </A>
        </Row>
        <Row>
          <H4>
            Working Groups
          </H4>
          <A to="/research/arctic">
            Arctic
          </A>
          <A to="/research/plastic">
            Plastic
          </A>
          <A to="/research/special-places">
            Special Places
          </A>
          <A to="#">
            Species Under Threat
          </A>
        </Row>
        <Row>
          <H4>
            Ocean Wise Research
          </H4>
          <A to="/about">
            About
          </A>
          <A to="/team">
            Team
          </A>
          <A to="/media">
            Media
          </A>
          <A to="/publications">
            Publications
          </A>
          <A to="/about#contact">
            Contact
          </A>
        </Row>
      </LinkSection>
    </LinkWrapper>
  );
}

export default Links;
