import { useState } from "react";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "../components/redux/reducer";
import storage from "../components/redux/storage";
import { PersistGate } from "redux-persist/integration/react";

import Footer from "../components/Footer";
import Modal, { ModalContext } from "../components/generic/Modal";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
	const [modal, setModal] = useState(null);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ModalContext.Provider
					value={{
						modal: modal,
						setModal: setModal,
					}}
				>
					<Modal />
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</ModalContext.Provider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
