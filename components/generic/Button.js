import clsx from "clsx";

const Button = ({
	id,
	children,
	variant = "solid",
	onClick,
	isDisabled = false,
	type,
}) => {
	return (
		<button
			id={id}
			className={clsx(
				"mt-2 px-4 py-2 shadow-md",
				"transition-colors duration-100",
				"disabled:cursor-not-allowed disabled:bg-opacity-50",
				[
					variant === "solid" && [
						"bg-slate-600 text-white",
						"hover:bg-slate-700",
						"active:bg-slate-800",
					],
				]
			)}
			onClick={onClick}
			type={type}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default Button;
