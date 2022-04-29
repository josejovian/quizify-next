import clsx from "clsx";

const Footer = () => {
	return (
		<div
			className={clsx(
				"pageify",
				"fixed bottom-0 left-0 py-4",
				"flex flex-row justify-center",
				"text-black z-20"
			)}
		>
			<span>&copy; Jose Jovian 2022</span>
		</div>
	);
};

export default Footer;
