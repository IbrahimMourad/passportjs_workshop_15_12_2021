const express = require('express');
const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

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
    if (err) return next(err);

    if (!user) return res.redirect('/login');

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // console.log(req.user);
      return res.json({ userID: user.id, authenticated: true });
    });
  })(req, res, next);
});

router.get('/profile', (req, res) => {
  res.send({ user: req.user ? req.user : 'no user' });
});

router.get('/checkAuthentication', (req, res) => {
  const authenticated = typeof req.user !== 'undefined';
  if (!req.isAuthenticated()) {
    // if user not authenticated send it to client
    console.log(`not Logged in : ${authenticated}`);
    res.status(200).json({ message: 'not logged in', authenticated });
  } else {
    const user = { name: req.user.name, id: req.user.id };
    res.status(200).json({ user, authenticated }); // if user  authenticated send it to client with user object
  }
});

router.get('/logout', (req, res) => {
  console.log('before', req.user);

  req.logout();
  console.log('logged out', req.user);
  res.status(200).json({ message: 'logged out', authenticated: false });
});
module.exports = router;
