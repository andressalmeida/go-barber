import React from "react";

import GlobalStyle from "./styles/global";

import { ToastContainer } from "./components/ToastContainer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { AuthProvider } from "./contexts/AuthContext";

const App = () => (
    <>
        <AuthProvider>
            <SignIn />
        </AuthProvider>

        <ToastContainer />

        <GlobalStyle />
    </>
);

export default App;
