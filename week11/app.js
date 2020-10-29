let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
// attach socket.io to http.server
let io = require("socket.io")(server);

let port = 8080;
let pollObj = {
    question: "Select Your Favourite Component",
    options: [
      { text: "Angular", value: 0, count: 0 },
      { text: "MongoDB", value: 1, count: 0 },
      { text: "Express.js", value: 2, count: 0 },
      { text: "Golang", value: 3, count: 0 },
      { text: "Python", value: 4, count: 0 },
      { text: "C#", value: 5, count: 0 },
      { text: "PhP", value: 6, count: 0 },
      { text: "C++", value: 7, count: 0 },
    ],
  };

app.use("/", express.static(path.join(__dirname, "dist/week11")));

io.on("connection", socket => {
  console.log("new connection made from client with ID="+socket.id);
  io.sockets.emit("getPollObj", pollObj);

  // accept message from the client and send to all connected clients
  socket.on("postPoll", postValue => {
    console.log("get poll value:" + postValue + "from: " + socket.id);

    pollObj.options.forEach((element, index) => {
      if(element.value == postValue) {
        pollObj.options[index].count += 1;
      }
    });
    // update clients with the whole object
    io.sockets.emit("getPollObj", pollObj);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

// function getCurrentDate() {
//   let d = new Date();
//   return d.toLocaleString();
// }