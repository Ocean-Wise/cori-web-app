/**
*
* Nav
*
*/

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { graphql } from 'react-apollo';
import getAllResearchAreas from 'graphql/queries/getAllResearchAreas.graphql';
import PlusRaw from '@material-ui/icons/Add';
import MinusRaw from '@material-ui/icons/Remove';

import ResearchArea from './ResearchArea';
import ProgramContainer from './ProgramContainer';
import Program from './Program';
import Initiative from './Initiative';

/**
 * Nav handles the logic for creating the navigation
 * hierarchy and expanding/collapsing menu items
 */
function Nav({ data: { researchAreas }, active }) {
  // Create our navigation array which holds the structures for each research area
  const nav = [];
  const Plus = ReactDOMServer.renderToStaticMarkup(<PlusRaw />);
  const Minus = ReactDOMServer.renderToStaticMarkup(<MinusRaw />);
  try {
    // Loop over the research areas
    researchAreas.map((area) => {
      // Initialize the array of programs and the boolean variable which states if a child initiative is active
      const programs = [];
      let childActive = '';

      // Does this area actually have any programs?
      if (area.programs !== null) {
        // Yes, loop over the programs
        area.programs.map((program) => {
          // Create the rows for each initiative of the current program
          const initiatives = program.initiatives.map((initiative) => { // eslint-disable-line
            return (
              <Initiative key={`initiative-${initiative.slug}`}>
                <HashLink to={`/program/${program.slug}#${initiative.slug}`} scroll={(el) => setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1000)}>
                  {initiative.title}
                </HashLink>
              </Initiative>
            );
          });

          // If the user's active page is for the current program set the height to the 26px multiplied by the number of initiatives in order to show them, otherwise hide the initiatives initially
          const initiativeHeight = active === program.slug ? initiatives.length * 26 : 0;
          // The user's active page is for the current program, so we want to set the slug to be accessable from the area's onClick function
          if (active === program.slug) childActive = program.slug;
          // Create our program row
          programs.push(
            <ProgramContainer key={`${program.slug}-program`} id={`${program.slug}-program`}>
              <Program
                role="menuitem"
                tabIndex={-1}
                id={`${program.slug}-program-container`}
                onClick={() => {
                  // Select the initiative, area, and expander containers
                  const initiativeEl = document.getElementById(`${program.slug}-initiatives`);
                  const areaEl = document.getElementById(`${area.slug}-programs`);
                  const expanderEl = document.getElementById(`${program.slug}-expander`);
                  // Initiatives were already hidden...
                  if (initiativeEl.style.height === '0px') {
                    // ...so set the initative container height to the 26px multiplied by the number of initiatives
                    initiativeEl.style.height = `${initiatives.length * 26}px`;
                    // ...set the research area's container height to be its previous height plus the extra initiative container height...
                    areaEl.style.height = `${areaEl.scrollHeight + (initiatives.length * 26)}px`;
                  } else {
                    // It is already visible so hide it...
                    initiativeEl.style.height = '0px';
                    // ...remove the extra height from the research area container
                    areaEl.style.height = `${areaEl.scrollHeight - (initiatives.length * 26)}px`;
                  }

                  // Swap the expander icon state
                  if (expanderEl.innerHTML === Minus) {
                    expanderEl.innerHTML = Plus;
                  } else {
                    expanderEl.innerHTML = Minus;
                  }

                  // Select the program's container
                  const el = document.getElementById(`${program.slug}-initiatives`);
                  // The program was previously not labelled active...
                  if (el.classList.length === 0) {
                    // ...so label it as such
                    el.classList.add('active-program');
                  } else {
                    // The program was active, but we now want in inactive
                    el.classList.remove('active-program');
                  }
                }}
              >
                <Link to={`/program/${program.slug}`} key={`program-${program.slug}`}>
                  {program.title}
                </Link>
                <span style={{ marginRight: 5, color: 'rgb(0, 179, 152)' }} id={`${program.slug}-expander`} dangerouslySetInnerHTML={active === program.slug ? { __html: Minus } : { __html: Plus }} />
              </Program>
              <div id={`${program.slug}-initiatives`} className={active === program.slug ? 'active-program' : ''} style={{ height: initiativeHeight, overflow: 'hidden', transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)' }}>
                {initiatives}
              </div>
            </ProgramContainer>
          );

          return true;
        });
      }


      // How many initiatives are in active program's container? Default to 0
      let activeLen = 0;
      programs.filter((obj) => { // eslint-disable-line
        if (obj.key === `${childActive}-program`) {
          activeLen = obj.props.children[1].props.children.length;
        }
      });

      // If the research area is the user's current page or if a linked program of the RA is active, set the height to
      // the number of programs multiplied by 41 plus the number of visible initiatives multiplied by 26
      const areaHeight = (active === area.slug || childActive !== '') ? (programs.length * 41) + (activeLen * 26) : 0;
      // Push the research area into our navigation array to be rendered
      nav.push(
        <div key={`area-${area.slug}`}>
          <ResearchArea
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              // Get the research area's program container and the expander container
              const programEl = document.getElementById(`${area.slug}-programs`);
              const expanderEl = document.getElementById(`${area.slug}-expander`);
              // How many initiatives are visible? Default to 0
              let initiativesLen = 0;
              try {
                const actives = document.getElementsByClassName('active-program');
                for (let i = 0; i < actives.length; i += 1) {
                  // Only increment initiativesLen if the active-program is a child of the current area
                  if (actives[i].parentElement.parentElement.id === `${area.slug}-programs`) {
                    initiativesLen += actives[i].childElementCount;
                  }
                }
              } catch (err) {
                // No active program
              }

              // It was already hidden...
              if (programEl.style.height === '0px') {
                // ...so set the height to 26px multiplied by the number of programs contained in the element
                programEl.style.height = `${(programEl.children.length * 41) + (initiativesLen * 26)}px`;
              } else {
                // We want it hidden, so set the height to 0
                programEl.style.height = '0px';
              }

              // Swap the expander icon state
              if (expanderEl.innerHTML === Minus) {
                expanderEl.innerHTML = Plus;
              } else {
                expanderEl.innerHTML = Minus;
              }
            }}
          >
            <Link to={`/research/${area.slug}`}>{area.title}</Link>
            <span id={`${area.slug}-expander`} style={{ color: 'rgb(0, 179, 152)' }} dangerouslySetInnerHTML={active === area.slug || childActive !== '' ? { __html: Minus } : { __html: Plus }} />
          </ResearchArea>
          <div id={`${area.slug}-programs`} style={{ height: areaHeight, overflow: 'hidden', transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)', marginLeft: 32, color: '#4D4D4D', fontSize: 14, lineHeight: '14px', width: '82%' }}>
            {programs}
          </div>
        </div>
      );

      return true;
    });

    // Sort our array as we always want the order to be CORI --> VA --> Others
    let coriIndex;
    let vaIndex;
    // Swap cori for first
    nav.map((item, i) => {
      if (item.key === 'area-cori') coriIndex = i;
      return true;
    });
    let tmp = nav[0];
    nav[0] = nav[coriIndex];
    nav[coriIndex] = tmp;
    // Swap va for second
    nav.map((item, i) => {
      if (item.key === 'area-vancouver-aquarium') vaIndex = i;
      return true;
    });
    tmp = nav[1];
    nav[1] = nav[vaIndex];
    nav[vaIndex] = tmp;
  } catch (err) {
    // An error happened, but we don't really care
  }
  return nav;
}

Nav.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.string,
};

export default graphql(getAllResearchAreas)(Nav);
