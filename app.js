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
const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('./routes')(app);

require('./routes/querydata')(app);
require('./routes/platform')(app);
require('./routes/plugin')(app);
require('./routes/serve_data')(app);


// parse application/json
app.use(bodyParser.json())

try{
//  app.use(express.json());

  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/x-www-form-urlencoded
 //app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json
app.use(bodyParser.json());

  }catch(e){
    console.log(e);
  }




const PORT = config.port;
app.listen(PORT, () => {
  console.log();
});

