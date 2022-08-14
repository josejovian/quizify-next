import clsx from "clsx";
import { createContext, useContext } from "react";

export const ModalContext = createContext(null);

const Modal = () => {
	const { modal, setModal } = useContext(ModalContext);

	function clearModal() {
		setModal(null);
	}

	return (
		<div
			className={clsx(
				modal && [
					"fixed top-0 left-0 w-screen h-screen pt-8",
					"flex justify-center z-40",
				]
			)}
		>
			<div
				className={clsx(
					modal && [
						"fixed top-0 left-0 w-screen h-screen",
						"bg-zinc-900 bg-opacity-75",
					]
				)}
				onMouseDown={() => clearModal()}
			></div>
			<div
				className={clsx(
					modal && [
						"flex flex-col justify-center p-8 h-min",
						"roounded-sm text-black bg-slate-100 z-50",
					]
				)}
			>
				{modal ?? <></>}
			</div>
		</div>
	);
};

export default Modal;
