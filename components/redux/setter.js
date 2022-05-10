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


export function mapStateToProps(state) {
	return {
		loggedIn: state.loggedIn,
		quiz: state.quiz,
		question: state.question,
	};
}

export const mapDispatchToProps = {
	loginUser,
	logoutUser,
	setQuiz,
	setQuestion,
};