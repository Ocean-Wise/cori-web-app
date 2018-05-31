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
          program.initiatives.map((initiative) => {
            // Push a new initiative div into the array
            initiatives.push(
              <div key={`initiative-${initiative.title}`} style={{ padding: '0 8px 8px 0' }}>
                {initiative.title}
              </div>
            );
            return true;
          });

          // Push a new program link to the subNav array
          subNav.push(
            <Link to={`/program/${program.slug}`} key={`program-${j.toString()}`}>
              <div style={{ padding: '13px 8px', color: '#6A7B83', fontSize: 14, fontWeight: 'bold', lineHeight: '14px', borderBottom: '1px solid #CED5D9', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {program.title}
                <span>
                  +
                </span>
              </div>
            </Link>
          );

          return true;
        });

        // The logic which sets the height, color, padding, display for the active/inactive research area/program
        let programHeightVal;
        let initiativeHeightVal;
        let subNavDisplayVal;
        let subNavPaddingVal;
        let areaColor;
        // If the research area being processed currently is the active area OR if a
        if (active === area.slug || programActive) {
          let isResearch;
          try {
            if (location.path.match(/\/research\//g).length > 0) isResearch = true;
          } catch (err) {
            isResearch = false;
          }
          // This may need to be modified for collapable initiatives...
          programHeightVal = isResearch ? `${(subNav.length) * 45}px` : `${(subNav.length + initiatives.length) * 34}px`;
          areaColor = '#00B398';
          subNavDisplayVal = 'block';
          subNavPaddingVal = '0 12px 12px 0';
        } else {
          programHeightVal = 0;
          initiativeHeightVal = 0;
          areaColor = '#4D4D4D';
          subNavDisplayVal = 'none';
          subNavPaddingVal = '0';
        }

        // Push a new nav element for the research area
        nav.push(
          <div key={`area-${i.toString()}`}>
            <div
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                const elem = document.getElementById(`subNav-${i.toString()}`);
                const container = document.getElementById(`subNav-${i.toString()}-container`);
                if (elem.style.height === '0px') {
                  const newHeight = (subNav.length + initiatives.length) * 34;
                  elem.style.height = `${newHeight}px`;
                  elem.style.padding = subNavPaddingVal;
                  container.style.display = 'block';
                  if (!(active === area.slug)) {
                    // container.style.marginTop = '12px';
                  }
                } else {
                  elem.style.height = '0px';
                  elem.style.padding = '0px';
                  container.style.display = 'none';
                  if (!(active === area.slug)) {
                    // container.style.marginTop = '0';
                  }
                }
              }}
              style={{ color: areaColor, fontSize: 18, fontWeight: 'bold', lineHeight: '21px', padding: '12px 12px 12px 0', borderBottom: '1px solid #CED5D9', margin: '0 16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Link to={`/research/${area.slug}`}>{area.title}</Link>
              <span>
                +
              </span>
            </div>
            <div id={`subNav-${i.toString()}`} style={{ height: programHeightVal, overflow: 'hidden', transition: 'all 250ms cubic-bezier(0.805, 0.125, 0.500, 0.750)', marginLeft: 13, color: '#4D4D4D', fontSize: 14, lineHeight: '14px', padding: subNavPaddingVal, width: '90.5%' }}>
              <div id={`subNav-${i.toString()}-container`} style={{ display: subNavDisplayVal }}>
                {subNav}
                <div id={`initiative-${i.toString()}`} style={{ height: initiativeHeightVal, marginLeft: 13, padding: '5px 12px 12px 3px', fontSize: 12, lineHeight: '18px' }}>
                  {initiatives}
                </div>
              </div>
            </div>
          </div>
        );
      }
      // console.log(area);
      // console.log(nav);
      return true;
    });
  } catch (err) {
    // console.log(err);
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
