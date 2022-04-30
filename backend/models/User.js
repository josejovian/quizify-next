import { Schema, model } from "mongoose";

const userSchema = new Schema({
	email: String,
	username: String,
	password: String,
});

module.exports = {
	schema: userSchema,
	model: model("User", userSchema),
};