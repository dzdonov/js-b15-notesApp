'use strict';

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var noteRoutes = require('./api/routes/noteRoutes');

var app = express();
app.use(bodyparser.json());
app.use(express.static( __dirname + '/dist'));
app.set('port', process.env.PORT || 3000);

app.get('/api/v1/notes', noteRoutes.collection);
app.post('/api/v1/notes',  noteRoutes.create);
app.get('/api/v1/notes/:id', noteRoutes.findById);
app.put('/api/v1/notes/:id', noteRoutes.update);
app.delete('/api/v1/notes/:id', noteRoutes.destroy);
mongoose.connect('mongodb://localhost/notes-development');

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Server running on ' + app.get('port'));
});
