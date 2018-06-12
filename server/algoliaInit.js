// Load environment variables
require('dotenv').config();

const logger = require('./logger');
const contentful = require('contentful');
// Contentful client init
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.CDA_TOKEN,
});
// Algolia client init
const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_APIKEY);

// Arrays to hold all the objects for each Algolia index
const publications = [];
const peeps = [];
const areas = [];
const progs = [];
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

/**
 *
 * Begin initializing all the Algolia indicies
 *
 */
function initAlgolia() {
  // Resolve a promise so we can chain all this confusing async-yness
  Promise.resolve()
    .then(async () => {
      // Wait for the publications from Contentful
      await client.getEntries({
        content_type: 'researchPapers',
      })
        .then((content) => {
          content.items.forEach((entry) => {
            // Create our Publication object for the current entry
            const item = {
              objectID: entry.fields.slug,
              authors: entry.fields.authors.join(';'),
              title: entry.fields.title,
              journal: entry.fields.journal,
              volume: entry.fields.volume,
              number: entry.fields.number,
              pages: entry.fields.pages,
              year: parseInt(entry.fields.year, 10),
            };
            // Add our Publication object to our publications array
            publications.push(item);
          });
        });
      return true;
    })
    .then(async () => {
      await client.getEntries({
        content_type: 'people',
      })
        .then((content) => {
          content.items.forEach((entry) => {
            const item = {
              objectID: `${slugify(entry.fields.first)}-${slugify(entry.fields.last)}`,
              first: entry.fields.first,
              last: entry.fields.last,
              image: entry.fields.image.fields.url,
            };
            peeps.push(item);
          });
        });
      return true;
    })
    .then(async () => {
      await client.getEntries({
        content_type: 'researchArea',
      })
      .then((content) => {
        content.items.forEach((entry) => {
          const item = {
            objectID: entry.fields.slug,
            title: entry.fields.title,
            slug: entry.fields.slug,
          };
          areas.push(item);
        });
      });
      return true;
    })
    .then(async () => {
      await client.getEntries({
        content_type: 'program',
      })
      .then((content) => {
        content.items.forEach((entry) => {
          const item = {
            objectID: entry.fields.slug,
            title: entry.fields.title,
            slug: entry.fields.slug,
          };
          progs.push(item);
        });
      });
    })
    .then(async () => {
      await client.getEntries({
        content_type: 'projects',
      })
      .then((content) => {
        content.items.forEach((entry) => {
          const item = {
            objectID: entry.fields.slug,
            title: entry.fields.title,
            slug: entry.fields.slug,
          };
          projs.push(item);
        });
      });
    })
    /**
     *
     * When we start the server we want to delete the old indicies
     * to ensure that we remove entries that were deleted from the CMS
     *
     */
    .then(() => {
      algolia.deleteIndex('Publications', (err) => {
        if (err) throw err;
        logger.pubsDeleted();

        algolia.deleteIndex('People', (err2) => {
          if (err2) throw err2;
          logger.peepsDeleted();

          algolia.deleteIndex('ResearchAreas', (err3) => {
            if (err3) throw err3;
            logger.raDeleted();

            algolia.deleteIndex('Programs', (err4) => {
              if (err4) throw err4;
              logger.progDeleted();

              algolia.deleteIndex('Projects', (err5) => {
                if (err5) throw err5;
                logger.projDeleted();
              });
            });
          });
        });
      });
    })
    /**
     *
     * Now that we have deleted the incidies we want to
     * create them again and add all our new objects back
     *
     */
    .then(() => {
      // Init each Algolia index
      const pubIndex = algolia.initIndex('Publications');
      const peepIndex = algolia.initIndex('People');
      const raIndex = algolia.initIndex('ResearchAreas');
      const progIndex = algolia.initIndex('Programs');
      const projIndex = algolia.initIndex('Projects');

      pubIndex.addObjects(publications, (err) => {
        if (err) throw err;
        logger.pubsAdded();

        peepIndex.addObjects(peeps, (err2) => {
          if (err2) throw err2;
          logger.peepsAdded();

          raIndex.addObjects(areas, (err3) => {
            if (err3) throw err3;
            logger.raAdded();

            progIndex.addObjects(progs, (err4) => {
              if (err4) throw err4;
              logger.progAdded();

              projIndex.addObjects(projs, (err5) => {
                if (err5) throw err5;
                logger.projAdded();
              });
            });
          });
        });
      });
    });
}

module.exports = initAlgolia;
