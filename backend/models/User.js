const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
});

module.exports = {
	schema: userSchema,
	model: mongoose.models.User || mongoose.model("User", userSchema),
};