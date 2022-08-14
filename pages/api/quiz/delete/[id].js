// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const Question = require("/backend/models/Question");

export default async function handler(req, res) {
	await dbConnect();

	let result;

	try {
		result = await Quiz.model.findOne({ _id: req.query.id });
		for (const key of result.questions) {
			await Question.model.deleteOne({ _id: key });
		}
		await Quiz.model.deleteOne({ _id: req.query.id });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		status: "ok",
	});
}
