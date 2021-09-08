// const express = require("express");
const path = require("PATH")
// const PORT = process.env.PORT || 5000;

// const app = express();

// const db = require("../models");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });


// // All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });


const express = require('express');


const app = express();
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
//   });

app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Home Server Page" });
// });


require("./routes/nonprofit.route")(app)
require("./routes/volunteer.route")(app)
require("./routes/sector.route")(app)
require("./routes/resource.route")(app)

// app.get('/', function(req, res){
//    res.send("Hello world!");
// });



// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});