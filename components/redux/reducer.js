const initialState = {
	loggedIn: null,
	quiz: null,
	question: null,
	questions: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "userLogin":
			return {
				...state,
				loggedIn: action.loggedIn,
			};
		case "userLogout":
			return {
				...state,
				loggedIn: null,
			};
		case "quizSet":
			return {
				...state,
				quiz: action.quiz,
			};
		case "questionSet":
			return {
				...state,
				question: action.question,
			};
		case "questionsSet":
			return {
				...state,
				questions: action.questions,
			};
		default:
			return state;
	}
};

export default reducer;