// App.js
import React from 'react';
import CoordinatesPage from './components/CoordinatesPage';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import {CookiesProvider} from "react-cookie";
import {Toaster} from 'react-hot-toast'

const App = () => {
    return (
        <div className="App">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<CoordinatesPage/>}/>
                        <Route path="/login" element={<LogIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>
        </div>
    );
};

export default App;
