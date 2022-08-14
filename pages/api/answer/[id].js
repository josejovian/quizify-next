// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Answer = require("/backend/models/Answer");
const Quiz = require("/backend/models/Quiz");

export default async function handler(req, res) {
	await dbConnect();

	let answer, quiz;
	const { id } = req.query;

	try {
		answer = await Answer.model.findOne({ _id: id });
	} catch (e) {
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		answer: answer,
		status: "ok"
	});
}
