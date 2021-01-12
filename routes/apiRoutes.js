// DEPENDENCIES
// load file system module and link to db.json
const db = require("../db/db.json");
const fs = require("fs");

// used to set IDs for stored note objects
const setIDs = () => {
  db.forEach((obj, i) => {
    obj.id = i + 1;
  });
};

// used to save notes to db.json
const saveToFile = (res) => {
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) {
      throw err;
    } else
      res.json(db);
      console.log(db);
  });
};

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
    setIDs();

    // save note to db.json file
    saveToFile(res);
    console.log("Note Posted");
  });

  // DELETE Request
  app.delete("/api/notes/:id", (req, res) => {
    // stores correct array position for id selected for deletion
    let idArrPosition = req.params.id - 1;
    console.log(req.params);
    // splice note that was selected to be deleted from the db array
    db.splice(idArrPosition, 1);
    // reset id for each note in the array
    setIDs();
    // save changes to db.json
    saveToFile(res);
    console.log("Deleted Note");
  });
};