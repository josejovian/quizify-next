import { useState } from "react";
import Footer from "../components/Footer";
import Modal, { ModalContext } from "../components/generic/Modal";
import Navbar from "../components/Navbar";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {

	const [modal, setModal] = useState(null);

	return (
		<ModalContext.Provider value={{
			modal: modal,
			setModal: setModal,
		}}>
			<Modal />
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</ModalContext.Provider>
	);
}

export default MyApp;
