import clsx from "clsx";
import * as Yup from "yup";
import FormTemplate from "../generic/FormTemplate";

const RegisterSchema = Yup.object().shape({
	email: Yup.string().email("Email is in the wrong format!").required("Email is required!"),
	username: Yup.string().min(4, 'Username is too short!').max(20, 'Username is too long!').required("Username is required!"),
	password: Yup.string().required("Password is required!"),
});

const Register = ({ register, reduxLogin }) => {

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
				},
				{
					title: "Username",
					id: "username",
					type: "username",
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
