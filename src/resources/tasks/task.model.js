const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order,
    description = 'DESCRIPTION',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(board) {
    const { id, title, order, description, userId, boardId, columnId } = board;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
