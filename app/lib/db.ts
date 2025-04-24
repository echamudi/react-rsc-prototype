'use server';

import Database from 'better-sqlite3';
import path from 'path';

// Determine the correct path to the database file
// process.cwd() gives the root of the Next.js project
const dbPath = path.join(process.cwd(), 'app', 'lib', 'database.db');

// Initialize the database connection
const db = new Database(dbPath);

// Function to execute SQL queries using tagged templates
// This provides a basic way to interpolate values safely, though for production
// you might want a more robust solution against SQL injection.
export async function sql<T>(strings: TemplateStringsArray, ...values: any[]): Promise<T | void> { // Return type might be void for non-SELECT
  let query = strings[0];
  for (let i = 0; i < values.length; i++) {
    query += '?' + strings[i + 1];
  }

  const stmt = db.prepare(query.trim()); // Trim whitespace

  // Check if the query is likely a SELECT statement
  if (query.trim().toUpperCase().startsWith('SELECT')) {
    const result = stmt.all(...values);
    return result as T;
  } else {
    // For INSERT, UPDATE, DELETE, etc., use run()
    stmt.run(...values);
    // run() doesn't return rows, so we might return void or some status
    return; // Adjust return type/value as needed for your application logic
  }
}

// Optional: Export the db instance if needed elsewhere
// export { db };

export interface Tweet {
    id: number;
    emoji: string;
    author: string;
    tweet: string; // Add tweet property
    created_at: string;
}
