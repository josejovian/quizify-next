import clsx from "clsx";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../components/redux/setter";
import api from "../components/api";
import Landing from "../components/home/Landing";
import Quizzes from "../components/home/Quizzes";
import { DataContext } from "./_app";

const Home = ({ loggedIn, queryResult }) => {
	const { quizzes, result } = queryResult;
	const { data, setData } = useContext(DataContext);

	useEffect(() => {
		let _users = {}, _emails = {};
		queryResult["users"].forEach((user) => {
			_users[user.username] = 1;
			_emails[user.email] = 1;
		});
		setData({
			users: _users,
			emails: _emails,
		});
	}, []);

	useEffect(() => {
		console.log(quizzes);
	}, [queryResult]);

	return (
		<div
			className={clsx(
				"absolute top-0 w-screen h-screen",
				"flex justify-center"
			)}
		>
			{loggedIn ? (
				<Quizzes
					quizzes={quizzes.filter(
						(quiz) =>
							quiz.isPublic ||
							(!quiz.isPublic && quiz.author._id === loggedIn._id)
					)}
				/>
			) : (
				<Landing />
			)}
		</div>
	);
};

export const getStaticProps = async () => {
	let result = {},
		quizzes = [],
		users = [];
	try {
		quizzes = await api.get("/api/quiz/all");
		quizzes = quizzes.data;

		users = await api.get("api/account/all");
		users = users.data;

		console.log(users);
		result = { status: "ok" };
	} catch (e) {
		console.log(e);
		result = { status: "fail" };
	}

	return {
		props: { queryResult: { users: users, quizzes: quizzes, result: result } },
		revalidate: 20,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
