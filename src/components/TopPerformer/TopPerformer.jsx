// import React from 'react';

import Arrow from "../Arrow/Arrow";
import rupees from "../../assets/icons/rupees.svg"
import Button from "../Button/Button";

const TopPerformer = () => {
    return (
        <div className='w-5/12 h-[467px] bg-white rounded-[20px] custom-shadow text-interactive-dark-hover flex flex-col justify-between'>
            {/* header */}

            <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-end border-b border-grey-light">
                <p className="text-[1.333rem]">Top Performing Artist</p>
                <Arrow increased={true} />
            </div>
            <div className="px-20 mt-5">
                <h5>Artist Name And Surname</h5>
                <h6 className="my-2">E-mail ID@email.com</h6>
                <h6>Phone number</h6>
                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h5 className="text-interactive-dark-confirmation">Revenue</h5>
                        <div className="flex gap-2 items-center">
                            <img src={rupees} alt="rupees" className="h-6 w-auto" />
                            <h5 className="font-bold">20,25,589</h5>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <h5 className="text-interactive-dark-active">Paid</h5>
                        <div className="flex gap-2 items-center">
                            <img src={rupees} alt="rupees" className="h-6 w-auto" />
                            <h5 className="font-bold">20,25,589</h5>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <h5 className="text-interactive-light-destructive-focus">Due</h5>
                        <div className="flex gap-2 items-center">
                            <img src={rupees} alt="rupees" className="h-6 w-auto" />
                            <h5 className="font-bold">20,25,589</h5>
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