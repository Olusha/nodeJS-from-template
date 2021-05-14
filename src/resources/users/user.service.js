const usersRepo = require('./user.memory.repository');
const {BadRequest} = require('../../common/erros');
const taskRepo = require('../board/task/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (user) => usersRepo.createUser(user);

const update = (id, user) => {
  if (!user) {
    throw new BadRequest();
  }

  return usersRepo.update(id, user)
};

const deleteUser = async (id) => {

  const tasks = await taskRepo.getAll({userId: id});

  await Promise.all(tasks.map(async (t) => {
    await taskRepo.update(t.id, {...t, userId: null})
  }));

  return usersRepo.deleteUser(id);
};


module.exports = { getAll, getById , create, update, deleteUser};
