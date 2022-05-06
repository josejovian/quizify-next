import clsx from "clsx";

const Button = ({
	id,
	children,
	variant = "solid",
	onClick,
	isDisabled = false,
	className,
	color = "blue",
	type,
}) => {
	return (
		<button
			id={id}
			className={clsx(
				"px-4 py-2 shadow-md",
				"transition-colors duration-100",
				"disabled:cursor-not-allowed disabled:bg-opacity-50",
				[
					variant === "solid" && [
						`bg-${color}-600 text-white`,
						`hover:bg-${color}-700`,
						`active:bg-${color}-800`,
					],
				],
				className
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
