import fs from "fs/promises";
import path from "path";

export async function POST(req) {
	const body = await req.json();

	const usersPath = path.join(process.cwd(), "public", "users.json");

	let users = [];
	const usersData = await fs.readFile(usersPath, "utf-8");
	users = JSON.parse(usersData);

	for (let item of users) {
		if (item.password == body.password && item.email == body.email) {
			return Response.json({ succes: true, user: item });
		}
	}

	return Response.json({ succes: false });
}
