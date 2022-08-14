import clsx from "clsx";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../../components/redux/setter";
import api from "../../components/API";
import Quizzes from "../../components/home/Quizzes";
import Footer from "../../components/page/Footer";

const Solve = ({ queryResult }) => {
	return (
		<div className={clsx("quiz-port", "absolute top-0 pt-14")}>
			<Quizzes
				quizzes={queryResult.quizzes}
				title={`${queryResult.author.username}'s Quizzes`}
				author={queryResult.author}
			/>
			<Footer />
		</div>
	);
};

export const getServerSideProps = async (req) => {
	let quizzes, result, author;

	try {
		quizzes = await api.get(`/api/quiz/author/${req.query.id}`);
		quizzes = quizzes.data;

		author = await api.get(`/api/account/${req.query.id}`);
		author = author.data;
		console.log(author);

		result = { status: "ok" };
	} catch (e) {
		result = { status: "fail" };
	}

	return {
		props: {
			queryResult: {
				quizzes: quizzes.quizzes,
				author: author,
				result: result,
			},
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Solve);
