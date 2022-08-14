export function alternate(mode, arg1, arg2, arg3) {
	if(mode === "edit")
		return arg1;
	if(mode === "solve")
		return arg2;
	if(mode === "review")
		return arg3;
}

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

export function verifyAnswer(mode, arg1, arg2) {
	switch(mode) {
		case 0:
			return arg1 === arg2;
		case 1:
			return parseInt(arg1) === parseInt(arg2);
	}
}