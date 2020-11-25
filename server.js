const express = require('express')
const app = express();
const port = process.env.PORT || 3001;

const routes = require('./api/route');
routes(app);
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});