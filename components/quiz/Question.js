import clsx from "clsx";
import { useContext, useEffect, useMemo } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import { QuizContext } from "../../pages/edit/[id]";
import Button from "../generic/Button";
import Card from "../generic/Card";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";
import { Markup } from "interweave";

const Question = ({
	question,
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
	const active = question === _id;

	return (
		<Card
			className={clsx("mb-8", [
				active && "bg-slate-200 shadow-md cursor-default",
			])}
			{...rest}
		>
			<h2 className="question-index" id={`question-${index}`}>
				Question {index}
			</h2>
			<div className="question-content" id={_id}>
				<Markup content={title} />
			</div>
			{type === 0 ? (
				<input className="mt-4" type="text" defaultValue={correct} />
			) : (
				<div className="mt-4 flex flex-col">
					{choices.map((choice, index) => {
						const identifier = `choice-${_id}-${choice}`;
						return (
							<div key={identifier} className="flex flex-row items-center">
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
							<select defaultValue={type}>
								<option value="0">Short Answer</option>
								<option value="1">Multiple Choice</option>
							</select>
						</div>
						<div className="flex flex-col shrink w-full">
							<span className="head-subtle">Score</span>
							<input type="number" defaultValue={points} />
						</div>
					</div>
				</div>
			)}
		</Card>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
