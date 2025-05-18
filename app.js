const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const connection = require('./app/config/connection');
const routes = require('./app/controllers/routes');

// Serve frontend files
app.use(express.static('public'));

// Middleware for parsing form and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Init DB and routes
connection.init();
routes.configure(app);

// Start server
const server = app.listen(8000, () => {
  console.log('✅ Server listening on port ' + server.address().port);
});
