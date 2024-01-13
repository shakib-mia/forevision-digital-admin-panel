// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadSection from "../UploadSection/UploadSection";
import Users from "../Users/Users";
// import DisbursePayment from "../DisbursePayment/DisbursePayment";

const UploadAndActivity = () => {
    const { store, setStore } = useContext(AppContext);
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [progressVisible, setProgressVisible] = useState(false);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(backendUrl + 'all-users').then(({ data }) => {
            setLoading(false)
            setUsers(data);
            // setFilteredList(data)

        })
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                token: store.token,
            }
        }
        axios.get(backendUrl + 'platforms', config).then(({ data }) => setStore({ ...store, platforms: data })).catch(err => {

            toast.error(err.response.data.message)
            if (err.response.status === 401) {
                setStore({});
                navigate('/login')
            }
        })
    }, [store.token])


    // const [file, setFile] = useState(null);
    // const navigate = useNavigate()





    return (
        <>
            {/* <div className="w-screen h-screen absolute left-0 top-0 backdrop-blur-md z-[999]"></div> */}
            {progressVisible && <div className="fixed top-0 left-0 w-full bg-white h-1 rounded-full overflow-hidden">
                <div className="bg-interactive-light-confirmation h-full transition-all duration-300" style={{ width: progress + "%" }}></div>
            </div>}
            <div className='w-7/12 h-[467px] bg-white rounded-[20px] custom-shadow px-11 py-7 grid grid-cols-2 divide-x divide-interactive-light'>
                <UploadSection setProgress={setProgress} setProgressVisible={setProgressVisible} />

                <aside className="pl-7">
                    <Users users={users} loading={loading} />
                </aside>
            </div>
        </>
    );
};

export default UploadAndActivity;