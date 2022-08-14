// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const User = require("/backend/models/User");

export default async function handler(req, res) {
	await dbConnect();

	let quizzes;
	const { id } = req.query;

	try {
		quizzes = await Quiz.model.find({ author: id }).populate("author");
		console.log(quizzes);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		quizzes: quizzes,
		status: "ok"
	});
}
