module.exports = (sequelize, Sequelize) => {
  const Todos = sequelize.define("todo", {
    title:{
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    isDone: {
      type: Sequelize.BOOLEAN
    }
  });

  return Todos;
};
