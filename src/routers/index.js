module.exports = app => {
  const todos = require("./../controller/todoController");

  const {schema, validateBody} = require("./../validation/todoValidation");

  var router = require("express").Router();

  //setup data
  // router.get("/setup", todos.create);

  // Create a new Todo
  router.post("/",validateBody(schema.todoValid), todos.create);

  // Retrieve all todos
  router.get("/", todos.findAll);

  // Retrieve all is Done todos
  router.get("/isDone", todos.findAllIsDone);

  // Retrieve a single Todo with id
  router.get("/:id", todos.findOne);

  // Update a Todo with id
  router.put("/:id", todos.update);

  // Delete a Todo with id
  router.delete("/:id", todos.delete);

  // Delete all Todo
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
};
