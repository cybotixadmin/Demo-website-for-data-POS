const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//import fetch from 'node-fetch';
//const fetch = require('node-fetch');
const https = require('https');
const http = require('http');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

require('./routes')(app);

require('./routes/querydata')(app);
require('./routes/platform')(app);
require('./routes/plugin')(app);
require('./routes/serve_data')(app);

try{
  app.use(express.json());
//  app.use(express.bodyParser());
  }catch(e){
    console.log(e);
  }

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

