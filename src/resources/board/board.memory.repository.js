const Board = require('./board.model');
const  {findEntity} = require('../shared');
const Column = require('./column/column.model');

const BOARDS = [];

const findBoard = (id) => findEntity(BOARDS, id);

const getAll = async () => BOARDS;

const getById = async (id) => findBoard(id);

const create = async ({title, columns}) => {
  const cols = columns.map((c) =>  new Column(c));

  const board = new Board({title, columns: cols});

  BOARDS.push(board);
};

const update = async (id, body) => {
  const board = findBoard(id);

  const updated = {
    ...board,
    ...body,
  };


  Object.assign(board, updated);
};


const deleteBoard = async (id) => {
  findBoard(id);
  const index = BOARDS.indexOf(u => u.id === id);
  BOARDS.splice(index,1);
};

module.exports = { getAll, getById, create, update, deleteBoard};
