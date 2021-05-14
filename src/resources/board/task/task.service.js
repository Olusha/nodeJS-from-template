const taskRepo = require('./task.memory.repository');
const {BadRequest} = require('../../../common/erros');

const getAll = ({boardId = null, userId = null} = {}) => taskRepo.getAll({boardId, userId});

const getById = (id) => taskRepo.getById(id);

const create = (task) => {
  if(!(task && task.title && task.boardId && task.userId && (task.order) && task.columnId)) {
    throw BadRequest('Please, fill in required fields');
  }

  return taskRepo.create(task);
};

const update = (id, task) => {
  if (!task) {
    throw new BadRequest();
  }

  return taskRepo.update(id, task)
};

const deleteTask = (id) => taskRepo.deleteTask(id);


module.exports = { getAll, getById , create, update, deleteTask};
