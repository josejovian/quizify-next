import clsx from "clsx";
import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { QuizContext } from "../../pages/edit/[id]";
import Button from "../generic/Button";
import Card from "../generic/Card";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";
import { Markup } from "interweave";
import { MdImage, MdDelete } from "react-icons/md";

const Question = ({
	index,
	onClick,
	_question, // for question passed from Main
	question = null, // for redux
	questions, // for redux
	setQuestions, // for redux
}) => {
	const { _id, title, type, choices, correctChoice, correct, points } =
		_question;

	const [quill, setQuill] = useState(null);

	const active = question === _id;

	const actions = [
		{
			name: "image",
			variant: "secondary",
			icon: <MdImage />,
		},
		{
			name: "delete",
			variant: "danger",
			icon: <MdDelete />,
		},
	];

	function updateQuestion(object, id = _id) {
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

	function saveAnswer(value) {
		const temp = correct;
		temp[type] = value;
		updateQuestion({
			correct: temp,
		});
	}

	return (
		<div className="flex flex-row">
			{active && (
				<div className="flex flex-col">
					{actions.map(({ name, variant, icon }, index) => (
						<Button
							key={`question-action-${name}`}
							variant={variant}
							className={clsx(index > 0 && "mt-4")}
							icon={icon}
						/>
					))}
				</div>
			)}
			<Card
				className={clsx("mb-8", [
					active
						? "question-active ml-8 bg-slate-200 shadow-md cursor-default"
						: "w-full",
				])}
				onClick={onClick}
			>
				<h2 className="question-index" id={`question-${index}`}>
					Question {index}
				</h2>
				<div className="question-content">
					<Markup
						id={_id}
						className={clsx(active && "hidden")}
						key="question-content-inactive"
						content={title}
					/>
					{active && (
						<div
							key="question-content-active"
							id="editor-wrapper"
							className="mt-4"
						>
							<div id="editor"></div>
						</div>
					)}
				</div>
				<div className="flex flex-col mt-4 md:mr-4 w-full">
					<span className="head-subtle">Answer</span>
					{type === 0 ? (
						<input type="text" defaultValue={correct[0]} onChange={(e) => saveAnswer(e.target.value)} />
					) : (
						<div className="flex flex-col">
							{choices.map((choice, index) => {
								const identifier = `choice-${_id}-${choice}`;
								return (
									<div
										key={identifier}
										className="flex flex-row items-center"
									>
										<input
											className="mr-4 my-2 w-6 h-6"
											type="radio"
											id={identifier}
											name={`choice-${_id}`}
											value={choice}
											checked={choice === correct[1]}
											onChange={(e) => saveAnswer(e.target.value)}
										/>
										<label htmlFor={identifier}>
											{choice}
										</label>
									</div>
								);
							})}
						</div>
					)}
				</div>
				{active && (
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
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
