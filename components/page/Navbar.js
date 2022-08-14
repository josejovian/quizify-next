import { useState, useContext, useEffect } from "react";
import { register, login } from "../API";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";
import clsx from "clsx";
import Login from "../home/Login";
import Register from "../home/Register";
import { ModalContext } from "../generic/Modal";
import Link from "next/link";

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
			link: `/works/${loggedIn && loggedIn._id}`,
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
						link: `/quizzes/${loggedIn._id}`,
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
					<li key={link.name}>
						<Link href={link.link ?? "#"} passHref>
							<a
								className="ml-8"
								onClick={link.onClick ?? function () {}}
							>
								{link.name}
							</a>
						</Link>
					</li>
				))
		);
	}, [loggedIn]);

	function showLoginForm() {
		setModal(<Login login={login} reduxLogin={loginUser} />);
	}

	function showRegisterForm() {
		setModal(<Register register={register} reduxLogin={loginUser} />);
	}

	return (
		<nav
			className={clsx(
				"pageify",
				"fixed top-0 left-0 py-4",
				"flex flex-row justify-between",
				"bg-zinc-700 text-white z-20"
			)}
		>
			<Link href="/" passHref>
				<a>
					<span className="font-semibold">QUIZIFY</span>
				</a>
			</Link>
			<ul className="flex">{elements}</ul>
		</nav>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
