import clsx from "clsx";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createQuizQuestion, updateQuiz, updateQuizQuestions } from "../API";
import Button from "../generic/Button";
import { ModalContext } from "../generic/Modal";
import Details from "./Details";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";
import { MdArrowBack, MdArrowForward, MdChevronLeft, MdMode, MdSave } from "react-icons/md";

const Side = ({
	purpose,

	/* Redux / Edit */
	quiz,
	setQuiz,
	questions,
	setQuestions,
	changes,
	setChanges,

	/* Solve */
	start,
	sheet,
	submitAnswers,
	remaining,

	/* Review */
	answer,
	owner,
}) => {
	const [anchors, setAnchors] = useState([]);
	const [maxScore, setMaxScore] = useState(0);
	const [saveButtonLoading, setSaveButtonLoading] = useState(false);
	const [newButtonLoading, setNewButtonLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { setModal } = useContext(ModalContext);

	useEffect(() => {
		const temp = Array.from(document.querySelectorAll("h2[id*=question]"));
		if (temp.length !== anchors.length) setAnchors(temp);
	});

	useEffect(() => {
		if (questions) {
			let _max = 0;
			Object.entries(questions).forEach(([key, value]) => {
				_max += value.points;
			});
			setMaxScore(_max);
		}
		console.log(owner);
	}, [questions]);

	const actions = [
		{
			name: "edit",
			variant: "secondary",
			onClick: () => {
				editQuiz();
			},
			icon: <MdMode />,
		},
		{
			name: "save",
			variant: "primary",
			onClick: () => {
				saveQuiz();
			},
			icon: <MdSave />,
		},
	];

	function editQuiz() {
		setModal(
			<Details
				quiz={quiz}
				title="Edit Quiz"
				submitText="Update Quiz"
				mongoUpdate={updateQuiz}
				reduxUpdate={setQuiz}
			/>
		);
	}

	async function saveQuiz() {
		setSaveButtonLoading(true);
		await updateQuizQuestions(quiz._id, changes, questions)
			.then(() => {
				setChanges([]);
				setSaveButtonLoading(false);
			})
			.catch((e) => {
				setSaveButtonLoading(false);
			});
	}

	async function newQuestion() {
		if (anchors.length >= 10) return;

		setNewButtonLoading(true);

		await createQuizQuestion(quiz._id)
			.then((result) => {
				setQuestions({
					...questions,
					[result._id]: result,
				});
				setChanges([]);
				setNewButtonLoading(false);
			})
			.catch((e) => {
				setNewButtonLoading(false);
			});
	}

	function beautifyTime(time) {
		const mins = Math.floor(time / 60);
		const secs = time - mins * 60;
		return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
	}

	return [
		quiz && (
			<>
				<aside
					key="side-quiz"
					className={clsx(
						"lg:block fixed top-0 lg:top-14 left-0 p-16",
						"quiz-port w-screen lg:w-side h-screen",
						"inline-flex flex-col",
						"bg-zinc-200 text-black z-20",
						open && "hidden"
					)}
				>
					<h1>{quiz.name}</h1>
					<p className="mt-4">{quiz.desc}</p>
					<ul className="flex gap-4 mt-2">
						{purpose === "edit" &&
							actions.map((action) => {
								let disabled = false,
									loading = false;

								if (action.name === "save") {
									disabled =
										changes.length === 0 || saveButtonLoading;
									loading = saveButtonLoading;
								}

								return (
									<Button
										key={`quiz-action-${action.name}`}
										{...action}
										disabled={disabled}
										loading={loading}
									/>
								);
							})}
						{purpose === "solve" && (
							<section className="flex flex-col w-full">
								<span className="subtle mb-2">
									<b>Time Remaining: </b>
									{beautifyTime(remaining)}
								</span>
								<Button onClick={() => submitAnswers()}>
									Submit
								</Button>
							</section>
						)}
						{purpose === "review" && (
							<section className="flex flex-col w-full">
								<span className="subtle mb-2">
									<b>Owner: </b>
									{owner.username}
								</span>
								<span className="subtle mb-2">
									<b>Score: </b>
									{answer.score} / {maxScore}
								</span>
							</section>
						)}
					</ul>
					<hr className="my-4 border-gray-500" />
					{purpose === "edit" && (
						<section className="flex flex-col">
							<span className="subtle mb-2">
								{anchors.length} / 10 questions
							</span>
							<Button
								className="mb-4"
								variant="primary"
								onClick={() => newQuestion()}
								disabled={anchors.length >= 10}
								loading={newButtonLoading}
							>
								New Question
							</Button>{" "}
						</section>
					)}
					<h2 className="mb-2">Table of Contents</h2>
					<ul>
						{anchors.map((question, idx) => {
							return (
								<li
									key={`toc-question-${idx}`}
									className="flex justify-beteen my-1"
								>
									<a href={`#question-${idx + 1}`}>
										Question {idx + 1}
									</a>
								</li>
							);
						})}
					</ul>
				</aside>
				<Button
					className="fixed block bottom-4 left-4 lg:hidden z-30"
					variant="secondary"
					icon={open ? <MdArrowForward /> : <MdArrowBack /> }
					onClick={() => setOpen(!open)}
				/>
			</>
		),
		!quiz && [<div key="side-no-quiz"></div>],
	];
};

export default connect(mapStateToProps, mapDispatchToProps)(Side);
