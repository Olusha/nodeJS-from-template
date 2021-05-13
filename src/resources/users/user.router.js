const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/')
  .get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
})
  .post(async (req, res) => {
    const {login, name, password} = req.body;
   await usersService.create({login, name, password})
      .catch((err) => {
        res.status(400).send(err.message);
      });

    res.status(201).send();
  });

router.route('/:id')
  .get(async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if(user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404);
  }
})
  .put(async (req, res) => {
    const {id} = req.params;

    await usersService.update(id, req.body)
      .catch((err) => {
        req.status(err.message).send();
      });

    res.status(200).send();
  })
  .delete(async (req, res) => {
    const {id} = req.params;

    await usersService.update(id, req.body)
      .catch((err) => {
        req.status(err.message).send();
      });

    res.status(200);
  });




module.exports = router;
