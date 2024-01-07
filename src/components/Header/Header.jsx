// import React from 'react';
import totalSongs from '../../assets/icons/total-songs.jpg';
// import greenArrow from '../../assets/icons/green-arrow.svg';
import totalUsers from "../../assets/icons/total-users.jpg"
import totalRevenue from "../../assets/icons/total-revenue.png"
import dueRevenue from "../../assets/icons/due-revenue.jpg";
import HeaderData from '../HeaderData/HeaderData';

const Header = () => {
    const headerData = [
        {
            heading: "Total Songs",
            icon: totalSongs,
            count: 202546,
            progress: '+300 this month',
            increased: true,
        },
        {
            heading: "Total Users",
            icon: totalUsers,
            count: 20256,
            progress: '-30 this month ',
            increased: false
        },
        {
            count: '24,85,256',
            heading: "Total Revenue",
            icon: totalRevenue,
            progress: '+30,1245 this month ',
            increased: true
        },
        {
            count: '2,85,256',
            heading: "Due revenue",
            icon: dueRevenue,
            progress: '-37580 this month ',
            increased: false
        },
    ]

    return (
        <div className="mt-4 bg-white rounded-[20px] custom-shadow">
            <div className="py-3 px-6">
                <h6 className="text-interactive-dark text-heading-6">Performance </h6>
            </div>

            <div className="p-10 grid grid-cols-4 text-interactive-dark border-y border-grey-light">
                {headerData.map((item, key) => <HeaderData {...item} key={key} />)}
            </div>

            <div className='h-16'></div>
        </div>
    );
};

export default Header;