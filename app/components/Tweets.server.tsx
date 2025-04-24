import { sql } from "../lib/db";
import { deleteTweet } from "../actions"; // Import the server action

type Tweet = { id: number; emoji: string; author: string; tweet: string };

export default async function Tweets() {
	const rows: Tweet[] =
		(await sql<Tweet[]>`
    SELECT id, emoji, author, tweet FROM tweets ORDER BY created_at DESC
  `) || [];

	return (
		<ul>
			{rows.map((t) => (
				<li
					key={t.id}
					style={{
						marginBottom: "1rem",
						borderBottom: "1px solid #eee",
						paddingBottom: "0.5rem",
					}}
				>
					<span>{t.emoji}</span> by <em>{t.author}</em>
					<p className="text-gray-700">{t.tweet}</p>
					{/* Delete Form */}
					<form
						action={deleteTweet}
						style={{ display: "inline-block", marginLeft: "10px" }}
					>
						<input type="hidden" name="id" value={t.id} />
						<button
							type="submit"
							style={{
								background: "red",
								color: "white",
								border: "none",
								padding: "2px 5px",
								cursor: "pointer",
								borderRadius: "3px",
							}}
						>
							Delete
						</button>
					</form>
				</li>
			))}
		</ul>
	);
}
