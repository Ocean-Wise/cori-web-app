/**
*
* ContentfulEdit
*
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button/Loadable';
import client from 'utils/contentful';

function getData() {
  return new Promise(async (res, rej) => {
    let slug = '';
    let type = '';
    let entryId = '';
    const regexp = /(.*)(?!(^\/))\/(.*)$/g;
    try {
      const match = regexp.exec(window.location.pathname);
      type = match[1];
      slug = match[3];
    } catch (err) {
      const regexp2 = /(\/.*)/g;
      const match = regexp2.exec(window.location.pathname);
      type = match[0];
    }
    switch (type) {
      case '/':
        entryId = '1o3H7daKViKIYc6GIqcOe4';
        break;
      case '/about':
        entryId = '5b9KZHdWbekUCQMYOSQKUe';
        break;
      case '/team':
        entryId = '1zHfEdtglGimuOgEMgeow6';
        break;
      case '/media':
        rej();
        break;
      case '/publications':
        entryId = '1MAO2Ir2AQUEsOC2gQ6cC6';
        break;
      case '/research':
        entryId = await getId('researchArea', slug);
        break;
      case '/program':
        entryId = await getId('program', slug);
        break;
      case '/project':
        entryId = await getId('projects', slug);
        break;
      default:
        rej();
    }
    res(entryId);
  });
}

function getId(type, slug) {
  return client.getEntries({
    content_type: type,
    'fields.slug[in]': slug,
  }).then((res) => res.items[0].sys.id)
    .catch((err) => err);
}

class ContentfulEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    entryId: '',
    position: 'unset',
    width: '100%',
  }

  componentWillMount() {
    getData().then((entryId) => {
      this.setState({ entryId });
    }).catch();
  }

  componentDidMount() {
    let last = window.scrollY;
    let ticking = false;
    window.addEventListener('scroll', () => {
      last = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.changePositioning(last);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (location !== nextProps.location) {
      getData().then((entryId) => {
        this.setState({ entryId });
      }).catch();
    }
  }

  componentWillUnmount() {
    let last = '';
    let ticking = false;
    window.removeEventListener('scroll', () => {
      last = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.changePositioning(last);
          ticking = false;
        });
        ticking = true;
      }
    });
  }


  changePositioning = (position) => {
    if (position > 40 && position < 80) {
      this.setState({ position: 'fixed', width: '200px' });
    } else if (position < 40 || position === 0) {
      this.setState({ position: 'unset', width: '100%' });
    }
  }

  render() {
    const { entryId, position, width } = this.state;
    if (entryId === '') return <div />;
    return (
      <div style={{ width, backgroundColor: '#283C50', overflow: 'hidden', position, zIndex: '100', padding: 10, paddingBottom: 12, transition: 'width 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s' }}>
        <a href={`https://app.contentful.com/spaces/fsquhe7zbn68/entries/${entryId}`} target="_blank"><Button id="edit">Edit on Contentful</Button></a>
      </div>
    );
  }
}

ContentfulEdit.propTypes = {
  location: PropTypes.any,
};

export default withRouter(ContentfulEdit);
