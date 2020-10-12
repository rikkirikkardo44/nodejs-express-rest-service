const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );

  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = new Board({
    title: req.body.title,
    columns: req.body.columns
  });
  board.id = req.params.id;

  const updatedBoard = await boardService.update(board);

  res.json(Board.toResponse(updatedBoard));
});

router.route('/:id').delete(async (req, res) => {
  const boards = await boardService.del(req.params.id);
  res.json(boards.map(Board.toResponse));
});

module.exports = router;
