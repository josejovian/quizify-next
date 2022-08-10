import clsx from "clsx";
import { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../generic/Card";
import Question from "../quiz/Question";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Main = ({ questions, setQuestions, setQuestion, quiz, purpose }) => {
	return [
		quiz && (
			<main
				key="quiz"
				className={clsx("absolute right-0 p-16")}
				id="quiz-main"
			>
				{questions &&
					Object.entries(questions).map(([_id, question], index) => {
						return (
							<Question
								key={question._id}
								index={index + 1}
								onClick={() => setQuestion(question._id)}
								setQuestion={setQuestion}
								_question={question}
								purpose={purpose}
							/>
						);
					})}
			</main>
		),
		!quiz && [<div key="no-quiz"></div>],
	];
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
