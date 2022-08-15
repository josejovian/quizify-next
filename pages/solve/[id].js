import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../../components/redux/setter";
import api, { submitQuizAnswers } from "../../components/API";
import Side from "../../components/quiz/Side";
import Main from "../../components/quiz/Main";
import { reduxifyQuestions } from "../../components/quiz/QuizViewer";
import Button from "../../components/generic/Button";
import { useRouter } from "next/router";
import { ModalContext } from "../../components/generic/Modal";
import Message from "../../components/generic/Message";

const Solve = ({
	quiz,
	setQuiz,
	questions,
	setQuestions,
	loggedIn,
	queryResult,
}) => {
	const [intv, setIntv] = useState(null);
	const [start, setStart] = useState(null);
	const [sheet, setSheet] = useState({});
	const [remaining, setRemaining] = useState(0);
	const { setModal } = useContext(ModalContext);
	const router = useRouter();

	useEffect(() => {
		reduxifyQuestions(queryResult, setQuiz, setQuestions);
	}, [queryResult]);

	async function submitAnswers() {
		const now = new Date().getTime();

		if (now >= start + quiz.duration * 60 * 1000) {
			return;
		}

		let score = 0,
			max = 0;

		for (const [key, value] of Object.entries(questions)) {
			const answer = sheet[key],
				correctAnswer = value.correct[value.type];

			if (
				answer === correctAnswer ||
				parseInt(answer) === parseInt(correctAnswer)
			) {
				score += value.points;
			}
			max += value.points;
		}

		const finalAnswer = {
			start: start,
			end: new Date().getTime(),
			sheet: sheet,
			quiz: quiz._id,
			author: loggedIn._id,
			score: score,
		};

		await submitQuizAnswers(quiz._id, finalAnswer).then(() => {
			setModal(null);
			router.push("/");
		});
	}

	function promptAnswer() {
		setModal(
			<div className="w-64">
				<h2>Are you sure?</h2>
				<p>
					Once you submit your answers, you will{" "}
					<b>be redirected to the homepage</b>.
				</p>
				<div className="flex justify-center">
					<Button className="mt-4" onClick={() => submitAnswers()}>
						Submit
					</Button>
				</div>
			</div>
		);
	}

	useEffect(() => {
		let temp;

		if (!intv && start) {
			temp = setInterval(() => {
				if (start && quiz) {
					const time =
						start +
						quiz.duration * 60 * 1000 -
						new Date().getTime() +
						1000;
					const seconds = Math.floor(time / 1000);
					setRemaining(seconds);
				} else {
					console.log("Not Start");
				}
			}, 1000);
		}
		return () => {
			clearInterval(temp);
		};
	}, [start]);

	if(queryResult.quiz.questions.length === 0) {
		return (
			<Message>
				This quiz does not have any questions.
			</Message>
		)
	}

	return start ? (
		<div className={clsx("quiz-port", "absolute top-0 pt-14")}>
			<Side
				purpose="solve"
				sheet={sheet}
				start={start}
				submitAnswers={promptAnswer}
				remaining={remaining}
			/>
			<Main purpose="solve" sheet={sheet} setSheet={setSheet} />
		</div>
	) : (
		<div
			className={clsx(
				"quiz-port",
				"absolute top-0 mt-14 h-exclude-nav",
				"flex flex-col justify-center items-center"
			)}
		>
			<h1>{quiz && quiz.name}</h1>
			<p className="mt-6 mb-8">{quiz && quiz.desc}</p>
			<Button
				onClick={() => {
					setStart(new Date().getTime());
				}}
			>
				Start
			</Button>
		</div>
	);
};

export const getServerSideProps = async (req) => {
	let result,
		quiz = null;

	try {
		quiz = await api.get(`/api/quiz/${req.query.id}`);
		quiz = quiz.data[0];

		result = { status: "ok" };
	} catch (e) {
		result = { status: "fail" };
	}

	return {
		props: { queryResult: { quiz: quiz, result: result } },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Solve);
