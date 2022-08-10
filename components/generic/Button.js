import clsx from "clsx";

import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
	children,
	variant = "primary",
	className,
	icon,
	disabled,
	loading,
	...rest
}) => {
	return (
		<button
			className={clsx(
				"shadow-md",
				"transition-colors duration-100",
				(disabled || loading) &&
					"cursor-not-allowed bg-opacity-50 !bg-gray-400",
				[
					!icon && "px-4 py-2",
					icon &&
						"w-10 h-10 flex flex-col items-center justify-center p-0",
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
					variant === "danger" && [
						`bg-red-500 text-white`,
						`hover:bg-red-600`,
						`active:bg-red-700`,
					],
					variant === "danger-outline" && [
						`border border-red-500 text-red-500`,
						`hover:bg-red-100`,
						`active:bg-red-200`,
					],
				],
				className
			)}
			disabled={disabled || loading}
			{...rest}
		>
			{loading ? (
				<BiLoaderAlt className="animate-spin" />
			) : (
				icon || children
			)}
		</button>
	);
};

export default Button;
