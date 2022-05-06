const Quiz = ({ quiz }) => {
	return (
		<div className="">
			{ quiz.name }
		</div>
	);
}

const Quizzes = ({ quizzes }) => {

	console.log(quizzes);

	const quizElements = quizzes.map((quiz) => {
		return (
			<Quiz key={quiz._id} quiz={quiz} /> 
		);
	});

	return (
		<div className="pt-32">
			<h1>All Quizzes</h1>
			{ quizElements }
		</div>
	);
};

export default Quizzes;
