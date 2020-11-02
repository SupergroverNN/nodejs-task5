const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, DEFAULT_GEN_SAULT } = require('./config');
const bcrypt = require('bcrypt');

const checkToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader) {
    const [type, token] = authHeader.split(' ');

    jwt.verify(token, JWT_SECRET_KEY, (err) => {
      if (err) {
        return res.status(401).send('Unauthorized user');
      }
      return next();
    });
  } else {
    res.status(401).send('Unauthorized user');
  }
};

const getHash = async (password) => {
  const salt = await bcrypt.genSalt(+DEFAULT_GEN_SAULT);
  return bcrypt.hash(password, salt);
};

module.exports = { checkToken, getHash };
