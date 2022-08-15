import clsx from "clsx";
import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { QuizContext } from "../../pages/edit/[id]";
import Button from "../generic/Button";
import Card from "../generic/Card";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";
import { Markup } from "interweave";
import { MdImage, MdDelete, MdClose } from "react-icons/md";
import { ModalContext } from "../generic/Modal";
import UploadThumbnail from "./UploadThumbnail";
import Picture from "../generic/Picture";
import { alternate, verifyAnswer } from "../quiz/QuizViewer";

const Question = ({
	index,
	onClick,
	purpose,
	_question, // for question passed from Main

	/* Redux */
	question = null,
	questions,
	setQuestion,
	setQuestions,
	changes,
	setChanges,
	sheet,
	setSheet,
	quiz,
	setQuiz,

	/* Solve */
	answer,
}) => {
	const { _id, title, type, choices, thumbnail, correct, points } = _question;
	const active = question === _id;

	const { setModal } = useContext(ModalContext);
	const [quill, setQuill] = useState(null);

	const actions = [
		{
			name: "close",
			variant: "primary",
			onClick: () => {
				setQuestion(null), cleanEditor();
			},
			icon: <MdClose />,
		},
		{
			name: "image",
			variant: "secondary",
			onClick: () =>
				setModal(
					<UploadThumbnail
						index={index}
						thumbnail={thumbnail}
						saveThumbnail={saveThumbnail}
					/>
				),
			icon: <MdImage />,
		},
		{
			name: "delete",
			variant: "danger",
			onClick: () => {
				deleteQuestion();
			},
			icon: <MdDelete />,
		},
	];

	function updateQuestion(object, id = _id) {
		if (!changes.includes(_id)) {
			setChanges([...changes, _id]);
		}

		setQuestions({
			...questions,
			[_id]: {
				...questions[_id],
				...object,
			},
		});
	}

	function cleanEditor() {
		const editor = document.getElementById("editor");
		updateQuestion(
			{
				title: quill.value.root.innerHTML,
			},
			quill.key
		);

		editor.classList.remove("ql-container");
		editor.classList.remove("ql-snow");
		while (editor && editor.lastChild) {
			editor.removeChild(editor.lastChild);
		}

		const toolbars = document.querySelectorAll("ql-toolbar");
		toolbars.forEach((tb) => tb.remove());
	}

	function setupEditor() {
		// https://github.com/zenoamaro/react-quill/issues/122
		const Quill =
			typeof window === "object" ? require("quill") : () => false;

		let temp = new Quill(`#editor`, {
			modules: {
				toolbar: [
					["bold", "italic", "underline", "strike"],
					[{ list: "ordered" }, { list: "bullet" }],
					[{ script: "sub" }, { script: "super" }],
					["link"],
				],
			},
			theme: "snow",
		});

		if (!temp.container) {
			return;
		}

		temp.root.innerHTML = title;

		// https://github.com/quilljs/quill/issues/1184
		temp.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
			let ops = [];
			delta.ops.forEach((op) => {
				if (op.insert && typeof op.insert === "string") {
					ops.push({
						insert: op.insert,
					});
				}
			});
			delta.ops = ops;
			return delta;
		});

		const toolbars = document.querySelectorAll("ql-toolbar");

		while (toolbars.length > 1) {
			console.log("Remove");
			let element = toolbars.shift();
			element.remove();
		}

		setQuill({ key: _id, value: temp });
	}

	useEffect(() => {
		if (typeof window === "object" && question) {
			if (!active && quill) {
				cleanEditor();
			}

			if (!active) return;

			setTimeout(() => {
				setupEditor();
			}, 100);
		}
	}, [active]);

	function saveScore(value) {
		value = parseInt(value);

		if (value < 0) value = 0;
		else if (value > 100) value = 100;

		const input = document.getElementById(`score-${_id}`);
		input.value = value;

		updateQuestion({
			points: value,
		});
	}

	function saveType(value) {
		value = parseInt(value);

		updateQuestion({
			type: value,
		});
	}

	function editSaveAnswer(value) {
		const temp = correct;
		temp[type] = value;
		updateQuestion({
			correct: temp,
		});
	}

	function saveThumbnail(value) {
		updateQuestion({
			thumbnail: value,
		});
	}

	function saveChoice(value, idx) {
		const _choices = [...choices];

		_choices[idx] = value;
		console.log(_choices);

		updateQuestion({
			choices: _choices,
		});
	}

	function deleteChoice(idx) {
		updateQuestion({
			choices: choices.filter((choice, index) => index !== idx),
		});
	}

	function addChoice() {
		const _choices = [...choices, "New Choice"];

		updateQuestion({
			choices: _choices,
		});
	}

	function solveSaveAnswer(value) {
		setSheet((_sheet) => ({
			..._sheet,
			[_id]: value,
		}));
		console.log(sheet);
	}

	function saveAnswer(value) {
		if (purpose === "edit") {
			editSaveAnswer(value);
		} else {
			solveSaveAnswer(value);
		}
	}

	function deleteQuestion() {
		const _questions = {
			...questions,
		};

		delete _questions[_id];
		setQuestions(_questions);
		setChanges([...changes, _id]);
	}

	return (
		<article className="flex flex-row">
			{/* Show action buttons ONLY for editor mode. */}
			{active && purpose === "edit" && (
				<ul className="flex flex-col">
					{actions.map((action, index) => (
						<li key={`question-${_id}-action-${action.name}`}>
							<Button
								className={clsx(index > 0 && "mt-4")}
								{...action}
							/>
						</li>
					))}
				</ul>
			)}
			<Card
				className={clsx(
					"mb-8",
					[
						active
							? "question-active ml-8 bg-slate-200 shadow-md cursor-default"
							: "w-full",
					],
					// REVIEW MODE: Style cards to indicate questions answered correctly or incorrectly.
					purpose === "review" && [
						verifyAnswer(type, answer.sheet[_id], correct[type])
							? "bg-green-100 hover:bg-green-200 active:bg-green-300"
							: "bg-red-100 hover:bg-red-200 active:bg-red-300",
					]
				)}
				onClick={purpose === "edit" ? onClick : () => {}}
			>
				<h2 className="question-index" id={`question-${index}`}>
					Question {index}
				</h2>
				<div className="question-content flex flex-col">
					{thumbnail && (
						<div className="question-thumbnail my-4">
							<Picture
								src={thumbnail}
								width="1280"
								height="720"
								fallback="/fallback-thumbnail.webp"
							/>
						</div>
					)}
					<Markup
						id={_id}
						className={clsx(active && "hidden")}
						key="question-content-inactive"
						content={title}
					/>
					{active && purpose === "edit" && (
						<div key="question-content-active" id="editor-wrapper">
							<div id="editor"></div>
						</div>
					)}
				</div>
				<div className="flex flex-col mt-4 md:mr-4 w-full">
					<span className="head-subtle">Answer</span>
					{type === 0 ? (
						<input
							type="text"
							defaultValue={alternate(
								purpose,
								correct[0],
								"",
								answer && answer.sheet[_id]
							)}
							onBlur={(e) => saveAnswer(e.target.value)}
							disabled={purpose === "review"}
						/>
					) : (
						<ul className="flex flex-col gap-2">
							{choices.map((choice, index) => {
								const identifier = `choice-${_id}-${index}`;
								return (
									<li
										key={identifier}
										className="flex flex-row items-center"
									>
										<input
											className="my-2 w-6 h-6"
											type="radio"
											id={identifier}
											name={`choice-${_id}`}
											value={choice}
											checked={
												index ===
												alternate(
													purpose,
													parseInt(correct[1]),
													sheet && sheet[_id],
													answer && answer.sheet[_id]
												)
											}
											onChange={(e) => {
												saveAnswer(parseInt(index));
											}}
											disabled={purpose === "review"}
										/>
										<input
											className="mx-4"
											htmlFor={identifier}
											onBlur={
												purpose === "edit"
													? (e) => {
															saveChoice(
																e.target.value,
																index
															);
													  }
													: () => {}
											}
											defaultValue={choice}
											disabled={purpose !== "edit"}
										/>
										<Button
											variant="danger-outline"
											icon={<MdDelete />}
											className={clsx(
												(index <= 1 ||
													purpose !== "edit") &&
													"hidden"
											)}
											onClick={() => {
												deleteChoice(index);
											}}
											disabled={
												index <= 1 ||
												purpose !== "edit"
											}
										/>
									</li>
								);
							})}
							<li>
								<Button
									className={clsx(
										"ml-10",
										(choices.length > 6 ||
											purpose !== "edit") &&
											"hidden"
									)}
									onClick={() => addChoice()}
									disabled={
										choices.length > 6 ||
										purpose !== "edit"
									}
								>
									Add Choice
								</Button>
							</li>
						</ul>
					)}
					{purpose === "review" && (
						<>
							<span className="head-subtle mt-4">Correct Answer</span>
							<input
								type="text"
								defaultValue={correct[type]}
								disabled
							/>
						</>
					)}
				</div>
				{active && purpose === "edit" && (
					<div>
						<hr className="my-4" />
						<div className="question-edit-actions flex flex-col md:flex-row">
							<div className="flex flex-col mb-4 md:m-0 md:mr-4 w-full">
								<span className="head-subtle">Type</span>
								<select
									onChange={(e) => saveType(e.target.value)}
									defaultValue={type}
								>
									<option value="0">Short Answer</option>
									<option value="1">Multiple Choice</option>
								</select>
							</div>
							<div className="flex flex-col shrink w-full">
								<span className="head-subtle">Score</span>
								<input
									id={`score-${_id}`}
									onChange={(e) => saveScore(e.target.value)}
									type="number"
									defaultValue={points}
								/>
							</div>
						</div>
					</div>
				)}
			</Card>
		</article>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
