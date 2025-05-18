const express = require('express');
const app = express();

app.use(express.static('public')); // ✅ This must come before routes

// Also required:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then your route setup:
const connection = require('./app/config/connection');
const routes = require('./app/controllers/routes');
connection.init();
routes.configure(app);

const server = app.listen(8000, () => {
  console.log('Server running on port ' + server.address().port);
});
