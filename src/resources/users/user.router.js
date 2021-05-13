const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
  .get(async (req, res) => {
  const users = await usersService.getAll();

  return res.json(users.map(User.toResponse));
})
  .post(async (req, res, next) => {
    const {login, name, password} = req.body;
    await usersService.create({login, name, password})
      .then(() => res.status(201).send())
      .catch((err) => next(err));
  });

router.route('/:id')
  .get(async (req, res, next) => {
  const { id } = req.params;

  const user = await usersService.getById(id)
    .catch(err => next(err));

    return user && res.json(User.toResponse(user));
})
  .put(async (req, res, next) => {
    const {id} = req.params;

    await usersService.update(id, req.body)
      .then(() => res.status(200).send())
      .catch((err) => next(err));
  })
  .delete(async (req, res, next) => {
    const {id} = req.params;

    await usersService.deleteUser(id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });


module.exports = router;
