const initialState = {
	loggedIn: null,
	quiz: null,
	question: null,
	questions: null,
	changes: [],
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
		case "changesSet":
			return {
				...state,
				changes: action.changes,
			};
		default:
			return state;
	}
};

export default reducer;