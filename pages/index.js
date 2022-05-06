import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../components/redux/setter";
import api from "../components/api";
import Landing from "../components/home/Landing";
import Quizzes from "../components/home/Quizzes";

const Home = ({ loggedIn, queryResult }) => {
	const { quizzes, result } = queryResult;

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
			{loggedIn ? <Quizzes quizzes={quizzes} /> : <Landing />}
		</div>
	);
};

export const getStaticProps = async () => {
	let result = {},
		quizzes = [];

	try {
		quizzes = await api.get("/api/quiz/all");
		quizzes = quizzes.data;
		console.log(quizzes);
		result = { status: "ok" };
	} catch (e) {
		console.log(e);
		result = { status: "fail" };
	}

	return {
		props: { queryResult: { quizzes: quizzes, result: result } },
		revalidate: 20,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
