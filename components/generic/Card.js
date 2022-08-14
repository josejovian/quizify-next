import clsx from "clsx";

const Card = ({ className, children, ...rest}) => {
	return (
		<div
			className={clsx(
				"p-4 bg-gray-100 rounded-sm transition-colors",
				"hover:shadow-md hover:bg-gray-200",
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
};

export default Card;
