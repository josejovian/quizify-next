import axios from "axios";

const baseURL = process.env.BASE_URL;

const api = axios.create({
	baseURL
});

export async function register({ email, username, password }) {
	let result = await api.post("/api/account/register", {
		route: "register",
		email: email,
		username: username,
		password: password,
	});

	if(result.status === 200 && result.data.status === "ok") {
		console.log("Register successful.");
	} else {
		console.log("Register failed.");
	}

	return result.data;
}

export async function login({ email, password }) {
	let result = await api.post("/api/account/login", {
		route: "login",
		email: email,
		password: password,
	});

	switch (result.data.status) {
		case "ok":
			console.log("Login successful.");
			break;
		case "fail_mismatch":
			console.log("Incorrect password.");
			break;
		case "fail_not_found":
			console.log("User does not exist.");
			break;
		default:
			console.log("Login failed.");
			break;
	}

	return result.data;
}

export default api;
