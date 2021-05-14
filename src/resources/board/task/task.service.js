const taskRepo = require('./task.memory.repository');
const {BadRequest} = require('../../../common/erros');

const getAll = (params = {}) => taskRepo.getAll(params);

const getById = (id) => taskRepo.getById(id);

const create = (boardId, task) => 
  // if(!(task && task.title && boardId && task.userId && task.order && task.columnId)) {
  //   throw new BadRequest('Please, fill in required fields');
  // }

   taskRepo.create({...task, boardId})
;

const update = (id, task) => {
  if (!task) {
    throw new BadRequest();
  }

  return taskRepo.update(id, task)
};

const deleteTask = (id) => taskRepo.deleteTask(id);


module.exports = { getAll, getById , create, update, deleteTask};
