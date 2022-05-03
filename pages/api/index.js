// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "/backend/dbConnect";
const User = require("/backend/models/User");

const genericFail = { status: "fail"};

export default async function handler(req, res) {
	await dbConnect();

	const route = req.body.route;

	let result = {};

	console.log(req.body);

	switch (route) {
		case "register":
			result = await register({
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
			});
			break;
		case "login":
			result = await login({ email: req.body.email, password: req.body.password });
			break;
	}

	res.status(200).json(result);
}

async function register(data) {
	try {
		const user = new User.model(data);
		await user.save();

		let result = {...user, status: "ok"};
		return result;
	} catch(e) {
		return genericFail;
	}
}

async function login(data) {
	try {
		let result = await User.model.findOne({ email: data.email });

		if(!result) {
			console.log("Not Found");
			return { status: "fail_not_found" };
		}

		result = result._doc;

		if(result.password === data.password) {
			result = { ...result, status: "ok" };
		} else {
			result = { ...result, status: "fail_mismatch" };
		}
		console.log(result);
	
		return result;
	} catch(e) {
		console.log(e);
		return genericFail;
	}
}
