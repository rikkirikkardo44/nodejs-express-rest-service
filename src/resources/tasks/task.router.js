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
    const task = await taskService.get(req.params.boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks').post(
  asyncHandleError(async (req, res) => {
    const { title, order, description, userId, columnId } = req.body;
    const { boardId } = req.params;
    const task = await taskService.create(
      new Task({
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      })
    );
    console.log(task);
    res.json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks/:taskId').put(
  asyncHandleError(async (req, res) => {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const { taskId } = req.params;
    const task = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
      _id: taskId
    });

    const updateTask = (await taskService.update(req.params.boardId, task)).ok;

    if (updateTask === 0) {
      const error = new RestError(
        404,
        `Cant upadate task with taskId = ${taskId} and boardId = ${req.params.boardId}`
      );
      throw error;
    }

    res.json();
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  asyncHandleError(async (req, res) => {
    const { boardId, taskId } = req.params;
    const taskDelCount = (await taskService.del(boardId, taskId)).deletedCount;
    if (taskDelCount === 0) {
      const error = new RestError(
        404,
        `Cant delete task with taskId = ${taskId} and boardId = ${boardId}`
      );
      throw error;
    }
    res.status(204).json();
  })
);

module.exports = router;
