export function loginUser(loggedIn) {
	return {
		type: "userLogin",
		loggedIn: loggedIn
	};
}

export function logoutUser() {
	return {
		type: "userLogout",
		loggedIn: null
	};
}

export function setQuiz(quiz) {
	return {
		type: "quizSet",
		quiz: quiz
	};
}

export function setQuestion(question) {
	return {
		type: "questionSet",
		question: question
	};
}

export function setQuestions(questions) {
	return {
		type: "questionsSet",
		questions: questions
	};
}

export function setChanges(changes) {
	return {
		type: "changesSet",
		changes: changes
	};
}

export function mapStateToProps(state) {
	return {
		loggedIn: state.loggedIn,
		quiz: state.quiz,
		question: state.question,
		questions: state.questions,
		changes: state.changes,
	};
}

export const mapDispatchToProps = {
	loginUser,
	logoutUser,
	setQuiz,
	setQuestion,
	setQuestions,
	setChanges,
};