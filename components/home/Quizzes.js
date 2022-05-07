import clsx from "clsx";
import { MdPerson, MdAccessTimeFilled, MdQuestionAnswer } from "react-icons/md";
import Button from "../generic/Button";

const Props = ({ children }) => {
	return (
		<div className="flex flex-row items-center w-max subtle mr-4">
			{ children }
		</div>
	);
};

const Quiz = ({ quiz }) => {
	return (
		<div className="p-4 bg-gray-100 rounded-sm hover:shadow-md hover:bg-gray-200 transition-colors">
			<h2>{quiz.name}</h2>
			<p>{quiz.desc}</p>
			<hr className="mt-4" />
			<div className="flex justify-between flex-col md:flex-row mt-4">
				<div className="flex overflow-x-auto">
					<Props>
						<MdPerson className="mr-2" />
						<span>{ quiz.author.username }</span>
					</Props>
					<Props>
						<MdQuestionAnswer className="mr-2" />
						<span>{ quiz.questions.length }&nbsp;questions</span>
					</Props>
					<Props>
						<MdAccessTimeFilled className="mr-2" />
						<span>{ quiz.duration }&nbsp;minutes</span>
					</Props>
				</div>
				<Button className="mt-4 md:mt-0">Do Quiz</Button>
			</div>
		</div>
	);
};

const Quizzes = ({ quizzes }) => {
	const quizElements = quizzes.map((quiz) => {
		return <Quiz key={quiz._id} quiz={quiz} />;
	});

	return (
		<div className="pt-32">
			<h1 className="text-center">All Quizzes</h1>
			<div
				className={clsx(
					"w-screen px-8 lg:px-32 py-16",
					"grid gap-4 grid-cols-1 xl:grid-cols-2"
				)}
			>
				{quizElements}
			</div>
		</div>
	);
};

export default Quizzes;
