
import TweetItem from './TweetItem';

export default function TweetList({ tweets, onTweetChange }) {
  return (
    <div>
      {tweets.map(tweet => (
        <TweetItem key={tweet.id} tweet={tweet} onChange={onTweetChange} />
      ))}
    </div>
  );
}