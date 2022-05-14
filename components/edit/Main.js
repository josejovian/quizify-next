import clsx from "clsx";
import { connect } from "react-redux";
import Card from "../generic/Card";
import Question from "../quiz/Question";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Main = ({ setQuestion, name, desc, questions=[] }) => {
	return (
		<div className={clsx("w-4/6 p-16")}>
			<h1>{name}</h1>
			<p>{desc}</p>
			<hr className="my-8" />
			{questions.map((question, index) => (
				<Question key={question._id} index={index + 1} onClick={() => setQuestion(question._id)} {...question} />
			))}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
