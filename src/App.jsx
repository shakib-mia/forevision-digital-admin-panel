// import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { AppContext } from './contexts/AppContext';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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

    useEffect(() => {
        // axios.get("http://localhost:4000/all-users").then(({ data }) => {
        //     for (const { _id } of data) {
        //         // console.log(_id);
        //         // axios.get(`http://localhost:4000/lifetime-revenue/${_id}`).then(({ data }) => console.log(data))
        //     }
        // })
    }, [])

    return (
        <AppContext.Provider value={{ store, setStore }}>
            <RouterProvider router={router} />
            <ToastContainer />

        </AppContext.Provider>
    );
};

export default App;