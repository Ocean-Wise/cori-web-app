// Research Citation generator
const Cite = require('citation-js');

// Sendgrid libraries
const helper = require('sendgrid').mail;
const fromEmail = new helper.Email('research@ocean.org');
const toEmail = new helper.Email('fishlab@ocean.org');
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

/*
 * handleGenerateCitation
 *
 * Creates a single citation or citation list
 * for a passed BibTeX entry. Return them as
 * a string.
 *
 */
function handleGenerateCitation(req, res) {
  try {
    let output;
    const citations = new Cite();

    if (req.body.list !== undefined) {
      req.body.list.forEach((item) => {
        citations.add(item.citation);
      });
      output = citations.get({ style: 'citation-fas', type: 'string', append: '\n' });
    } else {
      citations.add(req.body.citations);
      switch (req.body.style) {
        case 'bibtex':
          output = citations.get({ style: 'bibtex', type: 'string' });
          break;
        case 'apa':
          output = citations.get({ style: 'citation-apa', type: 'string' });
          break;
        case 'vancouver':
          output = citations.get({ style: 'citation-vancouver', type: 'string' });
          break;
        case 'fas':
          output = citations.get({ style: 'citation-fas', type: 'string' });
          break;
        default:
          output = citations.get({ style: 'bibtex', type: 'string' });
          break;
      }
    }

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err.stack);
  }
}

// Rss Parser
const Parser = require('rss-parser');
const parser = new Parser();

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
      feed.items.forEach((item, i) => {
        const itemData = {};

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
        // If this is the first RSS item, feature the story
        if (i === 0) {
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
        if (i > 2 && !req.body.mediaPage) return;
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

// Connect to our database for survey submission
const promise = require('bluebird');
const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);
const db = pgp(`${process.env.DATABASE_URL}?ssl=true`);

// Handle the submission of survey data
function handleSurveyData(req, res) {
  try {
    // Select the correct survey logic
    switch (req.body.surveyName) {
      case 'annapolis':
        // The user has selected some files for upload
        if (req.body.data.files.length > 0) {
          // Attempt to upload the files to the survey's Cloudinary CDN directory
          handleUploadFiles(req.body.data.files, req.body.surveyName)
            .then((result) => {
              // The files were uploaded to Cloudinary successfully, so store the survey data and CDN URLs in the appropriate database table
              handleAnnapolisSurvey(req.body.data.survey, result)
                .then(() => res.status(200).send('Successfully uploaded survey data')) // Success! Return status 200
                .catch((err) => res.status(500).send(err));
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } else {
          // The User has not chosen to upload any files, so just upload the survey data
          handleAnnapolisSurvey(req.body.data.survey, '')
            .then(() => res.status(200).send('Successfully uploaded survey data'))
            .catch((err) => res.status(500).send(err));
        }
        break;
      case 'lingcod':
        handleLingcodSurvey(req.body.data.survey)
          .then(() => res.status(200).send('Successfully uploaded survey data'))
          .catch((err) => res.status(500).send(err));
        break;
      case 'rockfish':
        handleRockfishSurvey(req.body.data.survey)
          .then(() => res.status(200).send('Successfully uploaded survey data'))
          .catch((err) => res.status(500).send(err));
        break;
      default:
        res.status(500).send('You must supply the surveyName value and associated data object');
        break;
    }
  } catch (err) {
    console.error(err.stack);
    res.status(500).send(err);
  }
}

// Insert the survey data for the Annapolis survey into the database
function handleAnnapolisSurvey(data, images) {
  return new Promise((res, rej) => {
    try {
      const stringImages = JSON.stringify(images);
      db.any(`INSERT INTO annapolis(name, email, divedate, images, videolink, comments) VALUES ('${data.name}', '${data.email}', '${data.divedate}', '${stringImages}', '${data.videoLink}', '${data.comments}')`)
      .then(() => {
        const subject = 'New survey submission for Annapolis';
        const content = new helper.Content('text/plain', `Name: ${data.name}\n\nEmail: ${data.email}\n\nDive date: ${data.divedate}\n\nImages:\n\n${images.map((image) => `${image.url} \n\n`)}\n\nVideo Link: ${data.videoLink}\n\nComments: ${data.comments}`);
        const mail = new helper.Mail(fromEmail, subject, toEmail, content);
        const request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request, (error) => {
          if (error) {
            rej(error.stack, images);
          }
          res();
        });
      })
      .catch((err) => rej(err.stack, images));
    } catch (err) {
      rej(err);
    }
  });
}

function handleLingcodSurvey(data) {
  return new Promise((res, rej) => {
    db.any(`INSERT INTO lingcod(divera, diverb, divedate, generalLocation, specificLocation, bottomTime, nests, additionalComments) VALUES ('${JSON.stringify(data.divera)}', '${JSON.stringify(data.diverb)}', '${JSON.stringify(data.divedate)}', '${JSON.stringify(data.generalLocation)}', '${JSON.stringify(data.specificLocation)}', '${JSON.stringify(data.bottomTime)}', '${JSON.stringify(data.nests)}', '${JSON.stringify(data.additionalComments)}')`)
      .then(() => {
        const subject = 'New survey submission for Lingcod';
        // eslint-disable-next-line
        const content = new helper.Content('text/plain', `Diver A:\n\n\t\tName: ${data.divera.name}\n\n\t\tAddress: ${data.divera.address}\n\n\t\tPhone: ${data.divera.phone}\n\n\t\tEmail: ${data.divera.email}\n\n\nDiver B:\n\n\t\tName: ${data.diverb.name}\n\n\t\tAddress: ${data.diverb.address}\n\n\t\tPhone: ${data.diverb.phone}\n\n\t\tEmail: ${data.diverb.email}\n\n\nGeneral Location: ${data.generalLocation}\n\nSpecific Location: ${data.specificLocation}\n\nGPS: ${data.gps}\n\nBottom Time: ${data.bottomTime}\n\nNests:\n\n${JSON.stringify(data.nests, null, 2).replace(/\"([^(\")"]+)\":/g, "$1:")}\n\n\n\nAdditional Comments:${data.additionalComments}`);
        const mail = new helper.Mail(fromEmail, subject, toEmail, content);
        const request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request, (error) => {
          if (error) {
            rej(error.stack);
          }
          res();
        });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function handleRockfishSurvey(data) {
  return new Promise((res, rej) => {
    db.any(`INSERT INTO rockfish(divedate, name, address, phone, email, generalLocation, specificLocation, bottomTime, averageDepth, maximumDepth, speciesData, additionalComments) VALUES ('${data.divedate}', '${data.name}', '${data.address}', '${data.phone}', '${data.email}', '${data.generalLocation}', '${data.specificLocation}', '${data.bottomTime}', '${data.averageDepth}', '${data.maximumDepth}', '${JSON.stringify(data.speciesData)}', '${data.additionalComments}')`)
      .then(() => {
        const subject = 'New survey submission for Rockfish';
        // eslint-disable-next-line
        const content = new helper.Content('text/plain', `Date: ${data.divedate}\n\nName: ${data.name}\n\nAddress: ${data.address}\n\nPhone: ${data.phone}\n\nEmail: ${data.email}\n\nGeneral Location: ${data.generalLocation}\n\nSpecific Location: ${data.specificLocation}\n\nBottom Time ${data.bottomTime}\n\nAverage Depth: ${data.averageDepth}\n\nMaximum Depth: ${data.maximumDepth}\n\nSpecies Data:\n\n${JSON.stringify(data.speciesData, null, 2).replace(/\"([^(\")"]+)\":/g, "$1:")}\n\n\nAdditional Comments: ${data.additionalComments}`);
        const mail = new helper.Mail(fromEmail, subject, toEmail, content);
        const request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        });

        sg.API(request, (error) => {
          if (error) {
            rej(error);
          }
          res();
        });
      })
      .catch((err) => {
        console.error(err.stack);
        rej(err);
      });
  });
}

// Configure our connection to the Cloudinary CDN
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'oceanwise',
  api_key: '228634121724575',
  api_secret: '_GyZxzo8z0Q1VSyRPxlLRokURQM',
});

// Upload the given data to the appropriate CDN folder for the passed surveyName
async function handleUploadFiles(data, surveyName) {
  // Create a new promise to upload multiple files
  const multipleUpload = new Promise(async (resolve, reject) => {
    // Initialize number of files to upload and results array
    const uploadLen = data.length;
    const uploadRes = [];

    // Loop over files
    for (let i = 0; i < uploadLen; i += 1) {
      // Get the base64 data
      const base64 = data[i].base64;
      // Await for the upload to complete before continuing loop
      await cloudinary.v2.uploader.upload(base64, { folder: surveyName }, (error, result) => { // eslint-disable-line
        if (result) {
          // Push publicId and url into array
          uploadRes.push({ id: result.public_id, url: result.url });
          // If we have uploaded all the files resolve the promise
          if (uploadRes.length === uploadLen) {
            resolve(uploadRes);
          }
        } else if (error) {
          console.log(error.stack); // eslint-disable-line
          // We had an error so reject the promise
          reject(error);
        }
      });
    }
  })
  .then((result) => result)
  .catch((error) => error);

  // Waits until promise is resolved before sending back response to the caller
  const upload = await multipleUpload;
  return upload;
}

module.exports = {
  getCitation: handleGenerateCitation,
  getRSS: handleGetRSS,
  uploadSurvey: handleSurveyData,
};
