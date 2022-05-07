const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
	name: String,
	desc: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	duration: Number,
	questions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	}],
	isPublic: false,
}, { timestamps: true });

module.exports = {
	schema: quizSchema,
	model: mongoose.models.Quiz || mongoose.model("Quiz", quizSchema),
};
