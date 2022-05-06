// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const User = require("/backend/models/User");
const bcrypt = require("bcryptjs");

const genericFail = { status: "fail" };

export default async function handler(req, res) {
	await dbConnect();

	const route = req.body.route;

	let result = {
		status: "fail",
	};

	switch (route) {
		case "register":
			result = await register({
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
			});
			break;
		case "login":
			result = await login({
				email: req.body.email,
				password: req.body.password,
			});
			break;
		default:
			result = {
				status: "ok",
			};
	}

	res.status(200).json(result);
}

async function register(data) {
	try {
		const user = new User.model(data);
		await user.save();

		let result = user._doc;
		result = { ...result, status: "ok" };
		return result;
	} catch (e) {
		return genericFail;
	}
}

async function login(data) {
	try {
		let result = await User.model.findOne({ email: data.email });

		if (!result) {
			console.log("Not Found");
			return { status: "fail_not_found" };
		}

		result = result._doc;

		let promise = new Promise((resolve, reject) => {
			/*
				Source:
				https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
			*/
			bcrypt.compare(
				data.password,
				result.password,
				async function (error, isMatch) {
					if (error) {
						console.log("ERROR");
						reject(error);
					} else if (!isMatch) {
						console.log("Doesn't Match");
						resolve({ ...result, status: "fail_mismatch" });
					} else {
						console.log("OK");
						resolve({ ...result, status: "ok" });
					}
				}
			);
		});

		return await promise;
	} catch (e) {
		console.log(e);
		return genericFail;
	}
}