// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");

export default async function handler(req, res) {
	await dbConnect();

	const { name = null, desc = null, duration = null } = req.body;

	let result = [];
	const { id } = req.query;

	try {
		result = await Quiz.model.findOne({ _id: id });

		if (name !== null) result.name = name;
		if (desc !== null) result.desc = desc;
		if (duration !== null) result.duration = duration;

		await result.save();
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		...result._doc,
		status: "ok"
	});
}
