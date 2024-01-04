// import React from 'react';
import totalSongs from '../../assets/icons/total-songs.jpg';
import greenArrow from '../../assets/icons/green-arrow.svg';
// import redArrow from '../../assets/icons/red-arrow.svg';
import totalUsers from "../../assets/icons/total-users.jpg"
import totalRevenue from "../../assets/icons/total-revenue.png"
import dueRevenue from "../../assets/icons/due-revenue.jpg"

const Home = () => {
    const headerData = [
        {
            heading: "Total Songs",
            icon: totalSongs,
            count: 202546,
            progress: '+300 this month',
            progressIcon: greenArrow,
        },
        {
            heading: "Total Songs",
            icon: totalUsers,
            count: 202546,
            progress: '+300 this month',
            progressIcon: greenArrow,
        },
        {
            heading: "Total Songs",
            icon: totalRevenue,
            count: 202546,
            progress: '+300 this month',
            progressIcon: greenArrow,
        },
        {
            heading: "Total Songs",
            icon: dueRevenue,
            count: 202546,
            progress: '+300 this month',
            progressIcon: greenArrow,
        },
    ]


    return (
        <div className='container'>
            <div className="mt-4 bg-white rounded-[20px]">
                <div className="py-2 px-3">
                    <h6 className="text-grey">Performance </h6>
                </div>

                <div className="py-5 px-3 grid grid-cols-4 text-grey border-y border-grey-light">
                    {headerData.map((item, key) => <div className="flex gap-1" key={key}>
                        <img src={item.icon} className='w-[56px] h-[56px]' alt="total songs" />
                        <aside>
                            <p className='text-subtitle-1'>{item.heading}</p>
                            <h5>{item.count}</h5>
                            <div className="flex items-center relative -left-3 mt-[4px]">
                                <img src={item.progressIcon} alt="green-arrow" className='w-3' />
                                <p className='text-subtitle-1 font-semibold'>{item.progress}</p>
                            </div>
                        </aside>
                    </div>)}
                </div>

                <div className='h-[65px]'></div>
            </div>


            <div className="flex gap-4 mt-4">
                <div className='w-5/12 h-[467px] bg-white rounded-[20px]' style={{ boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)' }}></div>
                <div className='w-7/12 h-[467px] bg-white rounded-[20px]' style={{ boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)' }}></div>
            </div>
        </div>
    );
};

export default Home;