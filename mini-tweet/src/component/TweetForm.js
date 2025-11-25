import { useState } from 'react';

export default function TweetForm({ onTweetAdded }) {
  const [username, setUsername] = useState('');
  const [tweet, setTweet] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !tweet.trim()) return;

    await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, tweet })
    });

    setUsername('');
    setTweet('');
    setCharCount(0);
    onTweetAdded();
  };

  const handleTweetChange = (e) => {
    const text = e.target.value;
    setTweet(text);
    setCharCount(text.length);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 text-lg"
          required
        />
        <textarea
          placeholder="What's happening?"
          value={tweet}
          onChange={handleTweetChange}
          maxLength="280"
          rows="3"
          className="w-full p-3 border rounded-lg text-lg resize-none"
          required
        />
        <div className="flex justify-between items-center mt-2">
          <span className={`text-sm ${charCount > 270 ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/280
          </span>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50"
            disabled={charCount < 5 || charCount > 270 || !username}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}