// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ObjectId } from "mongodb";
import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const Question = require("/backend/models/Question");

export default async function handler(req, res) {
	await dbConnect();

	const { questions = null, updatedQuestions = {}, updatedIDs = [] } = req.body;

	let result = [];
	const { id } = req.query;

	try {
		result = await Quiz.model.findOne({ _id: id });

		let i = 0;
		for (const updatedID of updatedIDs) {
			let question = await Question.model.findOne({ _id: updatedID});
		
			const _clone = updatedQuestions[updatedID];

			if(!_clone) {
				await Question.model.deleteOne({ _id: updatedID });
				result.questions = result.questions.filter((x) => x.toString() !== updatedID);
				console.log("Removed " + updatedID);
				continue;
			}

			delete _clone._id;
			delete _clone.__v;
			
			for(const [key, value] of Object.entries(_clone)) {
				question[key] = value;
			}
			console.log(question);
			await question.save();
	
			i++;
		}

		console.log(result.questions);

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
