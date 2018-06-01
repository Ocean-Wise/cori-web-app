/**
*
* FloatingNav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import getAllResearchAreas from 'graphql/queries/getAllResearchAreas.graphql';
import Paper from './Paper';

/**
 * FloatingNav renders the floating navigation menu
 * and handles the logic for expanding/collapsing menu items
 * based on the current route
 */
function FloatingNav({ data: { researchAreas }, active }) {
  // Create our navigation array which holds the structures for each research area
  const nav = [];

  try {
    // Loop over the research areas
    researchAreas.map((area) => {
      // Initialize the array of programs and the boolean variable which states if a child initiative is active
      const programs = [];
      let childActive = false;

      // Does this area actually have any programs?
      if (area.programs !== null) {
        // Yes, loop over the programs
        area.programs.map((program) => {
          // Create the rows for each initiative of the current program
          const initiatives = program.initiatives.map((initiative) => { // eslint-disable-line
            return (
              <div key={`initiative-${initiative.slug}`} style={{ padding: '0 8px 8px 0', color: '#6A7B83', fontSize: 12, lineHeight: '18px', marginLeft: 15 }}>
                {initiative.title}
              </div>
            );
          });

          // If the user's active page is for the current program set the height to the 26px multiplied by the number of initiatives in order to show them, otherwise hide the initiatives initially
          const initiativeHeight = active === program.slug ? initiatives.length * 26 : 0;
          // The user's active page is for the current program, so we want to signal to the research area element that it should be expanded to show all the programs
          if (active === program.slug) childActive = true;

          // Create our program row
          programs.push(
            <div key={`${program.slug}-program`} style={{ borderBottom: '1px solid #CED5D9' }} id={`${program.slug}-program`}>
              <div
                role="menuitem"
                tabIndex={-1}
                id={`${program.slug}-program-container`}
                onClick={() => {
                  // Select the initiatives container
                  const initiativeEl = document.getElementById(`${program.slug}-initiatives`);
                  // It was already hidden...
                  if (initiativeEl.style.height === '0px') {
                    // ...so set the height to the 26px multiplied by the number of initiatives
                    initiativeEl.style.height = `${initiatives.length * 26}px`;
                  } else {
                    // It is already visible so hide it
                    initiativeEl.style.height = '0px';
                  }
                  // Select the program's container
                  const el = document.getElementById(`${program.slug}-program-container`);
                  // The program was previously not labelled active...
                  if (el.classList.length === 0) {
                    // ...so label it as such
                    el.classList.add('active-program');
                  } else {
                    // The program was active, but we now want in inactive
                    el.classList.remove('active-program');
                  }
                }}
                style={{ padding: '13px 8px', color: '#6A7B83', fontSize: 14, transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)', fontWeight: 'bold', lineHeight: '14px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                // If the program is loaded as the user's current page we want to label it as active initially
                className={active === program.slug ? 'active-program' : ''}
              >
                <Link to={`/program/${program.slug}`} key={`program-${program.slug}`}>
                  {program.title}
                </Link>
                <span style={{ marginRight: 8 }}>
                  +
                </span>
              </div>
              <div id={`${program.slug}-initiatives`} style={{ height: initiativeHeight, overflow: 'hidden', transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)' }}>
                {initiatives}
              </div>
            </div>
          );

          return true;
        });
      }

      // If the research area is the user's current page or if a linked program of the RA is active, set the height to auto
      const areaHeight = (active === area.slug || childActive) ? 'auto' : 0;
      // Push the research area into our navigation array to be rendered
      nav.push(
        <div key={`area-${area.slug}`}>
          <div
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              // Get the research area's program container
              const programEl = document.getElementById(`${area.slug}-programs`);
              // It was already hidden...
              if (programEl.style.height === '0px') {
                // ...so set the height to 26px multiplied by the number of programs contained in the element
                // programEl.style.height = `${programEl.children.length * 26}px`;
                programEl.style.height = 'auto';
              } else {
                // We want it hidden, so set the height to 0
                programEl.style.height = '0px';
              }
            }}
            style={{ color: '#6A7B83', fontSize: 18, fontWeight: 'bold', lineHeight: '21px', padding: '12px 12px 12px 0', transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)', borderBottom: '1px solid #CED5D9', margin: '0 32px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Link to={`/research/${area.slug}`}>{area.title}</Link>
            <span>+</span>
          </div>
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
    nav.map((item, i) => {
      if (item.key === 'area-cori') coriIndex = i;
      if (item.key === 'area-vancouver-aquarium') vaIndex = i;
      return true;
    });
    // Swap cori for first
    let tmp = nav[0];
    nav[0] = nav[coriIndex];
    nav[coriIndex] = tmp;
    // Swap va for second
    tmp = nav[1];
    nav[1] = nav[vaIndex];
    nav[vaIndex] = tmp;
  } catch (err) {
    // An error happened, but we don't really care
  }
  return (
    <Paper zDepth={3}>
      <div style={{ color: '#6A7B83', fontSize: 24, fontWeight: '300', lineHeight: '30px', letterSpacing: '3px', padding: '32px' }}>
        Research Areas
      </div>
      {nav}
    </Paper>
  );
}

FloatingNav.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
};

export default graphql(getAllResearchAreas)(FloatingNav);
