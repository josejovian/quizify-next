import clsx from "clsx";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../redux/setter";

const Side = ({ quiz }) => {
	return (
		<div
			className={clsx(
				"fixed top-14 right-0 w-2/6 h-screen p-16",
				"flex flex-row justify-between",
				"bg-zinc-200 text-white z-10"
			)}
		>
			
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Side);