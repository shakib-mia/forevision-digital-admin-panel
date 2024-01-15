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
    const [isrcs, setIsrcs] = useState([])

    useEffect(() => {
        axios.get("https://api.forevisiondigital.in/getAllIsrcs").then(({ data }) => {
            setIsrcs(data);
        })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (isrcs.length > 0 && store.token) {
                let count = 0;
                try {
                    const requests = isrcs.map(async ({ isrc }) => {
                        const { data } = await axios.get(`https://api.forevisiondigital.in/admin-royalty/${isrc}`);
                        for (const { royality } of data.royalties) {
                            count = count + royality;
                            // console.log(count);
                        }
                    });

                    await Promise.all(requests);

                    // Here, 'count' will have the total sum after all requests have completed
                    console.log('Total Count:', count);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [isrcs.length, store.token]);

    return (
        <AppContext.Provider value={{ store, setStore }}>
            <RouterProvider router={router} />
            <ToastContainer />

        </AppContext.Provider>
    );
};

export default App;