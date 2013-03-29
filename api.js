var mongoose = require('mongoose');
var Todo     = mongoose.model('Todo');

/*
 * GET all tasks
 */
exports.getTasks = function(req, res) {
  Todo.find(function(err, todos, count) {
    console.log("Getting all TODOS: "+todos);
    if(err) returnError(res, 400, err);
    else returnOk(res, todos);
  });
};

/*
 * GET task by id.
 */
exports.getTask = function(req, res) {
  var id = req.params.id;
  console.log("Getting task by ID: "+id);
  Todo.findById(id, function(err, todo, count) {
    console.log("Todo by ID '"+id+"': "+todo);
    if(err) returnError(res, 400, err);
    else returnOk(res, todo);
  });
};

/*
 * POST to create new task.
 */
exports.createTask = function(req, res) {
  console.log("Creating task..");
  var todo = req.body;

  new Todo(todo).save(function(err, todo, count) {
    console.log("saved new todo");
    if(err) returnError(res, 400, err);
    else returnOk(res, todo);
  });
};

/*
 * DELETE to remove a task.
 */
exports.destroyTask = function(req, res) {
  console.log("Deleting todo with id " + id);

  var id = req.params.id;
  Todo.findOne({'_id': id}, function(err, todo) {
    if(err) returnError(res, 400, err);
    else if(todo == null) returnError(res, 204, "TODO not found");
    else {
      todo.remove();
      returnOk(res, "TODO with id '"+id+"' deleted");
    }
  });
};

/*
 * PUT to update a task.
 */
exports.updateTask = function(req, res) {
  var id = req.params.id;
  var todoToUpdate = req.body;
  console.log("Updating todo with id: " + id);

  Todo.findById(id, function(err, todo) {
    if(err) returnError(res, 400, err);
    else if(todo == null) returnError(res, 204, "TODO not found");
    else {
      todo.completed = todoToUpdate.completed;
      todo.updated_at =  Date.now();
      todo.tags = todoToUpdate.tags;
      todo.save();
      returnOk(res, todo);
    }
  });
};

var returnOk = function(response, result) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(result));
};

var returnError = function(response, code, err) {
  console.log("Error! - "+err);
  response.writeHead(code, { 'Content-Type': 'text/plain' });
  response.end("You're doing it wrong!\n Message: " + err);
};