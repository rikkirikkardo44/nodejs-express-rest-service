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
    const board = await boardService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardService.create(
      new Board({
        title,
        columns
      })
    );

    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const { title, columns } = req.body;
    const { id } = req.params;
    const board = new Board({
      title,
      columns,
      _id: id
    });

    const updatedBoard = (await boardService.update(board)).ok;

    if (updatedBoard === 0) {
      const error = new RestError(404, `Cant upadate board with ${id}`);
      throw error;
    }

    res.json();
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    const { id } = req.params;
    const boardDelCount = (await boardService.del(id)).deletedCount;
    if (boardDelCount === 0) {
      const error = new RestError(404, `Cant delete board with ${id}`);
      throw error;
    }
    res.status(204).json();
  })
);

module.exports = router;
