/**
*
* TeamMembersIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import PersonModal from 'components/PersonModal/Loadable';
import client from 'utils/contentful';

import Wrapper from './Wrapper';

class TeamMembersIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    people: [],
  }

  componentWillMount() {
    client.getEntries({
      content_type: 'people',
      limit: 100,
    }).then((res) => this.setData(res.items))
      .catch();
  }

  setData = (people) => {
    this.setState({ people });
  }

  render() {
    const { people } = this.state;
    const { member } = this.props;
    let renderedPeople;
    try {
      renderedPeople = people.map((person, i) => { // eslint-disable-line
        return (
          <PersonModal key={`person-${i.toString()}`} isIE person={person.fields} active={person.slug === member} />
        );
      });
    } catch (err) {
      renderedPeople = [];
    }
    return (
      <Wrapper>
        {renderedPeople}
      </Wrapper>
    );
  }
}

TeamMembersIe.propTypes = {
  member: PropTypes.string,
};

export default TeamMembersIe;
