
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// mongoose setup
require('./db');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//API routes
var api = require('./api');

app.get('/api/tasks', api.getTasks);
app.get('/api/tasks/:id', api.getTask);
app.post('/api/tasks', api.createTask);
app.delete('/api/tasks/:id', api.destroyTask);
app.put('/api/tasks/:id', api.updateTask);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
