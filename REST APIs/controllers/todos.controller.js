const Todo = require("../model/todo.model");

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.getTodos();
    res.json({ todos: todos });
  } catch (error) {
    return next(error);
  }
};

const addTodo = async (req, res, next) => {
  const todoText = req.body.text;

  const todo = new Todo(todoText, null);

  let insertedId = null;

  try {
    const result = await todo.save();
    insertedId = result.insertedId; //insertedId is a predefined object of mongodb
  } catch (error) {
    return next(error);
  }

  todo.id = insertedId.toString();

  res.json({ message: "Todo updated successfully", createTodo: todo });
};

const updateTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const newTodoText = req.body.newText;

  const todo = new Todo(newTodoText, todoId);

  try {
    await todo.save();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Todo Updated", updatedTodo: todo });
};

const deleteTodo = async (req, res, next) => {
  const todoId = req.params.id;
  const todo = new Todo(null, todoId);

  try {
    await todo.delete();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Todo deleted" });
};

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
