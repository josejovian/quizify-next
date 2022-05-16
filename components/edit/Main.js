import clsx from "clsx";
import { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../generic/Card";
import Question from "../quiz/Question";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Main = ({ questions, setQuestions, setQuestion, quiz }) => {
	return ([
		quiz && (
			<div key="quiz" className={clsx("absolute right-0 w-4/6 p-16")}>
				<h1>{quiz.name}</h1>
				<p>{quiz.desc}</p>
				<hr className="my-8" />
				{questions && 
					Object.entries(questions).map(([_id, question], index) => {
						return (
							<Question
								key={question._id}
								index={index + 1}
								onClick={() => setQuestion(question._id)}
								{...question}
							/>
						);
					})
				}
			</div>
		),
		!quiz && [
			<div key="no-quiz">
			</div>
		]
	]);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
