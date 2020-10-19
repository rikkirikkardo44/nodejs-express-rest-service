const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { asyncHandleError } = require('../../common/error/errors');
const RestError = require('../../common/error/RestError');

router.route('/:boardId/tasks').get(
  asyncHandleError(async (req, res) => {
    const tasks = await taskService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:taskId').get(
  asyncHandleError(async (req, res) => {
    try {
      const task = await taskService.get(req.params.boardId, req.params.taskId);
      res.json(Task.toResponse(task));
    } catch (e) {
      const error = new RestError(404, e.message);
      throw error;
    }
  })
);

router.route('/:boardId/tasks').post(
  asyncHandleError(async (req, res) => {
    const task = await taskService.create(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      })
    );

    res.json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks/:taskId').put(
  asyncHandleError(async (req, res) => {
    const task = new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    });
    task.id = req.params.taskId;

    const updatedTask = await taskService.update(req.params.boardId, task);

    res.json(Task.toResponse(updatedTask));
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  asyncHandleError(async (req, res) => {
    const tasks = await taskService.del(req.params.boardId, req.params.taskId);
    res.status(204).json(tasks.map(Task.toResponse));
  })
);

module.exports = router;
