const Task = require('./task.model');
const  {findEntity} = require('../../shared');
// const boardRepo = require('../board.memory.repository');
// const userRepo = require('../../users/user.memory.repository');
// const {BadRequest} = require('../../../common/erros');

const TASKS = [];

// const checkIfColumnExists = (columnId, board) => {
//   if(columnId && !board.columns.find(c => c.id === columnId)) {
//     throw BadRequest(`Column with id ${columnId} does not exist`)
//   }
// };

const findTask = (id) => findEntity(TASKS, id);

const getAll = async ({boardId, userId} = {}) => {
  if(!boardId && !userId) {
    return TASKS;
  }

  if(boardId && !userId) {
    return TASKS.filter(t => t.boardId===boardId);
  }

  if(userId && !boardId) {
    return  TASKS.filter(t => t.userId===userId);
  }

  return  TASKS.filter(t => t.userId===userId && t.boardId===boardId);
};

const getById = async (id) => findTask(id);

const create = async ({order, userId, boardId, columnId, title, description}) => {

  // Check if user exists
  // if(userId) {
  //    await userRepo.getById(userId);
  // }

  // const board = await boardRepo.getById(boardId);
  //
  // checkIfColumnExists(columnId, board);

  const task = new Task({order, description, title, boardId, columnId, userId});

  TASKS.push(task);

  return task;
};

const update = async (id, task) => {
  // if(task.boardId) {
  //   const board = await boardRepo.getById(task.boardId);
  //
  //   checkIfColumnExists(task.columnId, board);
  // }
  const toUpdate = findTask(id);

  const updated = {
    ...toUpdate,
    ...task,
  };


  Object.assign(toUpdate, updated);
};


const deleteTask = async (id) => {
  findTask(id);

  const index = TASKS.indexOf(u => u.id === id);

  TASKS.splice(index,1);
};

module.exports = { getAll, getById, create, update, deleteTask};
