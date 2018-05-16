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
function FloatingNav({ data: { researchAreas }, active, location }) {
  // Initialize the nav array
  const nav = [];

  try {
    // Loop over all the research areas
    researchAreas.map((area, i) => {
      // Initialize variables to hold main sub navigation (programs/projects), initiatives, and boolean for if the last processed program is active
      const subNav = [];
      const initiatives = [];
      let programActive = false;

      // Check if this research area has programs linked and process accordingly
      if (area.programs !== null) {
        // Loop over programs
        area.programs.map((program, j) => {
          // Is the current program active?
          if (active === program.slug) programActive = true;

          // Loop over initiatives
          program.initiatives.map((initiative, k) => {
            // Push a new initiative div into the array
            initiatives.push(
              <div key={`initiative-${k.toString()}`} style={{ padding: '0 8px 8px 0' }}>
                {initiative.title}
              </div>
            );
            return true;
          });

          // Push a new program link to the subNav array
          subNav.push(
            <Link to={`/program/${program.slug}`} key={`program-${j.toString()}`}>
              <div style={{ paddingBottom: 8 }}>
                {program.title}
              </div>
            </Link>
          );

          return true;
        });

        // The logic which sets the height/color for the active research area/program
        let programHeightVal;
        let initiativeHeightVal;
        let areaColor;
        // If the research area being processed currently is the active area OR if a
        if (active === area.slug || programActive) {
          programHeightVal = location.path.match(/\/research\//g) ? `${(subNav.length) * 40}px` : `${(subNav.length + initiatives.length) * 40}px`;
          areaColor = '#00B398';
        } else {
          programHeightVal = 0;
          initiativeHeightVal = 0;
          areaColor = '#4D4D4D';
        }

        // Push a new nav element for the research area
        nav.push(
          <div key={`area-${i.toString()}`}>
            <div
              role="menuitem"
              tabIndex={-1}
              // The logic fired upon mouse click which handles collapsing/expanding
              onClick={() => {
                const elem = document.getElementById(`subNav-${i.toString()}`);
                if (elem.style.height === '0px') {
                  const newHeight = programActive ? (subNav.length + initiatives.length) * 40 : subNav.length * 40;
                  elem.style.height = `${newHeight}px`;
                  elem.style.padding = '12px 12px 12px 0';
                  elem.style.borderTop = '1px solid #6a7b83';
                } else {
                  elem.style.height = '0px';
                  elem.style.padding = '0px';
                  elem.style.borderTop = 'unset';
                }
              }}
              style={{ color: areaColor, fontSize: 18, fontWeight: 'bold', lineHeight: '21px', padding: '12px 12px 12px 15px' }}
            ><Link to={`/research/${area.slug}`}>{area.title}</Link></div>
            <div id={`subNav-${i.toString()}`} style={{ height: programHeightVal, overflow: 'hidden', transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)', marginLeft: 13, color: '#4D4D4D', fontSize: 14, lineHeight: '14px', padding: '12px 12px 12px 3px', borderTop: '1px solid #6a7b83', width: '90.5%' }}>
              {subNav}
              <div id={`initiative-${i.toString()}`} style={{ height: initiativeHeightVal, marginLeft: 13, padding: '5px 12px 12px 3px', fontSize: 12, lineHeight: '18px' }}>
                {initiatives}
              </div>
            </div>
          </div>
        );
      }
      return true;
    });
  } catch (err) {
    // An error happened
  }

  return (
    <Paper zDepth={3}>
      <div style={{ backgroundColor: '#00b398', color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', lineHeight: '35px', padding: '12px 12px 12px 15px' }}>
        Research Areas
      </div>
      {nav}
    </Paper>
  );
}

FloatingNav.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default graphql(getAllResearchAreas)(FloatingNav);
