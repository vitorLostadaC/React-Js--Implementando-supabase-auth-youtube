import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./hooks/useAuth";

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
