import clsx from "clsx";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../../components/redux/setter";
import api from "../../components/API";
import Side from "../../components/quiz/Side";
import Main from "../../components/quiz/Main";
import { reduxifyQuestions } from "../../components/quiz/QuizViewer";
import Message from "../../components/generic/Message";

const Edit = ({
	questions,
	quiz,
	setQuiz,
	setQuestions,
	setChanges,
	loggedIn,
	queryResult,
}) => {
	useEffect(() => {
		reduxifyQuestions(queryResult, setQuiz, setQuestions);
	}, [queryResult]);

	useEffect(() => {
		setChanges([]);
	}, []);

	return (quiz && quiz.author === loggedIn._id) ? (
		<div className={clsx("quiz-port", "absolute top-0 pt-14")}>
			<Side purpose="edit" />
			<Main purpose="edit" />
		</div>
	) : (
		<Message>
			You do not have permission to edit this quiz.
		</Message>
	);
};

export const getServerSideProps = async (req) => {
	let result,
		quiz = null;

	try {
		quiz = await api.get(`/api/quiz/${req.query.id}`);
		quiz = quiz.data[0];

		result = { status: "ok" };
	} catch (e) {
		result = { status: "fail" };
	}

	return {
		props: { queryResult: { quiz: quiz, result: result } },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
