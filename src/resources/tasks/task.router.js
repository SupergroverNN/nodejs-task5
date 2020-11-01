const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');
const { reqWrapper, NotFoundError } = require('../../errors/appError');

router.route('/').get(
  reqWrapper(async (req, res) => {
    const tasks = await tasksService.getAll(req.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  reqWrapper(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/').post(
  reqWrapper(async (req, res) => {
    const { body, boardId } = req;
    const task = await tasksService.add({ ...body, boardId });
    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  reqWrapper(async (req, res) => {
    const task = await tasksService.update(req.params.id, req.body);
    res.status(200).json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  reqWrapper(async (req, res) => {
    const { id } = req.params;
    const count = await tasksService.remove(id);
    if (!count) {
      throw new NotFoundError('Task', { id });
    }
    res.sendStatus(200);
  })
);

module.exports = router;
