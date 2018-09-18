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
            <A to="/research/cori" noStyle>
              Coastal Ocean Research Institute
            </A>
          </H4>
          <A to="/program/marine-mammals">
            Marine Mammals
          </A>
          <A to="/program/ocean-pollution">
            Ocean Pollution
          </A>
          <A to="/program/plastics-lab">
            Plastics Lab
          </A>
          <A to="/program/ocean-watch">
            Ocean Watch
          </A>
          <A to="/program/howe-sound-research-conservation">
            Howe Sound
          </A>
        </Row>
        <Row>
          <H4>
            <A to="research/vancouver-aquarium" noStyle>
              Vancouver Aquarium
            </A>
          </H4>
          <A to="/program/marine-mammal-energetics-and-ecology">
            Marine Mammal Energetics and Ecology
          </A>
          <A to="/program/propagation">
            Propagation
          </A>
          <A to="/program/animal-health-and-rehabilitation">
            Animal Health and Rehabilitation
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
          <A to="/research/species-under-threat">
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
