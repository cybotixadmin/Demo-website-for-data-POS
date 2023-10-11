const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


require('./routes')(app);

require('./routes/querydata')(app);
require('./routes/platform')(app);
require('./routes/plugin')(app);
require('./routes/serve_data')(app);


// Route to serve the text file
app.get('/file_one.js', (req, res) => {
  const filePath = path.join(__dirname, 'file_one.js');
  res.download(filePath, 'file_one.js', (err) => {
    if (err) {
      res.status(500).send('File could not be downloaded: ' + err);
    }
  });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log();
});

