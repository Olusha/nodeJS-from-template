const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (user) => usersRepo.createUser(user);

const update = (id, user) => {
  if (!user) {
    throw Error('400')
  }

  return usersRepo.update(id, user)
};

const deleteUser = (id) => usersRepo.deleteUser(id);


module.exports = { getAll, getById , create, update, deleteUser};
