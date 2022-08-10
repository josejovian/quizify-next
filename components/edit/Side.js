import clsx from "clsx";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createQuizQuestion, updateQuiz, updateQuizQuestions } from "../api";
import Button from "../generic/Button";
import { ModalContext } from "../generic/Modal";
import Details from "../quiz/Details";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";
import { MdMode, MdSave } from "react-icons/md";

const Side = ({
	quiz,
	setQuiz,
	questions,
	setQuestions,
	changes,
	setChanges,
	purpose
}) => {
	const [anchors, setAnchors] = useState([]);
	const [saveButtonLoading, setSaveButtonLoading] = useState(false);
	const [newButtonLoading, setNewButtonLoading] = useState(false);
	const { setModal } = useContext(ModalContext);

	useEffect(() => {
		const temp = Array.from(document.querySelectorAll("h2[id*=question]"));
		if (temp.length !== anchors.length) setAnchors(temp);
	});

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
		if(anchors.length >= 10)
			return;
		
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

	return [
		quiz && (
			<aside
				key="side-quiz"
				className={clsx(
					"fixed top-14 left-0 h-screen p-16",
					"inline-flex flex-col",
					"bg-zinc-200 text-black z-10"
				)}
				id="quiz-side"
			>
				<h1>{quiz.name}</h1>
				<p className="mt-4">{quiz.desc}</p>
				<ul className="flex gap-4 mt-2">
					{purpose === "edit" && actions.map((action) => {
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
				</ul>
				<hr className="my-4 border-gray-500" />
				<section className="flex flex-col">
					<span className="subtle mb-2">
						{anchors.length} / 10 questions
					</span>
					{purpose === "edit" && <Button
						className="mb-4"
						variant="primary"
						onClick={() => newQuestion()}
						disabled={anchors.length >= 10}
						loading={newButtonLoading}
					>
						New Question
					</Button>}
				</section>
				<h2 className="mb-2">Table of Contents</h2>
				<ul>
					{anchors.map((question, idx) => {
						return (
							<li key={`toc-question-${idx}`} className="my-1">
								<a href={`#question-${idx + 1}`}>
									Question {idx + 1}
								</a>
							</li>
						);
					})}
				</ul>
			</aside>
		),
		!quiz && [<div key="side-no-quiz"></div>],
	];
};

export default connect(mapStateToProps, mapDispatchToProps)(Side);
