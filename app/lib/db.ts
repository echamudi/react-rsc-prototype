'use server';

import Database from 'better-sqlite3';
// Use node: protocol for built-in modules
import path from 'node:path';

// Determine the correct path to the database file
// process.cwd() gives the root of the Next.js project
const dbPath = path.join(process.cwd(), 'app', 'lib', 'database.db');

// Initialize the database connection
const db = new Database(dbPath);

// Function to execute SQL queries using tagged templates
// This provides a basic way to interpolate values safely, though for production
// you might want a more robust solution against SQL injection.
// Use unknown[] instead of any[] and Promise<T | undefined> instead of Promise<T | void>
export async function sql<T>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T | undefined> {
  // Return type might be undefined for non-SELECT
  let query = strings[0];
  for (let i = 0; i < values.length; i++) {
    // Use template literal for concatenation
    query += `?${strings[i + 1]}`;
  }

  const stmt = db.prepare(query.trim()); // Trim whitespace

  // Check if the query is likely a SELECT statement
  if (query.trim().toUpperCase().startsWith('SELECT')) {
    const result = stmt.all(...values);
    return result as T;
  }

  // For INSERT, UPDATE, DELETE, etc., use run()
  stmt.run(...values);
  // run() doesn't return rows, so we return undefined
  return undefined; // Explicitly return undefined
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
