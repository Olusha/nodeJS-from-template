const boardRepo = require('./board.memory.repository');
const taskRepo = require('./task/task.memory.repository');
const {BadRequest} = require('../../common/erros');

const getAll = () => boardRepo.getAll();

const getById = (id) => boardRepo.getById(id);

const create = (user) => boardRepo.create(user);

const update = (id, board) => {
  if (!board) {
    throw new BadRequest();
  }

  return boardRepo.update(id, board)
};

const  deleteBoard = async (id) => {
  const tasks = await taskRepo.getAll({boardId: id});

  await Promise.all(tasks.map(async (t) => {
    await taskRepo.deleteTask(t.id);
  }));

  return boardRepo.deleteBoard(id);
};

module.exports = { getAll, getById , create, update, deleteBoard};
