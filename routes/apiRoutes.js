// DEPENDENCIES
// load file system module and link to db.json
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
      if (err) {
        throw err;
      } else
        res.json(db);
      console.log(db);
      console.log("Note Posted");
    });
  });


  // DELETE Request
  app.delete("/api/notes/:id", (req, res) => {
    // stores correct array position for id selected for deletion
    let id = req.params.id - 1;
    console.log(req.params);
    // splice note that was selected to be deleted from the db array
    db.splice(id, 1);
    // reset id for each note in the array
    db.forEach((obj, i) => {
      obj.id = i + 1;
    });
    // save changes to db.json
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if (err) {
        throw err;
      } else
        res.json(db);
      console.log(db);
      console.log("Deleted Note");
    });
  });
};