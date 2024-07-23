// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// Since the return is an object
let resObject = {};

// convert the ipaddress into that of machine
app.enable("trust proxy");

// First of all, set the get method to the path /api/whoami
// then give middle function with req and res
app.get("/api/whoami", (req, res) => {
  // from express API references website
  resObject["ipaddress"] = req.ip;
  // from express API references website
  resObject["language"] = req.get("Accept-language");
  // from express API references website
  resObject["software"] = req.get("User-Agent");
  // call the resObject as a json object, then the link will show the above object of resObject
  res.json(resObject);
});
