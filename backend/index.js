require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const userRouter = require('./routes/users');
const app = express();

require('./config/passport')(passport);

const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to db')
);
app.use(cors());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
