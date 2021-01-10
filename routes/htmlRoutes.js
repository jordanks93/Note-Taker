// DEPENDENCIES
// path package to get the correct file path for the html files
const path = require("path");

// ROUTING
module.exports = (app) => {

  // GET Requests

  // routes to page to make notes
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // routes to get started page
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

};