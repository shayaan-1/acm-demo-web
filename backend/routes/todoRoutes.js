const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getAllTodos);

// POST create new todo
router.post('/', todoController.createTodo);

module.exports = router;