import clsx from "clsx";

const Footer = ({ className }) => {
	return (
		<div
			className={clsx(
				"pageify",
				"bottom-0 left-0 py-4",
				"flex flex-row justify-center",
				"text-black z-20",
				className
			)}
		>
			<span>&copy; Jose Jovian 2022</span>
		</div>
	);
};

export default Footer;
