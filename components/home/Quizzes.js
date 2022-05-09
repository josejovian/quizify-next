import clsx from "clsx";
import Link from "next/link";
import { MdPerson, MdAccessTimeFilled, MdQuestionAnswer } from "react-icons/md";
import { connect } from "react-redux";
import Button from "../generic/Button";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Props = ({ children }) => {
	return (
		<div className="flex flex-row items-center w-max subtle mr-4">
			{children}
		</div>
	);
};
const Quiz = ({ quiz, isOwner }) => {
	const bigScreenStyle = "hidden md:flex",
		smallScreenStyle = "flex md:hidden";
	const quizSpecialActionStyle = "mt-2 sm:ml-2 sm:mt-0";

	return (
		<div className="p-4 bg-gray-100 rounded-sm hover:shadow-md hover:bg-gray-200 transition-colors">
			<h2>{quiz.name}</h2>
			<p>{quiz.desc}</p>
			<hr className="mt-4" />
			<div className="flex justify-between flex-col md:flex-row mt-4">
				<div className="flex overflow-x-auto">
					<Props>
						<MdPerson className="mr-2" />
						<span>{quiz.author.username}</span>
					</Props>
					<Props>
						<MdQuestionAnswer className="mr-2" />
						<span className={bigScreenStyle}>
							{quiz.questions.length}&nbsp;questions
						</span>
						<span className={smallScreenStyle}>
							{quiz.questions.length}&nbsp;q
						</span>
					</Props>
					<Props>
						<MdAccessTimeFilled className="mr-2" />
						<span className={bigScreenStyle}>
							{quiz.duration}&nbsp;minutes
						</span>
						<span className={smallScreenStyle}>
							{quiz.duration}&nbsp;min
						</span>
					</Props>
				</div>
				<div className="flex flex-col sm:flex-row mt-4 md:mt-0">
					<Button>Solve</Button>
					{isOwner && (
						<>
							<Link href={`/edit/${quiz._id}`}>
								<a>
									<Button
										className={quizSpecialActionStyle}
										variant="secondary"
									>
										Edit
									</Button>
								</a>
							</Link>
							<Button
								className={quizSpecialActionStyle}
								variant="danger"
							>
								Delete
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const Quizzes = ({ quizzes, loggedIn }) => {
	const quizElements = quizzes.map((quiz) => {
		return (
			<Quiz
				key={quiz._id}
				quiz={quiz}
				isOwner={quiz.author.username === loggedIn.username}
			/>
		);
	});

	return (
		<div className="pt-16">
			<h1 className="text-center">All Quizzes</h1>
			<div
				className={clsx(
					"w-screen px-8 lg:px-32 py-16",
					"grid gap-4 grid-cols-1 2xl:grid-cols-2"
				)}
			>
				{quizElements}
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes);
