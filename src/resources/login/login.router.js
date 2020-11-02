const router = require('express').Router();
const userService = require('../users/user.service');
const loginService = require('./login.service');

const { reqWrapper } = require('../../errors/appError');

router.route('/').post(
  reqWrapper(async (req, res) => {
    const { login, password } = req.body;
    const user = await userService.getByLoginAndPassword(login, password);
    if (user) {
      const token = loginService.getToken(user);
      res.status(200).json({ token });
    } else {
      res.status(403).send('Wrong user/password');
    }
  })
);

module.exports = router;
