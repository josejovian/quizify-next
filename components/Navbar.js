import clsx from "clsx";
import { useContext } from "react";
import { ModalContext } from "./generic/Modal";
import Login from "./landing/Login";
import Register from "./landing/Register";
import { register, login } from "./api";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./redux/setter";

const Navbar = ({ loggedIn, loginUser, logoutUser }) => {
	const { setModal } = useContext(ModalContext);

	const links = [
		{
			name: "Login",
			onClick: showLoginForm,
			forGuests: true,
		},
		{
			name: "Register",
			onClick: showRegisterForm,
			forGuests: true,
		},
		{
			name: "Quizzes",
			link: "/",
			forGuests: false,
		},
		{
			name: "Works",
			link: "/",
			forGuests: false,
		},
		{
			name: "Logout",
			onClick: logoutUser,
			forGuests: false,
		},
	];

	const linkElements = links
		.filter((link) => link.forGuests === (loggedIn === null))
		.map((link) => (
			<a
				key={link.name}
				className="ml-8"
				href={link.link ?? "#"}
				onClick={link.onClick ?? ""}
			>
				{link.name}
			</a>
		));

	function showLoginForm() {
		setModal(<Login login={login} reduxLogin={loginUser} />);
	}

	function showRegisterForm() {
		setModal(<Register register={register} reduxLogout={logoutUser} />);
	}

	return (
		<div
			className={clsx(
				"pageify",
				"fixed top-0 left-0 py-4",
				"flex flex-row justify-between",
				"bg-zinc-700 text-white z-20"
			)}
		>
			<a href="/">
				<span className="font-semibold">QUIZIFY</span>
			</a>
			<div className="flex">{linkElements}</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
