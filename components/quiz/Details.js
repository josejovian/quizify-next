import clsx from "clsx";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import FormTemplate from "../generic/FormTemplate";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const QuizSchema = Yup.object().shape({
	name: Yup.string()
		.required("Title is required!")
		.min(4, "Title is too short!")
		.max(32, "Title is too long!"),
	desc: Yup.string()
		.required("Description is required!")
		.min(4, "Description is too short!")
		.max(64, "Description is too long!"),
});

const Details = ({
	quiz,
	title,
	initialValues = { name: "Quiz Title", desc: "Quiz Description", duration: 60 },
	mongoUpdate,
	reduxUpdate,
	submitText,
}) => {
	async function _mongoUpdate(data) {
		return mongoUpdate(quiz._id, data);
	}

	async function _reduxUpdate(data) {
		reduxUpdate(data)
	}

	return (
		<FormTemplate
			title={title}
			formik={{
				initialValues: {
					name: quiz.name,
					desc: quiz.desc,
					duration: quiz.duration,
				},
				validationSchema: QuizSchema,
				onSubmit: _mongoUpdate,
			}}
			fields={[
				{
					title: "Name",
					id: "name",
					type: "text",
				},
				{
					title: "Description",
					id: "desc",
					type: "textarea",
					as: "textarea",
				},
				{
					title: "Duration (Minutes)",
					id: "duration",
					type: "number",
				},
			]}
			callback={{ success: _reduxUpdate }}
			submitText={submitText}
		/>
	);
};

export default Details;