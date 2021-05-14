const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('./task/task.service');

const taskBaseApi = '/:id/tasks';

router.route('/')
  .get(async (req, res) => {
  const boards = await boardService.getAll();

  return res.json(boards);
})
  .post(async (req, res, next) => {
    try {
      const board =await boardService.create(req.body);
      return res.status(201).json(board)
    }
    catch (e) {
      return next(e)
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
  const { id } = req.params;

    try {
      const board = await boardService.getById(id);
      return  res.json(board);
    }
    catch (e) {
      return  next(e)
    }
})
  .put(async (req, res, next) => {
    const {id} = req.params;

    try {
      const board = await boardService.update(id, req.body);
      return res.status(200).json(board);
    } catch (e) {
       return next(e)
    }
  })
  .delete(async (req, res, next) => {
    const {id} = req.params;

    await boardService.deleteBoard(id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });


router.route(`${taskBaseApi}`)
  .get(async (req, res, next) => {

    try {
      const tasks = await taskService.getAll({boardId: req.params.id});
      return res.json(tasks);
    } catch (e) {
      return next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const task = await taskService.create(req.params.id, req.body);
      return res.status(201).json(task)
    }
    catch (e) {
      return next(e)
    }
  });

router.route(`${taskBaseApi}/:taskId`)
  .get(async (req, res, next) => {
    const { taskId } = req.params;

    try {
      const task = await taskService.getById(taskId);
      return  res.json(task);
    }
    catch (e) {
      return  next(e)
    }
  })
  .put(async (req, res, next) => {
    const {taskId} = req.params;

    try {
      const task = await taskService.update(taskId, req.body);
      return res.status(200).json(task);
    } catch (e) {
      return next(e)
    }
  })
  .delete(async (req, res, next) => {
    const {taskId} = req.params;

    try {
      await taskService.deleteTask(taskId);
      res.status(204).send();
    } catch (e) {
      next(e)
    }
  });



module.exports = router;
