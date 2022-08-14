// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Answer = require("/backend/models/Answer");
const Quiz = require("/backend/models/Quiz");
const User = require("/backend/models/User");

export default async function handler(req, res) {
	await dbConnect();

	let answers;
	const { id } = req.query;

	try {
		answers = await Answer.model.find({ author: id }).populate("quiz author");
		console.log(answers);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		answers: answers,
		status: "ok"
	});
}
