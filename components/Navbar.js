import clsx from "clsx";

const links = [
	{
		name: "Login",
		onClick: () => {
			console.log("Login");
		},
		forGuests: true,
	},
	{
		name: "Register",
		onClick: () => {
			console.log("Register");
		},
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
		link: "/",
		forGuests: false,
	},
];

const Navbar = () => {
	const loggedIn = null;

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

	return (
		<div
			className={clsx(
				"pageify",
				"fixed top-0 left-0 py-4 w-screen",
				"flex flex-row justify-between",
				"bg-zinc-700 text-white"
			)}
		>
			<a href="/">
				<span className="font-semibold">QUIZIFY</span>
			</a>
			<div className="flex">{linkElements}</div>
		</div>
	);
};

export default Navbar;
