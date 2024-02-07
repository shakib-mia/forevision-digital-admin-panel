// import React from 'react';

// import DateInput from "../../components/DateInput/DateInput";
// import Arrow from "../../components/Arrow/Arrow";
// import DisbursePayment from "../../components/DisbursePayment/DisbursePayment";
import Header from "../../components/Header/Header";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import RequestPayment from "../../components/RequestPayment/RequestPayment";
import TopPerformer from "../../components/TopPerformer/TopPerformer";
import UploadAndActivity from "../../components/UploadAndActivity/UploadAndActivity";

const Home = () => {



    return (
        <div className='container'>
            <Header />


            <div className="flex gap-4 mt-4">
                <TopPerformer />
                {/* <div className='w-7/12 h-[467px] bg-white rounded-[20px] custom-shadow'>
                   <DateInput /> 

                </div> */}
                <UploadAndActivity />
            </div>

            <div className="flex my-4 gap-4">
                <RequestPayment />
                <PaymentHistory />
            </div>
        </div>
    );
};

export default Home;