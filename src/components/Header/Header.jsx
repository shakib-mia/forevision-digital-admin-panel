// import React from 'react';
import totalSongs from '../../assets/icons/total-songs.jpg';
// import greenArrow from '../../assets/icons/green-arrow.svg';
import totalUsers from "../../assets/icons/total-users.jpg"
import totalRevenue from "../../assets/icons/total-revenue.png"
import dueRevenue from "../../assets/icons/due-revenue.jpg";
import HeaderData from '../HeaderData/HeaderData';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { AppContext } from '../../contexts/AppContext';

const Header = () => {
    const { store } = useContext(AppContext);
    const [data, setData] = useState({})
    const config = {
        headers: {
            token: store.token
        }
    }

    useEffect(() => {
        axios.get(backendUrl + 'dashboard', config).then(({ data }) => setData(data))
    }, [])

    const headerData = [
        {
            heading: "Total Songs",
            icon: totalSongs,
            count: data.isrcCount || 0,
            progress: '+300 this month',
            increased: true,
        },
        {
            heading: "Total Users",
            icon: totalUsers,
            count: data.usersCount || 0,
            progress: '-30 this month ',
            increased: false
        },
        {
            count: data.finalRevenue?.toFixed(2) || 0,
            heading: "Total Revenue",
            icon: totalRevenue,
            progress: '+30,1245 this month ',
            increased: true
        },
        {
            count: data.due?.toFixed(2) || 0,
            heading: "Due revenue",
            icon: dueRevenue,
            progress: '-37580 this month ',
            increased: false
        },
    ]

    return (
        <div className="mt-4 bg-white rounded-[20px] custom-shadow">
            <div className="py-3 px-6">
                <h6 className="text-grey text-heading-6">Performance </h6>
            </div>

            <div className="p-10 grid grid-cols-4 text-grey border-y border-grey-light">
                {headerData.map((item, key) => <HeaderData {...item} key={key} />)}
            </div>

            <div className='h-16'></div>
        </div>
    );
};

export default Header;