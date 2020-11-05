/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const projectId = 'alpine-figure-289200';

// const { google } = require("googleapis");
process.env.HTTPS_PROXY = 'http://127.0.0.1:7890'; // 就是这里
// google.options({ proxy: 'http://proxyhost:port' }); // 和这里

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({projectId});

async function quickStart() {
  // The text to translate
  const text = 'Hello, world!';

  // The target language
  const target = 'ru';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}

quickStart();