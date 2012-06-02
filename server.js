var express = require('express');
var mongo = require('mongodb');


var app = express.createServer();

// Configuration
app.configure(function () {
  app.use(express.bodyParser());
});

// Routes
app.get('/', function(req, res){
    res.send('Hello World');
});


app.listen(3000);
