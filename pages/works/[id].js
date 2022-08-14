import clsx from "clsx";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
} from "../../components/redux/setter";
import api, { submitQuizAnswers } from "../../components/api";
import Landing from "../../components/home/Landing";
import Quizzes from "../../components/home/Quizzes";
import { DataContext } from "../_app";
import { reduxifyQuestions } from "../../components/quiz/QuizViewer";
import Button from "../../components/generic/Button";
import { useRouter } from "next/router";
import { ModalContext } from "../../components/generic/Modal";
import Works from "../../components/works/Works";
import Footer from "../../components/page/Footer";

const ViewWork = ({
	queryResult,
}) => {
	return (
		<div className={clsx("quiz-port", "absolute top-0 pt-14")}>
			<Works works={queryResult.answers.answers} author={queryResult.author} />
			<Footer />
		</div>
	)
};

export const getServerSideProps = async (req) => {
	let answers, result, author;

	try {
		answers = await api.get(`/api/answer/author/${req.query.id}`);
		answers = answers.data;
		
		author = await api.get(`/api/account/${req.query.id}`);
		author = author.data;

		result = { status: "ok" };
	} catch (e) {
		result = { status: "fail" };
	}

	return {
		props: { queryResult: { answers: answers, author: author, result: result } },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewWork);
