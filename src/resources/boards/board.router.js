const router = require('express').Router();
const boardsService = require('./board.service');
const { reqWrapper, NotFoundError } = require('../../errors/appError');
const Board = require('./board.model');

router.route('/').get(
  reqWrapper(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  reqWrapper(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/').post(
  reqWrapper(async (req, res) => {
    const board = await boardsService.add(req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  reqWrapper(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  reqWrapper(async (req, res) => {
    const { id } = req.params;
    const count = await boardsService.remove(id);
    if (!count) {
      throw new NotFoundError('Board', { id });
    }
    res.sendStatus(200);
  })
);

module.exports = router;
