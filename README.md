# React Server Components

This simple repo demonstrates the use of React Server Components to build a simple application that displays basic tweets and includes a counter for interactivity. The application leverages server-side data fetching and client-side interactivity without the need for traditional REST API endpoints.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url> .
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Set Up the Database**
   Run the setup script to create the SQLite database and seed it with initial data:
   ```bash
   node scripts/setup-db.mjs
   ```

4. **Run the Application**
   Start the development server:
   ```bash
   yarn dev
   ```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Application Overview

- **Emoji Tweets**: The `Tweets` server component fetches emoji tweets from the database and displays them in a list format.
- **Counter**: The `Counter` client component allows users to increment a count by clicking a button.

This project showcases the potential of React Server Components to simplify data fetching and rendering, reducing the need for traditional API routes and enhancing the overall development experience.
