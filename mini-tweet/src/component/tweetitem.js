import { useState } from 'react';

export default function TweetItem({ tweet, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(tweet.tweet);

  const updateTweet = async () => {
    await fetch(`/api/tweets/${tweet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet: editText })
    });
    setIsEditing(false);
    onChange();
  };

  const deleteTweet = async () => {
    await fetch(`/api/tweets/${tweet.id}`, { method: "DELETE" });
    onChange();
  };

  const formatDate = (d) => new Date(d).toLocaleString();

  return (
    <div className="bg-white rounded-lg shadow p-5 mb-4">
      <div className="flex justify-between">

        {/* User + Date */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          <div>
            <strong className="text-lg">{tweet.username}</strong>
            <span className="text-gray-500 text-sm ml-2">
              · {formatDate(tweet.createdAt)}
            </span>
            {tweet.updatedAt && (
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                Edited
              </span>
            )}
          </div>
        </div>

        {/* Edit Delete Buttons */}
        <div className="flex gap-3">
          <button onClick={() => setIsEditing(true)} className="text-blue-600 text-sm">
            Edit
          </button>
          <button onClick={deleteTweet} className="text-red-600 text-sm">
            Delete
          </button>
        </div>
      </div>

      {/* Tweet Text / Edit Box */}
      {isEditing ? (
        <div className="mt-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />

          <div className="mt-2 flex gap-2">
            <button
              onClick={updateTweet}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-lg">{tweet.tweet}</p>
      )}
    </div>
  );
}
