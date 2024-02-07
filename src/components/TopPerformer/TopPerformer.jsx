// import React from 'react';

import Arrow from "../Arrow/Arrow";
// import rupees from "../../assets/icons/rupees.svg"
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../../constants";
// import { AppContext } from "../../contexts/AppContext";

const TopPerformer = () => {
    const [topPerformer, setTopPerformer] = useState({});
    // const { store } = useContext(AppContext);

    // console.log(store);

    useEffect(() => {
        axios.get(backendUrl + 'top-performer').then(({ data }) => setTopPerformer(data))
    }, []);
    const paid = topPerformer.amount || 0

    // console.log(topPerformer.amount);

    return (
        <div className='w-5/12 bg-white rounded-[20px] custom-shadow text-interactive-dark-hover flex flex-col justify-between'>
            {/* header */}

            <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-end border-b border-grey-light">
                <p className="text-[1.333rem]">Top Performing Artist</p>
                <Arrow increased={true} />
            </div>
            <div className="px-20 mt-5">
                <h5>{topPerformer.partner_name}</h5>
                <h6 className="my-2">{topPerformer.emailId}</h6>
                <h6>Phone number</h6>
                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h5 className="text-interactive-dark-confirmation">Revenue</h5>
                        <div className="flex gap-2 items-center">

                            <h5 className="font-bold">&#8377; {topPerformer?.lifetimeRevenue?.toFixed(2)}</h5>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <h5 className="text-interactive-dark-active">Paid</h5>
                        <div className="flex gap-2 items-center">

                            <h5 className="font-bold">&#8377; {paid}</h5>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <h5 className="text-interactive-light-destructive-focus">Due</h5>
                        <div className="flex gap-2 items-center">

                            <h5 className="font-bold">&#8377; {topPerformer?.lifetimeRevenue?.toFixed(2) - paid}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 flex justify-center border-t border-grey-light">
                <Button>See Details</Button>
            </div>
        </div>
    );
};

export default TopPerformer;