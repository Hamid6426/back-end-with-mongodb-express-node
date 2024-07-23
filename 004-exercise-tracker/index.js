const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Good! MongoDB is running'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// CREATE USERSCHEMA
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

// CREATE EXERCISESCHEMA
const exerciseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
}, { versionKey: false });

const Exercise = mongoose.model('Exercise', exerciseSchema);

// GET all users in a list by going to domain.com/api/users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST to api/users username
app.post('/api/users', async (req, res) => {
  const { username } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.json(foundUser);
  }
  const user = await User.create({ username });
  res.json(user);
});

// GET to api/users/:_id/logs
app.get('/api/users/:_id/logs', async (req, res) => {
  let { from, to, limit } = req.query;
  const userId = req.params._id;
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    return res.json({ message: 'No user found for this id' });
  }

  let filter = { userId };
  let dateFilter = {};
  if (from) {
    dateFilter['$gte'] = new Date(from);
  }
  if (to) {
    dateFilter['$lte'] = new Date(to);
  }
  if (from || to) {
    filter.date = dateFilter;
  }
  if (!limit) {
    limit = 100;
  }

  let exercises = await Exercise.find(filter).limit(parseInt(limit));
  
  exercises = exercises.map((exercise) => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
  }));

  res.json({
    username: foundUser.username,
    count: exercises.length,
    _id: userId,
    log: exercises,
  });
});

// POST to /api/users/:_id/exercises
app.post('/api/users/:_id/exercises', async (req, res) => {
  let { description, duration, date } = req.body;
  const userId = req.params._id;
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    return res.json({ message: 'No user found for this id' });
  }

  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }

  const exercise = await Exercise.create({
    username: foundUser.username,
    description,
    duration,
    date,
    userId,
  });

  // Add exercise fields to the user object
  const userWithExercise = {
    ...foundUser.toObject(),
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
  };

  res.json(userWithExercise);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});