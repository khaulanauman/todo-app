const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./app/config/connection');
const routes = require('./app/controllers/routes');

// ✅ Serve static files
app.use(express.static('public'));

// ✅ Parse body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Routes
connection.init();
routes.configure(app);

const server = app.listen(8000, () => {
  console.log('✅ Server is running on port ' + server.address().port);
});
