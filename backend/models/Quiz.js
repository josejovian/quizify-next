const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
	name: String,
	desc: String,
	duration: Number,
});

module.exports = {
	schema: quizSchema,
	model: mongoose.models.Quiz || mongoose.model("Quiz", quizSchema),
};
