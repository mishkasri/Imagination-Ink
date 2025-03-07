const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/imagination-ink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Define a schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Handle registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      res.json({ message: 'Registration successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials. Please register.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Define a schema and model for stories
const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  timestamp: { type: Date, default: Date.now }
});

const Story = mongoose.model('Story', storySchema);

// Handle adding stories
app.post('/add-story', async (req, res) => {
  const { title, content, username } = req.body;

  try {
    const newStory = new Story({ title, content, author: username });
    await newStory.save();
    res.json({ message: 'Story added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// User Stories Endpoint
app.get('/user-stories', async (req, res) => {
  try {
    const username = req.query.username; // Assuming you pass the username as a query parameter
    const stories = await Story.find({ author: username });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Stories Endpoint
app.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
// Route to get a story by ID
app.get('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).send({ message: 'Story not found' });
    }
    res.send(story);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching story' });
  }
});

// Add Comment Endpoint
app.post('/stories/:id/comments', async (req, res) => {
  try {
    const storyId = req.params.id;
    const { comment } = req.body;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    story.comments.push(comment);
    await story.save();

    res.json(story.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
