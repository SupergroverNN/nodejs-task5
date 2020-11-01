const router = require('express').Router();
const { reqWrapper } = require('../../errors/appError');
const User = require('./user.model');
const usersService = require('./user.service');

// get All users
router.route('/').get(
  reqWrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
);
// get user by id
router.route('/:id').get(
  reqWrapper(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(200).json(User.toResponse(user));
  })
);
// create user
router.route('/').post(
  reqWrapper(async (req, res) => {
    const user = await usersService.add(req.body);
    res.status(200).json(User.toResponse(user));
  })
);
// change user
router.route('/:id').put(
  reqWrapper(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  reqWrapper(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;
