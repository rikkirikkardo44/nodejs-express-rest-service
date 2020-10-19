const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { asyncHandleError } = require('../../common/error/errors');
const RestError = require('../../common/error/RestError');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    try {
      const board = await boardService.get(req.params.id);
      res.json(Board.toResponse(board));
    } catch (e) {
      const error = new RestError(404, e.message);
      throw error;
    }
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const board = await boardService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );

    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const board = new Board({
      title: req.body.title,
      columns: req.body.columns
    });
    board.id = req.params.id;

    const updatedBoard = await boardService.update(board);

    res.json(Board.toResponse(updatedBoard));
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    const boards = await boardService.del(req.params.id);
    res.status(204).json(boards.map(Board.toResponse));
  })
);

module.exports = router;
