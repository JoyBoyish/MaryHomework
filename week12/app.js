 // set proxy
process.env.HTTPS_PROXY = 'http://127.0.0.1:7890';
const projectId = 'alpine-figure-289200';
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
// Instantiates a client
const translate = new Translate({projectId});

let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
// attach socket.io to http.server
let io = require("socket.io")(server);

let port = 8080;
// let pollObj = {
//     question: "Select Your Favourite Component",
//     options: [
//       { text: "Angular", value: 0, count: 0 },
//       { text: "MongoDB", value: 1, count: 0 },
//       { text: "Express.js", value: 2, count: 0 },
//       { text: "Golang", value: 3, count: 0 },
//       { text: "Python", value: 4, count: 0 },
//       { text: "C#", value: 5, count: 0 },
//       { text: "PhP", value: 6, count: 0 },
//       { text: "C++", value: 7, count: 0 },
//     ],
//   };

app.use("/", express.static(path.join(__dirname, "dist/week12")));

io.on("connection", socket => {
  console.log("new connection made from client with ID="+socket.id);

  // accept message from the client and send to all connected clients
  socket.on("postInput", data => {
    text = data.text;
    target = data.lang;

    // console.log(text);
    // console.log(target);
    translate.translate(text, target).then((results) => {
      if (!results.error) {
        result = results[0]
        console.log(result);

        // respond to sender individually
        io.to(socket.id).emit("getOutput", result);
      }
    });

    // io.sockets.emit("getPollObj", pollObj);
  });
});


// async function trans(text, target) {
//   // Translates some text into Russian
//   const [translation] = await translate.translate(text, target);
//   console.log(`Text: ${text}`);
//   console.log(`Translation: ${translation}`);
// }

server.listen(port, () => {
  console.log("Listening on port " + port);
});

// function getCurrentDate() {
//   let d = new Date();
//   return d.toLocaleString();
// }