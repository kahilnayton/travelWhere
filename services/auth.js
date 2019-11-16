const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const TOKEN_KEY = 'nancy';

const restrict = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    const data = jwt.verify(token, TOKEN_KEY);
    res.locals.user = data;
    next();

  } catch (e) {
    console.log(e);
    res.status(403).send('Unorthorized');
  }
};
const hashPassword = async (password) => {
  const digest = await bcrypt.hash(password, SALT_ROUNDS);
  return digest;
};

const checkPassword = async (password, password_digest) => {
  return await bcrypt.compare(password, password_digest);
};

const getToken = (data) => {
  const token = jwt.sign(data, TOKEN_KEY);
  return token;
};

module.exports = {
  hashPassword,
  checkPassword,
  genToken,
  restrict
}