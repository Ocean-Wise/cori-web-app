// Load environment variables
require('dotenv').config();

const axios = require('axios');

const logger = require('../logger');
const contentful = require('contentful');
// Contentful client init
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.CDA_TOKEN,
});
// Algolia client init
const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_APIKEY);
const pubIndex = algolia.initIndex('Publications');
const peepIndex = algolia.initIndex('People');
const raIndex = algolia.initIndex('ResearchAreas');
const progIndex = algolia.initIndex('Programs');
const intvIndex = algolia.initIndex('Initiatives');
const projIndex = algolia.initIndex('Projects');

// Arrays to hold all the objects for each Algolia index
const publications = [];
const peeps = [];
const areas = [];
const progs = [];
const intv = [];
const projs = [];

/**
 *
 * This function turns a string into a
 * URL friendly slug
 * @param str The input string
 * @returns The slugified string
 *
 */
function slugify(str) {
  let out;
  out = str.replace(/^\s+|\s+$/g, ''); // trim
  out = out.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i += 1) {
    out = out.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  out = out.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return out;
}

function deletePubs() {
  return new Promise((res, rej) => {
    algolia.deleteIndex('Publications', (err) => {
      if (err) rej();
      logger.pubsDeleted();
      res();
    });
  });
}

function deletePeeps() {
  return new Promise((res, rej) => {
    algolia.deleteIndex('People', (err) => {
      if (err) rej();
      logger.peepsDeleted();
      res();
    });
  });
}

function deleteRA() {
  return new Promise((res, rej) => {
    algolia.deleteIndex('ResearchAreas', (err) => {
      if (err) rej();
      logger.raDeleted();
      res();
    });
  });
}

function deleteProg() {
  return new Promise((res, rej) => {
    algolia.deleteIndex('Programs', (err) => {
      if (err) rej();
      logger.progDeleted();
      res();
    });
  });
}

function deleteIntv() {
  return new Promise((res, rej) => {
    algolia.deleteIndex('Initiatives', (err) => {
      if (err) rej();
      logger.intvDeleted();
      res();
    });
  });
}

function deleteProj() {
  return new Promise((res, rej) => {
    algolia.deleteIndex('Projects', (err) => {
      if (err) rej();
      logger.projDeleted();
      res();
    });
  });
}

function getPubs() {
  return new Promise((res) => {
    client.getEntries({
      content_type: 'researchPapers',
    })
    .then((content) => {
      content.items.forEach(async (entry) => {
        let link;
        if (entry.fields.pdf) {
          link = entry.fields.pdf.fields.file.url;
        } else if (entry.fields.url) {
          link = entry.fields.url;
        } else if (entry.fields.doi) {
          await axios.get(`https://api.semanticscholar.org/v1/paper/${entry.fields.doi}`)
            .then((pub) => {
              link = pub.data.url;
            });
        }
        // Create our Publication object for the current entry
        const item = {
          objectID: entry.fields.slug,
          slug: link,
          authors: entry.fields.authors.join(';'),
          title: entry.fields.title,
          journal: entry.fields.journal,
          volume: entry.fields.volume,
          number: entry.fields.number,
          keywords: entry.fields.keywords.join(),
          pages: entry.fields.pages,
          year: parseInt(entry.fields.year, 10),
        };
        // Add our Publication object to our publications array
        publications.push(item);
      });
      res();
    });
  });
}

function getPeeps() {
  return new Promise((res) => {
    client.getEntries({
      content_type: 'people',
    })
    .then((content) => {
      content.items.forEach((entry) => {
        const title = `${entry.fields.first} ${entry.fields.last}`;
        const slug = `/team/${entry.fields.slug}`;
        const item = {
          objectID: `${slugify(entry.fields.first)}-${slugify(entry.fields.last)}`,
          slug,
          title,
          first: entry.fields.first,
          last: entry.fields.last,
          image: entry.fields.image.fields.file.url,
        };
        peeps.push(item);
      });
      res();
    });
  });
}

function getRA() {
  return new Promise((res) => {
    client.getEntries({
      content_type: 'researchArea',
    })
    .then((content) => {
      content.items.forEach((entry) => {
        const item = {
          objectID: entry.fields.slug,
          title: entry.fields.title,
          slug: `/research/${entry.fields.slug}`,
        };
        areas.push(item);
      });
      res();
    });
  });
}

function getProg() {
  return new Promise((res) => {
    client.getEntries({
      content_type: 'program',
    })
    .then((content) => {
      content.items.forEach((entry) => {
        const item = {
          objectID: entry.fields.slug,
          title: entry.fields.title,
          slug: `/program/${entry.fields.slug}`,
        };
        progs.push(item);
      });
      res();
    });
  });
}

function getIntv() {
  return new Promise((res) => {
    client.getEntries({
      content_type: 'initiative',
    })
    .then((content) => {
      content.items.forEach(async (entry) => {
        let progSlug = '';
        await client.getEntries({
          links_to_entry: entry.sys.id,
        })
        .then((link) => {
          progSlug = link.items[0].fields.slug;
        });
        const item = {
          objectID: entry.fields.slug,
          title: entry.fields.title,
          slug: `/program/${progSlug}#${entry.fields.slug}`,
        };
        intv.push(item);
      });
      res();
    });
  });
}

function getProj() {
  return new Promise((res) => {
    client.getEntries({
      content_type: 'projects',
    })
    .then((content) => {
      content.items.forEach((entry) => {
        const item = {
          objectID: entry.fields.slug,
          title: entry.fields.projectTitle,
          slug: `/project/${entry.fields.slug}`,
        };
        projs.push(item);
      });
      res();
    });
  });
}

function getData() {
  return new Promise((res) => {
    getPubs()
    .then(() => getPeeps())
    .then(() => getRA())
    .then(() => getProg())
    .then(() => getIntv())
    .then(() => getProj())
    .then(() => {
      logger.dataGot();
      res();
    });
  });
}

function addPubs() {
  return new Promise((res, rej) => {
    pubIndex.addObjects(publications, (err) => {
      if (err) rej();
      logger.pubsAdded();
      res();
    });
  });
}

function addPeeps() {
  return new Promise((res, rej) => {
    peepIndex.addObjects(peeps, (err) => {
      if (err) rej();
      logger.peepsAdded();
      res();
    });
  });
}

function addRA() {
  return new Promise((res, rej) => {
    raIndex.addObjects(areas, (err) => {
      if (err) rej();
      logger.raAdded();
      res();
    });
  });
}

function addProg() {
  return new Promise((res, rej) => {
    progIndex.addObjects(progs, (err) => {
      if (err) rej();
      logger.progAdded();
      res();
    });
  });
}

function addIntv() {
  return new Promise((res, rej) => {
    intvIndex.addObjects(intv, (err) => {
      if (err) rej();
      logger.intvAdded();
      res();
    });
  });
}

function addProj() {
  return new Promise((res, rej) => {
    projIndex.addObjects(projs, (err) => {
      if (err) rej();
      logger.projAdded();
      res();
    });
  });
}

function initAlgolia() {
  return new Promise((res) => {
    deletePubs()
      .then(() => deletePeeps())
      .then(() => deleteRA())
      .then(() => deleteProg())
      .then(() => deleteIntv())
      .then(() => deleteProj())
      .then(() => getData())
      .then(() => addPubs())
      .then(() => addPeeps())
      .then(() => addRA())
      .then(() => addProg())
      .then(() => addIntv())
      .then(() => addProj())
      .then(() => {
        pubIndex.setSettings({
          searchableAttributes: ['authors', 'title', 'journal', 'keywords', 'year'],
        });
        peepIndex.setSettings({
          searchableAttributes: ['first', 'last', 'title'],
        });
        raIndex.setSettings({
          searchableAttributes: ['title'],
        });
        progIndex.setSettings({
          searchableAttributes: ['title'],
        });
        intvIndex.setSettings({
          searchableAttributes: ['title'],
        });
        projIndex.setSettings({
          searchableAttributes: ['title'],
        });
        res();
      });
  });
}

module.exports = initAlgolia;
