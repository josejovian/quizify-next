import clsx from "clsx";
import { useContext } from "react";
import * as Yup from "yup";
import { DataContext } from "../../pages/_app";
import FormTemplate from "../generic/FormTemplate";

const RegisterSchema = Yup.object().shape({
	email: Yup.string().email("Email is in the wrong format!").required("Email is required!"),
	username: Yup.string().min(4, 'Username is too short!').max(20, 'Username is too long!').required("Username is required!"),
	password: Yup.string().min(8, 'Password is too short!').max(30, 'Password is too long!').required("Password is required!"),
});

const Register = ({ register, reduxLogin }) => {

	const { data, setData } = useContext(DataContext);

	function formToRedux(data) {
		delete data.password;
		reduxLogin(data);
	}

	return (
		<FormTemplate
			title="Register"
			formik={{
				initialValues: {
					email: "",
					username: "",
					password: "",
				},
				validationSchema: RegisterSchema,
				onSubmit: register,
			}}
			fields={[
				{
					title: "Email",
					id: "email",
					type: "email",
					validate: (email) => {
						let error;
						if(data.emails[email]) {
							error = "Email is already taken!";
						}
						return error;
					}
				},
				{
					title: "Username",
					id: "username",
					type: "username",
					validate: (username) => {
						let error;
						if(data.users[username]) {
							error = "Username is already taken!";
						}
						return error;
					}
				},
				{
					title: "Password",
					id: "password",
					type: "password",
				},
			]}
			callback={{success: formToRedux}}
		/>
	);
};

export default Register;
