/**
 *
 * LingcodSurvey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SurveyCopy from 'components/SurveyCopy';

import Hero from './Hero';
import HEROIMG from './hero.jpg';

class LingcodSurvey extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.childDiv = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.childDiv.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }

  render() {
    return (
      <div
        style={{ overflowX: 'hidden' }}
        className="lingcod-survey"
        ref={this.childDiv}
      >
        <Hero src={HEROIMG} alt={`${this.props.slug}-hero`} />
        <div style={{ padding: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '0 auto',
              maxWidth: 1100,
            }}
          >
            <SurveyCopy surveySlug="lingcod" />
          </div>
        </div>
      </div>
    );
  }
}

LingcodSurvey.propTypes = {
  slug: PropTypes.string,
};

export default LingcodSurvey;
