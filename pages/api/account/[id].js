// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const User = require("/backend/models/User");

export default async function handler(req, res) {
	await dbConnect();

	let result;
	const { id } = req.query;

	try {
		result = await User.model.findOne(
			{ _id: id },
			{ _id: 0, __v: 0, password: 0 }
		);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		...result._doc,
		status: "ok",
	});
}
