const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json( {type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.static(__dirname));

// holding the data


require('./app/routing/apiRouting.js')(app);
require('./app/routing/htmlRoutes.js')(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});