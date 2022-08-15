import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdPerson, MdAccessTimeFilled, MdQuestionAnswer } from "react-icons/md";
import { connect } from "react-redux";
import { createQuiz, deleteQuiz } from "../API";
import Button from "../generic/Button";
import Card from "../generic/Card";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

export const Props = ({ children }) => {
	return (
		<div className="flex flex-row items-center w-max subtle mr-4">
			{children}
		</div>
	);
};

export const Quiz = ({ quiz, isOwner }) => {
	const bigScreenStyle = "hidden md:flex",
		smallScreenStyle = "flex md:hidden";
	const quizSpecialActionStyle = "w-full md:w-auto mt-2 sm:mt-0";

	async function _deleteQuiz() {
		await deleteQuiz(quiz._id)
			.then(() => {
				location.reload();
			})
			.catch((e) => {});
	}

	return (
		<Card>
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
				<div className={clsx("flex flex-row mt-4 md:mt-0 gap-2")} >
					<Link href={quiz.questions.length ? `/solve/${quiz._id}` : "#"}>
						<a className="w-full">
							<Button className={quizSpecialActionStyle} disabled={quiz.questions.length === 0}>
								Solve
							</Button>
						</a>
					</Link>
					{isOwner && (
						<>
							<Link href={`/edit/${quiz._id}`}>
								<a className="w-full">
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
								onClick={() => _deleteQuiz()}
							>
								Delete
							</Button>
						</>
					)}
				</div>
			</div>
		</Card>
	);
};

export const Quizzes = ({
	title = "All Quizzes",
	quizzes,
	loggedIn,
	author = null,
}) => {
	const [working, setWorking] = useState(false);

	const router = useRouter();

	const quizElements = quizzes.map((quiz) => {
		return (
			<Quiz
				key={quiz._id}
				quiz={quiz}
				isOwner={quiz.author.username === loggedIn.username}
			/>
		);
	});

	async function newQuiz() {
		if (working) return;

		setWorking(true);
		await createQuiz(loggedIn._id).then((res) => {
			setWorking(false);
			router.push(`/edit/${res._id}`);
		});
	}

	return (
		<div className="quiz-port pt-16 overflow-x-hidden">
			<h1 className="text-center">{title}</h1>
			{quizzes.length > 0 ? (
				<div
					className={clsx(
						"quiz-port px-8 lg:px-32 py-16",
						"grid gap-4 grid-cols-1 2xl:grid-cols-2"
					)}
				>
					{quizElements}
					{loggedIn &&
						author &&
						loggedIn.username === author.username && (
							<Card
								className={clsx(
									"flex flex-col justify-center items-center cursor-pointer",
									quizzes.length >= 5 && "hidden",
									working && "opacity-70"
								)}
								onClick={
									quizzes.length < 5 && !working
										? () => newQuiz()
										: () => {}
								}
								style={{
									minHeight: "157px"
								}}
							>
								<p className="text-2xl text-center">
									Click here to create a new quiz.
								</p>
								<p className="text-md text-center">
									You can
									create {5 - quizzes.length} more quizzes.
								</p>
							</Card>
						)}
				</div>
			) : (
				<div className="quiz-port flex flex-col items-center justify-center mt-20 mb-16">
					<span>
						No quizzes.{" "}
						{!working &&
							loggedIn &&
							author &&
							loggedIn.username === author.username && (
								<Link href="#" passHref>
									<a>
										<span onClick={() => newQuiz()}>
											Create a new one. You can create up to 5 quizzes in one account.
										</span>
									</a>
								</Link>
							)}
					</span>
				</div>
			)}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes);
