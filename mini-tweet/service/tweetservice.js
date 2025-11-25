const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tweets.json');

// Read file
const readTweets = () => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Write file
const writeTweets = (tweets) => {
  fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));
};

// Get all tweets
const getAllTweets = () => readTweets();

// Add tweet
const addTweet = (username, tweet) => {
  const tweets = readTweets();

  const newTweet = {
    id: Date.now(),
    username,
    tweet,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  tweets.unshift(newTweet);
  writeTweets(tweets);
  return newTweet;
};

// Update tweet
const updateTweet = (id, text) => {
  const tweets = readTweets();
  const t = tweets.find(item => item.id === parseInt(id));

  if (!t) return null;

  t.tweet = text;
  t.updatedAt = new Date().toISOString();
  writeTweets(tweets);

  return t;
};

// Delete tweet
const deleteTweet = (id) => {
  const tweets = readTweets();
  const index = tweets.findIndex(item => item.id === parseInt(id));

  if (index === -1) return null;

  const [deleted] = tweets.splice(index, 1);
  writeTweets(tweets);

  return deleted;
};

module.exports = {
  getAllTweets,
  addTweet,
  updateTweet,
  deleteTweet
};
