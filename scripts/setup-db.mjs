import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setupDatabase() {
  const db = await open({
    filename: './app/lib/database.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS tweets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emoji TEXT NOT NULL,
            author TEXT NOT NULL,
            tweet TEXT NOT NULL, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

  const initialTweets = [
    { emoji: '😀', author: 'Alice', tweet: 'Just enjoying a sunny day!' },
    { emoji: '🎉', author: 'Bob', tweet: 'Celebrating the project launch!' },
    {
      emoji: '🚀',
      author: 'Charlie',
      tweet: 'Excited about the future of space travel!',
    },
  ];

  const insertTweet = await db.prepare(
    'INSERT INTO tweets (emoji, author, tweet) VALUES (?, ?, ?)'
  );
  for (const tweet of initialTweets) {
    await insertTweet.run(tweet.emoji, tweet.author, tweet.tweet);
  }
  await insertTweet.finalize();

  console.log('Database setup complete with initial data.');
  await db.close();
}

setupDatabase().catch((err) => {
  console.error('Error setting up the database:', err);
});
