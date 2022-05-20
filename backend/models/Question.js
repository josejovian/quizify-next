const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz'
	},
	title: String,
	thumbnail: String,
	type: Number,
	points: Number,
	correct: [ String ],

	/* Multiple Choice */
	choices: [ Object ],

	/* Short Answer */
	ignoreCase: Boolean,
});

module.exports = {
	schema: questionSchema,
	model: mongoose.models.Question || mongoose.model("Question", questionSchema),
};
