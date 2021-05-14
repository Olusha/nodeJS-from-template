const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
  .get(async (req, res) => {
  const users = await usersService.getAll();

  return res.json(users.map(User.toResponse));
})
  .post(async (req, res, next) => {
    try {
      await usersService.create(req.body);
      res.status(201).send();
    } catch (e) {
      next(e)
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
  const { id } = req.params;

    try {
      const user = await usersService.getById(id);
      return res.json(User.toResponse(user));
    } catch (e) {
      return next(e)
    }
  })
  .put(async (req, res, next) => {
    const {id} = req.params;

    try {
      await usersService.update(id, req.body);
      res.status(200).send()
    } catch (e) {
      next(e)
    }
  })
  .delete(async (req, res, next) => {
    const {id} = req.params;

    try {
      await usersService.deleteUser(id);
      res.status(204).send();
    } catch (e) {
      next(e)
    }
  });


module.exports = router;
