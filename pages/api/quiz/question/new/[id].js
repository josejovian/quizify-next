// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const Question = require("/backend/models/Question");

export default async function handler(req, res) {
	await dbConnect();

	let result = [], question;
	const { id } = req.query;

	try {
		result = await Quiz.model.findOne({ _id: id });

		question = new Question.model({
			title: "New Question",
			type: 0,
			choices: ["Choice 1", "Choice 2"],
			correct: ["Answer", 0],
			points: 10,
		});

		await question.save();

		result.questions = [...result.questions, question._id];

		await result.save();
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json({
		...question._doc,
		status: "ok"
	});
}
