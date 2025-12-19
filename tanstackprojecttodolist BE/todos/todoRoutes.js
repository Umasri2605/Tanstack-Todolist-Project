const express = require("express");
const router = express.Router();
const todoController = require("./todoController");

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
