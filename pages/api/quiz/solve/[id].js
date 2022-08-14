// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Answer = require("/backend/models/Answer");

export default async function handler(req, res) {
	await dbConnect();

	const { start = null, end = null, sheet = null, quiz = null, author = null, score = null } = req.body;

	let answer;

	try {
		answer = new Answer.model({
			start: start,
			end: end,
			sheet: sheet,
			quiz: quiz,
			author: author,
			score: score,
		});

		await answer.save();
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		...answer._doc,
		status: "ok"
	});
}
