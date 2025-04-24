"use server";

import { revalidatePath } from "next/cache";
import { sql } from "./lib/db";

export async function addTweet(formData: FormData) {
	const emoji = formData.get("emoji") as string;
	const author = formData.get("author") as string;
	const tweet = formData.get("tweet") as string;

	if (!emoji || !author || !tweet) {
		// Handle error case, maybe return an error object or throw
		console.error("Missing form data for adding tweet");
		return;
	}

	try {
		await sql`
      INSERT INTO tweets (emoji, author, tweet)
      VALUES (${emoji}, ${author}, ${tweet})
    `;
		revalidatePath("/"); // Revalidate the home page cache
	} catch (error) {
		console.error("Failed to add tweet:", error);
		// Handle database error
	}
}

export async function deleteTweet(formData: FormData) {
	const id = formData.get("id") as string;

	if (!id) {
		console.error("Missing tweet ID for deletion");
		return;
	}

	try {
		await sql`
      DELETE FROM tweets WHERE id = ${id}
    `;
		revalidatePath("/"); // Revalidate the home page cache
	} catch (error) {
		console.error("Failed to delete tweet:", error);
		// Handle database error
	}
}
