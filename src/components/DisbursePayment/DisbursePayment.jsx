// import React from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
// import axios from 'axios';
// import { backendUrl } from '../../constants';
// import { useContext } from 'react';
// import { AppContext } from '../../contexts/AppContext';

const DisbursePayment = () => {
    // const { store } = useContext(AppContext);

    const handleDisburse = e => {
        e.preventDefault();
        // const config = {
        //     headers: {
        //         token: store.token
        //     }
        // }

        // const body = {
        //     date: e.target.updateDate.value,
        //     amount: e.target.amount.value,
        //     user_email: e.target.email.value
        // }

        // axios.post(backendUrl + 'disburse-payment', body, config).then(({ data }) => console.log(data))
    }


    return (
        <form className="flex flex-col gap-4" onSubmit={handleDisburse}>
            <h6 className="font-semibold text-grey">Disburse Payment</h6>
            <InputField type="date" name="updateDate" />
            {/* <input type="date" name="date" className="w-full block border border-interactive-light-focus py-3 px-4 rounded-[0.25rem] text-interactive-light-focus text-paragraph-2 focus:outline-none cursor-pointer" /> */}
            {/* <input type="number" min={1000} className="w-full block border border-interactive-light-focus py-3 px-4 rounded-[0.25rem] text-interactive-light-focus text-paragraph-2 focus:outline-none" /> */}
            <InputField type="number" min={1000} name="amount" placeholder="Amount" />
            <InputField type="email" name="email" placeholder="Enter Client's Email Address" />

            <Button centered type="submit" action="destructive" disabled>Disburse</Button>
        </form>
    );
};

export default DisbursePayment;