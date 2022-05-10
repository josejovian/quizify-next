const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz'
	},
	title: String,
	type: Number,
	choices: [ Object ],
	ignoreCase: Boolean,
	correct: String,
	points: Number,
});

module.exports = {
	schema: questionSchema,
	model: mongoose.models.Question || mongoose.model("Question", questionSchema),
};
