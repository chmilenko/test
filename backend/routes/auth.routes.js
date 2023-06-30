const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authRouter.get('/user', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    res.json({
      isLoggedIn: true,
      user,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

authRouter.post('/registration', async (req, res) => {
  try {
    const {
      login, email, password, passwordRepeat,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(422).json({ error: 'Такой пользователь уже есть' });
      return;
    }
    if (password !== passwordRepeat) {
      res.status(422).json({
        error: 'Пароли не совпадают ',
      });
      return;
    }
    if (password.length < 7 && passwordRepeat.length < 7) {
      res.status(422).json({
        error: 'Пароль должен быть не менее 8 символов',
      });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      login,
      email,
      password: hash,
    });
    req.session.userId = user.id;
    res.status(201).json({
      id: user.id,
      login: user.login,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post('/authenication', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (
      existingUser
      && (await bcrypt.compare(password, existingUser.password))
    ) {
      req.session.userId = existingUser.id;
      res.json({
        id: existingUser.id,
        login: existingUser.login,
        email: existingUser.email,
      });
    } else {
      res.status(401).json({
        error: 'Такого пользователя нет либо пароли не совпадают',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post('/logout', (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('user_sid');
      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // req.session.destroy(() => {
  //   res.json({ success: true });
  // });
});

module.exports = authRouter;
