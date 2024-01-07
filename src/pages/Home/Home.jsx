// import React from 'react';

import Header from "../../components/Header/Header";
import TopPerformer from "../../components/TopPerformer/TopPerformer";

const Home = () => {



    return (
        <div className='container'>
            <Header />


            <div className="flex gap-4 mt-4">
                <TopPerformer />
                <div className='w-7/12 h-[467px] bg-white rounded-[20px] custom-shadow'></div>
            </div>
        </div>
    );
};

export default Home;