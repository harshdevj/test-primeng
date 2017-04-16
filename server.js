var express = require('express');
var app = express();
//npm install -g cors
var cors = require('cors');
var fs = require("fs");

/*
const https = require('https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
*/

app.use(cors());

app.post('/login', function (req, res) {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(`{
        "token": "xxxAAA"
    }`);
});

app.get('/listUsers', function (req, res) {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    var authToken = req.header('AUTH_TOKEN');
    console.info(`Auth token is ${authToken}`);
    if (authToken !== 'xxxAAA') {
        res.status(401).send({ error: 'Unautherized user access!' });
    }
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});