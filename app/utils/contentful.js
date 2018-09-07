const contentful = require('contentful');

const client = contentful.createClient({
  space: 'fsquhe7zbn68',
  accessToken: 'b1cb5f035189ddc9c2e21ad0746109e08620755b3db8ad6655852295e6baba00',
});

export default client;
