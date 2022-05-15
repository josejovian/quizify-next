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
	question=null,
	index,
	_id,
	title,
	choices,
	correct,
	type,
	points,
	ignoreCase,
	loggedIn,
	quiz,
	__v,
	loginUser,
	setLogin,
	setQuiz,
	setQuestion,
	logoutUser,
	...rest
}) => {
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

	useEffect(() => {
		if (typeof window === 'object') {
			const Quill = typeof window === 'object' ? require('quill') : () => false;
			const wrapper = document.getElementById("editor-wrapper");

			if(quill || wrapper) {
				const editor = document.createElement("div");
				editor.id = "editor";

				while(wrapper && wrapper.lastChild) {
					wrapper.removeChild(wrapper.lastChild);
				}

				wrapper.appendChild(editor);
			}

			let temp = (new Quill(`#editor`, {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						[{ 'list': 'ordered'}, { 'list': 'bullet' }],
						[{ 'script': 'sub'}, { 'script': 'super' }],
						['link']
					],
				},
				theme: 'snow'
			}));

			temp.root.innerHTML = title;

			/* 
				Source:
				https://github.com/quilljs/quill/issues/1184
			*/
			temp.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
				let ops = []
				delta.ops.forEach(op => {
					if(op.insert && typeof op.insert === 'string') {
						ops.push({
							insert: op.insert
						})
					}
				})
				delta.ops = ops
				return delta
			});

			setQuill(temp);
		}
	}, [active]);

	function saveScore(value) {
		value = parseInt(value);

		if (value < 0) value = 0;
		else if (value > 100) value = 100;

		const tempQuestions = quiz.questions;
		tempQuestions[_id].points = parseInt(value);

		const input = document.getElementById(`score-${_id}`);
		input.value = value;

		setQuiz({
			...quiz,
			questions: tempQuestions,
			changes: quiz.changes + 1 || 0,
		});
	}

	function saveType(value) {
		console.log(value);

		const tempQuestions = quiz.questions;
		tempQuestions[_id].type = parseInt(value);

		setQuiz({
			...quiz,
			questions: tempQuestions,
			changes: quiz.changes + 1 || 0,
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
					active &&
						"question-active ml-8 bg-slate-200 shadow-md cursor-default",
					!active && "w-full",
				])}
				{...rest}
			>
				<h2 className="question-index" id={`question-${index}`}>
					Question {index}
				</h2>
				<div className="question-content" id={_id}>
					{[
						!active && (
							<Markup
								key="question-content-inactive"
								content={title}
							/>
						),
						active && (
							<div id="editor-wrapper" className="mt-4">
								<div
									key="question-content-active"
									id="editor"
								></div>
							</div>
						),
					]}
				</div>
				{type === 0 ? (
					<input
						className="mt-4"
						type="text"
						defaultValue={correct}
					/>
				) : (
					<div className="mt-4 flex flex-col">
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
									/>
									<label htmlFor={identifier}>{choice}</label>
								</div>
							);
						})}
					</div>
				)}
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
