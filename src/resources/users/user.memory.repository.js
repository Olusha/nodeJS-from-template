const User = require('./user.model');
const {BadRequest, NotFound} = require('../../common/erros');

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

  return user;
};

const update = async (id, user) => {
  const userToUpdate = findUser(id);

  const updated = {
    ...userToUpdate,
    ...user,
  };

  Object.assign(userToUpdate, updated);

  return  userToUpdate;
};


const deleteUser = async (id) => {
  findUser(id);
  const index = USERS.indexOf(u => u.id === id);
  USERS.splice(index,1);
};

module.exports = { getAll, getById, createUser, update, deleteUser};
