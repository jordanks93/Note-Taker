// LOAD DATA
// links routes to data sources
const db = require("../db/db.json");
const fs = require("fs");


// API Setup
module.exports = (app) => {

  // GET Request
  // read the db.json file and return saved notes
  app.get("/api/notes", (req, res) => {
    res.json(db);
  });

  // POST Request
  app.post("/api/notes", (req, res) => {

    // add note to object array 
    db.push(req.body);

    // give unique id for each note to identify for deletion
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });

    // save note to db.json file
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if(err) {
        throw err;
      } else
          res.json(db);
          console.log(db);
    });
  });

};