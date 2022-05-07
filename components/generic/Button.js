import clsx from "clsx";

const Button = ({
	id,
	children,
	variant = "primary",
	onClick,
	isDisabled = false,
	className,
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
					variant === "primary" && [
						`bg-blue-600 text-white`,
						`hover:bg-blue-700`,
						`active:bg-blue-800`,
					],
					variant === "secondary" && [
						`bg-gray-500 text-white`,
						`hover:bg-gray-600`,
						`active:bg-gray-700`,
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
