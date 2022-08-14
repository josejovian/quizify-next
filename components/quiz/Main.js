import clsx from "clsx";
import { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../generic/Card";
import Question from "./Question";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Main = ({
	purpose,

	/* Redux / Edit */
	questions,
	setQuestions,
	setQuestion,
	quiz,
	setQuiz,

	/* Solve */
	sheet,
	setSheet,
	answer,
}) => {
	return [
		quiz && (
			<main
				key="quiz"
				className={clsx(
					"lg:absolute lg:w-main right-0 p-8 lg:p-16"
				)}
			>
				{questions &&
					Object.entries(questions).map(([_id, question], index) => {
						return (
							<Question
								key={question._id}
								index={index + 1}
								onClick={() => setQuestion(question._id)}
								setQuestion={setQuestion}
								quiz={quiz}
								setQuiz={setQuiz}
								_question={question}
								purpose={purpose}
								sheet={sheet}
								setSheet={setSheet}
								answer={answer}
							/>
						);
					})}
			</main>
		),
		!quiz && [<div key="no-quiz"></div>],
	];
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
