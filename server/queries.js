// PostgreSQL
const promise = require('bluebird');
const options = {
  // Initialization oftion for database
  promiseLib: promise,
};
// Connect to the Heroku PostgreSQL database
const pgp = require('pg-promise')(options);
const db = pgp(`${process.env.DATABASE_URL}?ssl=true`);

// Rss Parser
const Parser = require('rss-parser');
const parser = new Parser();

function handleSubmitSurvey(req, res, next) {
  console.log(req);
  // try {
  //   db.any(`INSERT INTO ${req.type} VALUES (${req.data})`)
  //     .then(() => {
  //       res.status(200)
  //         .json({
  //           status: 'success',
  //           message: `Entered data into ${req.type} table`,
  //         });
  //     })
  //     .catch((err) => next(err));
  // } catch (err) {
  //   res.status(500).send('Error entering survey data');
  // }
}

/*
 * handleGetRSS
 * Takes in the URL of an Aquablog RSS feed
 * and returns an object we will use to
 * render the LatestNews components
 *
 */
async function handleGetRSS(req, res) {
  try {
    const rssURL = req.body.url; // The URL of the RSS feed
    const feed = await parser.parseURL(rssURL); // Await the parsing of the feed

    if (req.body.news) {
      // Initialize output variables
      const output = {};
      const data = [];
      const featured = [];

      // Loop over each item
      feed.items.forEach((item) => {
        const itemData = {};

        // Determine if this is a featured post or not
        // Only feature the most recent post with a 'Featured' category
        let isFeatured = false;
        item.categories.forEach((category) => {
          if (category.indexOf('Feature') > -1 && !isFeatured && featured.length < 1) {
            isFeatured = true;
          }
        });

        // Start constructing our itemData object
        itemData.title = item.title;

        // Format the date string
        const date = new Date(item.pubDate);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        itemData.date = `${months[date.getMonth()]} ${item.pubDate.match(/\d{2}/g)[0]}, ${date.getFullYear()}`;

        itemData.link = item.link;
        itemData.teaser = item.contentSnippet;

        // Find all URLs in the content field
        // The first URL is always the post's featured image
        // so set that to our img value
        itemData.img = item.content.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gm)[0]; // eslint-disable-line

        // Push to the appropriate array
        if (isFeatured) {
          featured.push(itemData);
        } else {
          data.push(itemData);
        }
      });

      // Compose our output object and return it
      output.featured = featured;
      output.data = data;
      res.status(200).send(output);
    } else {
      const output = [];
      feed.items.forEach((item, i) => {
        if (i > 2) return;
        const data = {};
        data.title = item.title;
        data.link = item.link;

        // Format the date string
        const date = new Date(item.pubDate);
        const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        data.date = `${months[date.getMonth()]} ${item.pubDate.match(/\d{2}/g)[0]}, ${date.getFullYear()}`;

        output.push(data);
      });
      res.status(200).send(output);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  submitSurvey: handleSubmitSurvey,
  getRSS: handleGetRSS,
};
