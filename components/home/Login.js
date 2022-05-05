import clsx from "clsx";
import * as Yup from "yup";
import FormTemplate from "../generic/FormTemplate";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Email is in the wrong format!").required("Email is required!"),
	password: Yup.string().required("Password is required!"),
});

const Login = ({ login, reduxLogin }) => {

	function formToRedux(data) {
		delete data.password;
		reduxLogin(data);
	}

	return (
		<FormTemplate
			title="Login"
			formik={{
				initialValues: {
					email: "",
					password: "",
				},
				validationSchema: LoginSchema,
				onSubmit: login,
			}}
			fields={[
				{
					title: "Email",
					id: "email",
					type: "email",
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

export default Login;
