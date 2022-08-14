const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	start: Number,
	end: Number,
	sheet: Object,
	score: Number,
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz'
	},
}, { timestamps: true });

module.exports = {
	schema: answerSchema,
	model: mongoose.models.Answer || mongoose.model("Answer", answerSchema),
};
