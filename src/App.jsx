// import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { AppContext } from './contexts/AppContext';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import pLimit from 'p-limit'

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RequireAuth>
                <Home />
            </RequireAuth>,
        },

        {
            path: "/login",
            element: <Login />,
        },
    ]);

    const [store, setStore] = useState({ token: localStorage.getItem("token") });

    return (
        <AppContext.Provider value={{ store, setStore }}>
            <RouterProvider router={router} />
            <ToastContainer />
        </AppContext.Provider>
    );
};

export default App;