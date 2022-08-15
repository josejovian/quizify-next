import clsx from "clsx";

const Message = ({ children }) => {
	return (
		<div
			className={clsx(
				"absolute top-0 pt-14 w-screen h-exclude-nav",
				"flex justify-center items-center"
			)}
		>
			{children}
		</div>
	);
};

export default Message;
