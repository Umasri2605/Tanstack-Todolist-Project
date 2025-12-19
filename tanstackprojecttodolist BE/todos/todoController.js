const Todo = require("./todoModel");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
