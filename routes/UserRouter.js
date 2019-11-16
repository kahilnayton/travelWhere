const { Router } = require('express');
const { User, sequelize } = require('../models');
const { hashPassword, genToken, checkPassword } = require('../services/auth');
const { restrict } = require('../services/auth');

const userRouter = Router();

const buildAuthRouter = (user) => {
  const userData = {
    username: user.username,
    id: user.id,
  };

  const token = genToken(userData);

  return {
    user: userData,
    token,
  };
};

userRouter.post('./register', async (req, res, next) => {
  try {
    const password_digest = await hashPassword(req.body.password);
    const { username } = req.body;

    const user = await User.create({
      username,
      checkPassword
    });

    const respData = buildAuthResp(user);
    console.log(`Returning registered user ${JSON.stringify(respData)}`);
    res.json(respData);
  } catch (e) {
    next(e);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (await checkAuthResp(req.body.password, user.password_digest)) {
      const respData = buildAuthResp(user);

      res.json(resData);
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (e) {
    next(e);
  }
});

userRouter.get('./verify', restrict, (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

module.exports = userRouter;