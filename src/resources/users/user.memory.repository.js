const User = require('./user.model');

const USERS = [];

const findUser = (id) => USERS.find((u) => u.id === id);

const getAll = async () => USERS.map(u => User.toResponse(u));

const getById = async (id) => findUser(id);

const createUser = async ({name, login, password}) => {
  if(USERS.filter(u => u.login === login).length) {
    throw new Error('User with this login already exists')
  }

  const user = new User({name, login, password});

  USERS.push(user);
};

const update = async (id, user) => {
  const userToUpdate = findUser(id);

  if(!userToUpdate) {
    throw new Error('404')
  }

  const updated = {
    ...userToUpdate,
    ...user,
  };

  Object.assign(userToUpdate, updated);
};


const deleteUser = (id) => {

  const index = USERS.indexOf(u => u.id === id);

  USERS.splice(index,1);
};



module.exports = { getAll, getById, createUser, update, deleteUser};
