const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const curr_todoes = await redis.getAsync('added_todos')
  await redis.setAsync('added_todos', Number(curr_todoes)+1)
  res.send(todo);
});


const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  console.log(req.todo)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
router.delete('/:id', findByIdMiddleware, async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
router.get('/:id', findByIdMiddleware, (req, res) => {
  res.send(req.todo);
});


/* PUT todo. */
router.put('/:id', findByIdMiddleware, async (req, res) => {
  const newTodo = await Todo.findByIdAndUpdate(req.todo.id, req.body, {new: true, useFindAndModify: false})
  res.send(newTodo);
});


module.exports = router;
