import clsx from "clsx";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "./Modal";

const FormTemplate = ({
	title,
	formik,
	fields,
	callback,
	submitText = "Submit",
}) => {
	const [disabled, setDisabled] = useState(false);
	const [cb, setCb] = useState({
		...callback,
		fail: (message) => console.log(message),
	});
	const { modal, setModal } = useContext(ModalContext);

	useEffect(() => {
		setCb({ ...callback, fail: (message) => console.log(message) });
	}, [callback]);

	function collectValues() {
		let json = {};
		fields.forEach((field) => {
			json[field.id] = document.getElementById(field.id).value;
		});
		return json;
	}

	async function onSubmit() {
		setDisabled(true);
		let result = { status: "fail" };
		try {
			result = await formik.onSubmit(collectValues());
		} catch (e) {
			console.log(e);
			setDisabled(false);
		}
		console.log(result);
		if (result.status === "ok") {
			cb.success(result);
			setModal(null);
		} else cb.fail(result.status);
		setDisabled(false);
	}

	return (
		<div className="modal-form-wrapper">
			<h2 className="mb-8">{title}</h2>
			<Formik
				initialValues={formik.initialValues}
				validationSchema={formik.validationSchema}
				onSubmit={async () => onSubmit()}
			>
				{({ errors, touched }) => (
					<Form className="flex flex-col">
						{fields.map((field) => (
							<div key={field.id} className="flex flex-col mb-4">
								<label
									className="head-subtle"
									htmlFor={field.id}
								>
									{field.title}
								</label>
								<Field
									id={field.id}
									name={field.id}
									type={field.type}
									as={field.as}
									validate={field.validate}
								/>
								{errors[field.id] && touched[field.id] ? (
									<div className="mt-1 text-right text-red-500">
										{errors[field.id]}
									</div>
								) : null}
							</div>
						))}
						<Button
							disabled={disabled}
							className="mt-2"
							type="submit"
						>
							{submitText}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormTemplate;
