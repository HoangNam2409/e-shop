import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage, SignUpPage } from "./Routes";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
