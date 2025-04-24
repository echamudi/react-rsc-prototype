import Tweets from "./components/Tweets.server";
import { Counter } from "./components/Counter.client";
import { addTweet } from "./actions"; // Import the server action

export default function HomePage() {
  return (
    <main>
      <h1>Server Emoji Tweets</h1>

      {/* Add Tweet Form */}
      <h2>Add New Tweet</h2>
      <form action={addTweet} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
        <div>
          <label htmlFor="emoji" style={{ marginRight: '5px' }}>Emoji:</label>
          <input type="text" id="emoji" name="emoji" required maxLength={2} style={{ marginRight: '10px', padding: '5px' }} />
          <label htmlFor="author" style={{ marginRight: '5px' }}>Author:</label>
          <input type="text" id="author" name="author" required style={{ marginRight: '10px', padding: '5px' }} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="tweet" style={{ marginRight: '5px' }}>Tweet:</label>
          <textarea id="tweet" name="tweet" required style={{ width: '80%', padding: '5px', minHeight: '50px', verticalAlign: 'top' }}></textarea>
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer' }}>Add Tweet</button>
      </form>

      <Tweets />

      <h1>Client Counter</h1>
      <Counter initial={42} />
    </main>
  );
}

// Add a runtime export to ensure the page is treated as dynamic
// if server actions modify data it displays.
export const runtime = 'nodejs'; // Changed from 'edge' to 'nodejs'