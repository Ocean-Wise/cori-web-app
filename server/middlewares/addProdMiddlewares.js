const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

// Setup GraphQL & Contentful packages and environment variables
const cfGraphql = require('cf-graphql');
const graphqlHTTP = require('express-graphql');
const spaceId = process.env.SPACE_ID;
const cdaToken = process.env.CDA_TOKEN;
const cmaToken = process.env.CMA_TOKEN;

const logger = require('../logger');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // Create GraphQL clients for our Contentful space
  const enClient = cfGraphql.createClient({ spaceId, cdaToken, cmaToken });
  // Get the content types in our Contentful space
  enClient.getContentTypes()
  .then(cfGraphql.prepareSpaceGraph)
  .then((spaceGraph) => {
    const names = spaceGraph.map((ct) => ct.names.type).join(', ');
    logger.graphQL(names, 'English');
    return spaceGraph;
  })
  .then(cfGraphql.createSchema)
  .then((enSchema) => {
    const frClient = cfGraphql.createClient({ spaceId, cdaToken, cmaToken, locale: 'fr' });

    frClient.getContentTypes()
    .then(cfGraphql.prepareSpaceGraph)
    .then((spaceGraph) => {
      const names = spaceGraph.map((ct) => ct.names.type).join(', ');
      logger.graphQL(names, 'French');
      return spaceGraph;
    })
    .then(cfGraphql.createSchema)
    .then((frSchema) => {
      startServer({ fr: frClient, en: enClient }, { fr: frSchema, en: enSchema });
    })
    .catch(() => {
      // Failure
    });
  });

  // Start the GraphQL server
  function startServer(clients, schemas) {
    // Enable CORS header to allow access to the GraphQL endpoint from within an application that is not running on the same origin
    app.use(cors());

    app.use('/graphql-en', graphqlHTTP(() => ({
      context: { entryLoader: clients.en.createEntryLoader() },
      graphiql: false,
      schema: schemas.en,
    })));

    app.use('/graphql-fr', graphqlHTTP(() => ({
      context: { entryLoader: clients.fr.createEntryLoader() },
      graphiql: false,
      schema: schemas.fr,
    })));

    // compression middleware compresses your server responses which makes them
    // smaller (applies also to assets). You can read more about that technique
    // and other good practices on official Express.js docs http://mxs.is/googmy
    app.use(compression());
    app.use(publicPath, express.static(outputPath));

    // Respond to every endpoint except those containing 'graph'
    app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
  }
};
