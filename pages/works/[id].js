import clsx from "clsx";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../../components/redux/setter";
import api, { submitQuizAnswers } from "../../components/API";
import Works from "../../components/works/Works";
import Footer from "../../components/page/Footer";

const ViewWork = ({
	queryResult,
}) => {
	return (
		<div className={clsx("quiz-port", "absolute top-0 pt-14")}>
			<Works works={queryResult.answers.answers} author={queryResult.author} />
			<Footer />
		</div>
	)
};

export const getServerSideProps = async (req) => {
	let answers, result, author;

	try {
		answers = await api.get(`/api/answer/author/${req.query.id}`);
		answers = answers.data;
		
		author = await api.get(`/api/account/${req.query.id}`);
		author = author.data;

		result = { status: "ok" };
	} catch (e) {
		result = { status: "fail" };
	}

	return {
		props: { queryResult: { answers: answers, author: author, result: result } },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewWork);
