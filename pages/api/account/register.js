// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const User = require("/backend/models/User");

export default async function handler(req, res) {
	await dbConnect();

	let result = { status: "fail" };

	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		res.status(400).json({ status: "fail_incomplete" });
		return;
	}

	try {
		const user = new User.model({
			email: email,
			username: username,
			password: password,
		});
		await user.save();

		result = user._doc;
		result = { ...result, status: "ok" };
	} catch (e) {
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json(result);
}
