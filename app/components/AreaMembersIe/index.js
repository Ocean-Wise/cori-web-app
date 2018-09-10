/**
*
* AreaMembersIe
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import PersonModal from 'components/PersonModal/Loadable';
import client from 'utils/contentful';
import Wrapper from './Wrapper';

class AreaMembersIe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    researchAreas: [],
  }

  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    const { slug } = this.props;
    if (slug !== nextProps.slug) {
      window.location.reload(false);
    }
  }

  getData = () => {
    client.getEntries({
      content_type: 'researchArea',
      'fields.slug[match]': this.props.slug,
    }).then((res) => {
      this.setData(res.items);
    });
  }

  setData = (researchAreas) => {
    this.setState({ researchAreas });
  }

  render() {
    const { researchAreas } = this.state;
    let members;
    try {
      members = researchAreas.map((area) => area.fields.teamMembers.map((member, i) => <PersonModal isIE key={`person-${i.toString()}`} person={member.fields} />));
    } catch (err) {
      members = [];
    }

    return (
      <Wrapper>
        {members}
      </Wrapper>
    );
  }
}

AreaMembersIe.propTypes = {
  slug: PropTypes.string,
};

export default AreaMembersIe;
