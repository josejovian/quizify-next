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

const Review = ({ setQuiz, setQuestions, setChanges, queryResult }) => {
	useEffect(() => {
		reduxifyQuestions(queryResult, setQuiz, setQuestions);
	}, [queryResult]);

	useEffect(() => {
		setChanges([]);
	}, []);

	return (
		<div className={clsx("quiz-port", "absolute top-0 pt-14")}>
			<Side
				purpose="review"
				answer={queryResult.answer}
				owner={queryResult.owner}
			/>
			<Main purpose="review" answer={queryResult.answer} />
		</div>
	);
};

export const getServerSideProps = async (req) => {
	let data = await api.get(`/api/answer/${req.query.id}`);
	data = data.data.answer;
	console.log(data);

	let quiz = await api.get(`/api/quiz/${data.quiz}`);
	quiz = quiz.data[0];

	let owner = await api.get(`/api/account/${data.author}`);
	owner = owner.data;

	return {
		props: {
			queryResult: {
				answer: data,
				owner: owner,
				quiz: quiz,
			},
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
