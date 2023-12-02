import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage, SignUpPage, ActivationPage } from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server.js";

function App() {
    useEffect(() => {
        axios
            .get(`${server}/user/get-user`, { withCredentials: true })
            .then((res) => {
                toast.success(res.status.message);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, []);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route
                        path="/activation/:activation_token"
                        element={<ActivationPage />}
                    />
                </Routes>
                <ToastContainer
                    position="bottom-right"
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
            </BrowserRouter>
        </>
    );
}

export default App;
