import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage, SignUpPage, ActivationPage } from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
