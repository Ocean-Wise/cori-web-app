const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cors = require('cors');

// Setup GraphQL & Contentful packages and environment variables
const cfGraphql = require('cf-graphql');
const graphqlHTTP = require('express-graphql');
const spaceId = process.env.SPACE_ID;
const cdaToken = process.env.CDA_TOKEN;
const cmaToken = process.env.CMA_TOKEN;

const logger = require('../logger');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  // Create GraphQL client for our Contentful space
  const client = cfGraphql.createClient({ spaceId, cdaToken, cmaToken });
  // Get the content types in our Contentful space
  client.getContentTypes()
  .then(cfGraphql.prepareSpaceGraph)
  .then((spaceGraph) => {
    const names = spaceGraph.map((ct) => ct.names.type).join(', ');
    logger.graphQL(names);
    return spaceGraph;
  })
  .then(cfGraphql.createSchema)
  .then((schema) => startServer(client, schema))
  .catch((fail) => {
    console.log(fail); // eslint-disable-line
  });

  // Start the server to serve both GraphQL and our frontend application
  function startServer(theClient, schema) {
    // Enable CORS header to allow access to the GraphQL endpoint from within an application that is not running on the same origin
    app.use(cors());

    // Encapsulate GraphiQL on a different endpoint for development purposes
    const ui = cfGraphql.helpers.graphiql({ title: 'GraphiQL' });
    app.get('/graphiql', (_, res) => res.set(ui.headers).status(ui.statusCode).end(ui.body));

    // Enrich the response with useful information like timing of the underlying HTTP requests.
    const opts = { version: true, timeline: true, detailedErrors: false };
    const ext = cfGraphql.helpers.expressGraphqlExtension(client, schema, opts);
    app.use('/graphql', graphqlHTTP(ext));

    const compiler = webpack(webpackConfig);
    const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    });
  }
};
