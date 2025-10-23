import fs from "fs/promises";
import path from "path";

export async function POST(req) {
	const body = await req.json();

	const usersPath = path.join(process.cwd(), "public", "users.json");

	let users = [];
	const usersData = await fs.readFile(usersPath, "utf-8");
	users = JSON.parse(usersData);
	const newUser = {
		...body,
		role: 1,
		property: [],
		selected: []
	};

	users.push(newUser);

	await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

	return Response.json({
		success: true,
		user: newUser
	});
}
