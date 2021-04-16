const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { asyncHandleError } = require('../../common/error/errors');
const RestError = require('../../common/error/RestError');

router.route('/:userId/tasks').get(
  asyncHandleError(async (req, res) => {
    const tasks = await taskService.getAll(req.params.userId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:userId/tasks/:taskId').get(
  asyncHandleError(async (req, res) => {
    const task = await taskService.get(req.params.userId, req.params.taskId);
    res.json(Task.toResponse(task));
  })
);

router.route('/:userId/tasks').post(
  asyncHandleError(async (req, res) => {
    const { title, order, description, params } = req.body;
    const { userId } = req.params;
    const task = await taskService.create(
      new Task({
        title,
        order,
        description,
        userId,
        params
      })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:userId/tasks/:taskId').put(
  asyncHandleError(async (req, res) => {
    const { title, order, description, params, userId } = req.body;
    const { taskId } = req.params;
    const task = new Task({
      title,
      order,
      description,
      userId,
      params,
      _id: taskId
    });

    const updateTaskStatus = (await taskService.update(req.params.userId, task))
      .ok;

    if (updateTaskStatus === 0) {
      const error = new RestError(
        404,
        `Cant upadate task with taskId = ${taskId} and userId = ${req.params.userId}`
      );
      throw error;
    }

    res.json();
  })
);

router.route('/:userId/tasks/:taskId').delete(
  asyncHandleError(async (req, res) => {
    const { userId, taskId } = req.params;
    const taskDelCount = (await taskService.del(userId, taskId)).deletedCount;
    if (taskDelCount === 0) {
      const error = new RestError(
        404,
        `Cant delete task with taskId = ${taskId} and userId = ${userId}`
      );
      throw error;
    }
    res.status(204).json();
  })
);

module.exports = router;
