import clsx from "clsx";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "./Modal";

const FormTemplate = ({ title, formik, fields, callback }) => {
	const [disabled, setDisabled] = useState(false);
	const { modal, setModal } = useContext(ModalContext);

	const cb = { ...callback, fail: (message) => console.log(message) };

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
			setDisabled(false);
		}
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
									className="mb-1 uppercase text-sm text-slate-400 tracking-widest font-semibold"
									htmlFor={field.id}
								>
									{field.title}
								</label>
								<Field
									id={field.id}
									name={field.id}
									type={field.type}
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
							isDisabled={disabled}
							className="mt-2"
							type="submit"
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormTemplate;
