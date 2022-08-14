// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const Question = require("/backend/models/Question");

export default async function handler(req, res) {
	await dbConnect();

	let result = null;

	const { author = null } = req.body;

	try {
		result = new Quiz.model({
			name: "New Quiz",
			desc: "Quiz Description",
			author: author,
			duration: 60,
			questions: [],
			isPublic: true,
		});

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
