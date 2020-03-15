const db = require("./../model");
const Todos = db.todo;
const Op = db.Sequelize.Op;

// Create and Save a new Todos
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Todos
  const todo = {
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone ? req.body.isDone : false
  };

  // Save Todos in the database
  Todos.create(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
};

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Todos.findAll({ where: condition })
    .then(data => {
      if (data == "") {
        res.send({
          message: "Todos your find does not exist, please enter todo your!!"
        });
      } 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Todo."
      });
    });
};

// Find a single Todos with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todos.findOne(req.params,{
    where: {id: id}
  })
    .then(data => {
      if (!data) {
        res.send({
          message: "Todo your find does not exist!!"
        });
      } 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id
      });
    });
};

// Update a Todos by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Todos.update(req.params, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo updated successfully!!."
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });
};

// Delete a Todos with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todos.destroy({
    where: { id: id }
  })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Todo was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Todos with id=${id}. Maybe Todos was not found!`
          });
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      })
    });
};

// Delete all Todoss from the database.
exports.deleteAll = (req, res) => {
  Todos.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Todos."
      });
    });
};

// find all isDone Todos
exports.findAllIsDone = (req, res) => {
  Todos.findAll({ where: { isDone: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Todos."
      });
    });
};
