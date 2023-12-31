import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
    LoginPage,
    SignUpPage,
    ActivationPage,
    HomePage,
    ProductsPage,
    BestSellingPage,
    EventsPage,
    FAQPage,
} from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";

function App() {
    const { loading } = useSelector((state) => state.user);
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <>
            {loading ? null : (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route
                            path="/activation/:activation_token"
                            element={<ActivationPage />}
                        />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route
                            path="/best-selling"
                            element={<BestSellingPage />}
                        />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/faq" element={<FAQPage />} />
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
            )}
        </>
    );
}

export default App;
