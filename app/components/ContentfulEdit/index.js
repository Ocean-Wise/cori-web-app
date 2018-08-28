/**
*
* ContentfulEdit
*
*/

import React from 'react';
import Button from 'components/Button/Loadable';
const contentful = require('contentful');

const client = contentful.createClient({
  space: 'fsquhe7zbn68',
  accessToken: 'b1cb5f035189ddc9c2e21ad0746109e08620755b3db8ad6655852295e6baba00',
});

function getData() {
  return new Promise(async (res, rej) => {
    let slug = '';
    let type = '';
    let entryId = '';
    const regexp = /(.*)\/(?<!(^\/))(.*)$/g;
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
        entryId = await getId('project', slug);
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
  }

  componentWillMount() {
    getData().then((entryId) => {
      this.setState({ entryId });
    });
  }

  render() {
    const { entryId } = this.state;
    if (entryId === '') return <div />;
    return (
      <div style={{ width: '100%', backgroundColor: '#283C50', overflow: 'hidden' }}>
        <a href={`https://app.contentful.com/spaces/fsquhe7zbn68/entries/${entryId}`} target="_blank"><Button id="edit">Edit on Contentful</Button></a>
      </div>
    );
  }
}

ContentfulEdit.propTypes = {

};

export default ContentfulEdit;
