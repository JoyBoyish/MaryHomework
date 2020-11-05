 // set proxy
// process.env.HTTPS_PROXY = 'http://127.0.0.1:7890';
// process.env.SOCKS5_PROXY = 'http://127.0.0.1:7891';

// process.env.PROXY = 'http://127.0.0.1:7890'

const projectId = 'alpine-figure-289200';
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
// Instantiates a client
const translate = new Translate({projectId});

// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
// attach socket.io to http.server
let io = require("socket.io")(server);

let port = 8080;
app.use("/", express.static(path.join(__dirname, "dist/week12")));
app.use("/", express.static(path.join(__dirname, "mp3s")));


io.on("connection", socket => {
  console.log("new connection made from client with ID="+socket.id);

  // accept message from the client and send to all connected clients
  socket.on("postInput", data => {
    let text = data.text;
    let target = data.lang;

    // translate
    translate.translate(text, target).then((results) => {
      if (!results.error) {
        result = results[0]
        console.log(result);

        // respond to sender individually
        io.to(socket.id).emit("getTranslate", result);
      }
    });

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the Text-to-Speech request
  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error("ERROR:", err);
      return;
    }

    console.log("synthesize now...");

    // Write the binary audio content to a local file
    // We use sockets' id as file name
    let audioPath = socket.id + ".mp3"
    fs.writeFile(audioPath, response.audioContent, "binary", err => {
      if (err) {
        console.error("ERROR:", err);
        return;
      }
      console.log("Audio content written to file: output.mp3");
    });

    console.log("synthesize complete...");
     // respond to sender individually
     io.to(socket.id).emit("getAudio", audioPath);
  });
    });
});


server.listen(port, () => {
  console.log("Listening on port " + port);
});

// function getCurrentDate() {
//   let d = new Date();
//   return d.toLocaleString();
// }