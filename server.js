// DEPENDENCIES
// Express Package
const express = require("express");

// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port for listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// ROUTES
// route files give the server a "map" of how to respond when users visit or requests data
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
// starts the server
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
