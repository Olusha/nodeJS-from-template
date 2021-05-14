const User = require('./user.model');
const {BadRequest, NotFound} = require('../../common/erros');
const taskRepo = require('../board/task/task.memory.repository');

const USERS = [];

const findUser = (id) => {
  const user = USERS.find((u) => u.id === id);

  if(user) {
    return user;
  }

  throw new NotFound();
};

const getAll = async () => USERS.map(u => User.toResponse(u));

const getById = async (id) => findUser(id);

const createUser = async ({name, login, password}) => {
  if(USERS.filter(u => u.login === login).length) {
    throw new BadRequest('User with this login already exists');
  }

  const user = new User({name, login, password});

  USERS.push(user);
};

const update = async (id, user) => {
  const userToUpdate = findUser(id);

  const updated = {
    ...userToUpdate,
    ...user,
  };

  Object.assign(userToUpdate, updated);
};


const deleteUser = async (id) => {
  findUser(id);
  const index = USERS.indexOf(u => u.id === id);
  USERS.splice(index,1);

  const tasks = await taskRepo.getAll({userId: id});
  tasks.forEach(t => {
    Object.assign(t, {...t, userId: null});
  });
};

module.exports = { getAll, getById, createUser, update, deleteUser};
