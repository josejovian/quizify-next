import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const User = require("/backend/models/User");
const Question = require("/backend/models/Question");

export default async function handler(req, res) {
	await dbConnect();

	let result = [];

	

	try {
		const quiz = await Quiz.model.find({_id: "627640e9e7ce15014e8dfa52"});

		const questions = [{
			quiz: quiz._id,
			title: "<p>Let f(x) = |x<sup>-1</sup>|. What is the limit of the function f as x approaches infinity?</p>",
			type: 0,
			choices: [],
			correct: "0",
			points: 10,
		}, {
			quiz: quiz._id,
			title: "<img href='https://drive.google.com/uc?id=1u9-dYDNKRs5PQbK9xCjAac380iRSLMDw'/> What would be the type of this discontiunity?",
			type: 0,
			choices: [],
			correct: "REMOVABLE",
			ignoreCase: true,
			points: 10,
		}, {
			quiz: quiz._id,
			title: "<img href='https://drive.google.com/uc?id=168FYB1QW6ku0npjvr_4IMKYXiQETHhOR'/> Consider h(x) when x = -1. What type of discontuinity is this?",
			type: 0,
			choices: [],
			correct: "JUMP",
			ignoreCase: true,
			points: 10,
		}];

		for(const question of questions) {
			const q = new Question.model(question);
			await q.save();
		}

		result = {questions, status: "ok"};
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: e });
		return;
	}

	res.status(200).json(result);
}
