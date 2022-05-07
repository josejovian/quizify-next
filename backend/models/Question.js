const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz'
	},
	title: String,
	type: String,
	choices: [ Object ],
	correct: String,
	duration: Number,
	points: Number,
});

module.exports = {
	schema: questionSchema,
	model: mongoose.models.Question || mongoose.model("Question", questionSchema),
};
