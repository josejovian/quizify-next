// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const User = require("/backend/models/User");
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
	await dbConnect();

	let result = { status: "fail" };

	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ status: "fail_incomplete" });
		return;
	}

	let user;
	try {
		user = await User.model.findOne({ email: email });
	} catch(e) {
		res.status(500).json({ status: "fail" });
		return;
	}
	
	if (!user) {
		res.status(200).json({ status: "fail_not_found" });
		return;
	}

	result = user._doc;

	let promise = new Promise((resolve, reject) => {
		/*
			Source:
			https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
		*/
		bcrypt.compare(
			password,
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

	try {
		result = await promise;
	} catch(e) {
		res.status(500).json({ status: "fail" });
		return;
	}
	
	res.status(200).json(result);
}
