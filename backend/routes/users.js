const express = require('express');
const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

router.get('/test', (req, res) => res.send('test worked'));
router.post('/register', async (req, res) => {
  const body = req.body;
  const newUser = new User({ ...body });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      const data = await newUser.save();
      res.send(data);
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(req.user);
      return res.send(user.username);
    });
  })(req, res, next);
});
router.get('/profile', (req, res) => {
  res.send({ user: req.user });
});

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/user/login');
  }
};

module.exports = router;
