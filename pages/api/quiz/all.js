import dbConnect from "/backend/dbConnect";
const Quiz = require("/backend/models/Quiz");

export default async function handler(req, res) {
	await dbConnect();

	let result = [];

	try {
		result = await Quiz.model.find();
	} catch (e) {}

	res.status(200).json(result);
}
