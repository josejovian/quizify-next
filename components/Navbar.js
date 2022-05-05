import { useState, useContext, useEffect } from "react";
import { register, login } from "./api";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./redux/setter";
import clsx from "clsx";
import Login from "./landing/Login";
import Register from "./landing/Register";
import { ModalContext } from "./generic/Modal";

const Navbar = ({ loggedIn, loginUser, logoutUser }) => {
	const { setModal } = useContext(ModalContext);
	const [elements, setElements] = useState([]);

	const baseLinks = [
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
	];

	let links = baseLinks;

	useEffect(() => {
		if (loggedIn) {
			links = [
				...baseLinks,
				[
					{
						name: loggedIn.username,
						forGuests: false,
					},
					{
						name: "Logout",
						onClick: logoutUser,
						forGuests: false,
					},
				],
			];
			links = links.flat();
		}

		setElements(
			links
				.filter((link) => link.forGuests === (loggedIn === null))
				.map((link) => (
					<a
						key={link.name}
						className="ml-8"
						href={link.link ?? "#"}
						onClick={link.onClick ?? function () {}}
					>
						{link.name}
					</a>
				))
		);
	}, [loggedIn]);

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
			<div className="flex">{elements}</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
