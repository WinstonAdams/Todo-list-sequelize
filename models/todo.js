'use strict';
module.exports = (sequelize, DataTypes) => {
  // 定義資料規格
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN
  }, {});

  // 定義資料關聯
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};