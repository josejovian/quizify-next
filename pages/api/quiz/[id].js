import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");
const User = require("/backend/models/User");

export default async function handler(req, res) {
	await dbConnect();

	let result = [];

	try {
		result = await Quiz.model.find({_id: req.query.id});
	} catch (e) {
		res.status(500).json({ status: "fail" });
		return;
	}

	res.status(200).json(result);
}
