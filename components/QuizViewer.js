export function reduxifyQuestions(queryResult, setQuiz, setQuestions) {
	if (queryResult.quiz) {
		let dictionary = {};
		queryResult.quiz.questions.forEach((question) => {
			dictionary[question._id] = question;
		});

		setQuiz({
			...queryResult.quiz,
			questions: null,
		});

		setQuestions(dictionary);
	}
}
