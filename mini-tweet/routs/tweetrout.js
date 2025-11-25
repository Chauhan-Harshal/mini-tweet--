const express = require('express');
const router = express.Router();
const {
  getAllTweets,
  addTweet,
  updateTweet,
  deleteTweet
} = require('../services/tweetService');
const validateTweet = require('../middleware/validateTweet');

// Get all tweets
router.get('/', (req, res) => {
  res.json(getAllTweets());
});

// Add a new tweet
router.post('/', validateTweet, (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !username.trim()) {
    return res.status(400).json({ error: "Username is required" });
  }

  const newTweet = addTweet(username.trim(), tweet);
  res.status(201).json(newTweet);
});

// Update a tweet
router.put('/:id', validateTweet, (req, res) => {
  const updated = updateTweet(req.params.id, req.body.tweet);

  if (!updated) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  res.json(updated);
});

// Delete a tweet
router.delete('/:id', (req, res) => {
  const deleted = deleteTweet(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  res.json({ message: "Tweet deleted", deleted });
});

module.exports = router;
