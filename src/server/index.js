const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const bodyParser = require('body-parser');
const  cors = require('cors');

const aylien = require('aylien_textapi');

const app = express()

app.use(cors())
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

app.post('/analyze', (req, res) => {
  textapi.sentiment({ url: req.body.url }, (error, result) => {
    if(error) {
      console.log('Hmmm, there was an error getting the result. Please try again...')
      res.send();
      return;
    }
    console.log('Result has been received...')
    res.send(result);
  })
})

module.exports = app;
