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

function FloatingNav({ data: { researchAreas }, active }) {
  const nav = [];
  try {
    researchAreas.map((area, i) => {
      const subNav = [];
      const initiatives = [];
      if (area.programs !== null) {
        area.programs.map((program, j) => {
          program.initiatives.map((initiative, k) => {
            initiatives.push(
              <div key={`initiative-${k.toString()}`}>
                {initiative.title}
              </div>
            );
            return true;
          });

          subNav.push(
            <Link to={`/programs/${program.slug}`}>
              <div key={`program-${j.toString()}`}>
                {program.title}
              </div>
            </Link>
          );

          let heightVal;
          if (active === area.slug) {
            heightVal = `${(subNav.length + initiatives.length) * 25}px`;
          } else {
            heightVal = 0;
          }

          nav.push(
            <div key={`area-${i.toString()}`}>
              <div
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  const elem = document.getElementById(`subNav-${i.toString()}`);
                  if (elem.style.height === '0px') {
                    const newHeight = (subNav.length + initiatives.length) * 25;
                    elem.style.height = `${newHeight}px`;
                  } else {
                    elem.style.height = '0px';
                  }
                }}
              >{area.title}</div>
              <div id={`subNav-${i.toString()}`} style={{ height: heightVal, overflow: 'hidden', transition: 'all 500ms cubic-bezier(0.805, 0.125, 0.500, 0.750)', marginLeft: 15 }}>
                {subNav}
                <div style={{ marginLeft: 30 }}>
                  {initiatives}
                </div>
              </div>
            </div>
          );

          return true;
        });
      }
      return true;
    });
  } catch (err) {
    // An error happened
  }

  return (
    <div>
      <div style={{ backgroundColor: '#00b398' }}>
        Research Areas
      </div>
      {nav}
    </div>
  );
}

FloatingNav.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.string,
};

export default graphql(getAllResearchAreas)(FloatingNav);
