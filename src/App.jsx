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
    // const [isrcs, setIsrcs] = useState([])

    // useEffect(() => {
    //     axios.get("http://localhost:4000/getAllIsrcs").then(({ data }) => {
    //         setIsrcs(data);
    //     })
    // }, [])

    // useEffect(() => {
    // let grandTotalCount = 0
    // const fetchDataWithConcurrencyLimit = async (isrcs) => {
    // const limit = pLimit(5); // Limiting to 5 concurrent requests

    //     try {
    // const requests = isrcs.map(({ isrc }) => {
    //     limit(() => {
    //         axios.get(`http://localhost:4000/admin-royalty/${isrc}`).then(({ data }) => {
    //             let count = 0;
    //             for (const { royality } of data.royalties) {
    //                 count += royality;
    //                 grandTotalCount += royality
    //             }
    //             console.log(grandTotalCount);
    //             console.log(`Total Count for ${isrc}: ${count}`);


    //             axios.put(`http://localhost:4000/update-isrc-royalty`, { isrc, count }).then(data => console.log(data))
    //             return count;
    //         })
    //     }
    //     )
    // }
    // );

    // const results = await Promise.all(requests);
    // const totalCount = results.reduce((acc, curr) => acc + curr, 0);
    // console.log('Grand Total Count:', totalCount);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // fetchDataWithConcurrencyLimit(isrcs);
    // console.log(grandTotalCount);

    // axios.get('http://localhost:4000/update-isrc-royalty').then(({ data }) => {
    //     for (const { isrc, revenue } of data) {
    //         if (revenue === undefined) {
    //             console.log(isrc, revenue);
    //             // let grandTotalCount = 0;
    //             axios.get(`http://localhost:4000/admin-royalty/${isrc}`).then(({ data }) => {
    //                 let count = 0;
    //                 for (const { royality } of data.royalties) {
    //                     count += royality;
    //                     // grandTotalCount += royality
    //                 }

    //                 axios.put(`http://localhost:4000/update-isrc-royalty`, { isrc, count }).then(data => console.log(data))

    //                 // return count;
    //             })
    //         }

    //     }
    // })

    // }, [isrcs.length, store.token]);

    return (
        <AppContext.Provider value={{ store, setStore }}>
            <RouterProvider router={router} />
            <ToastContainer />
        </AppContext.Provider>
    );
};

export default App;