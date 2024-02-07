import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../../constants';

const RequestPayment = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(backendUrl + 'disburse-payment').then(({ data }) => setData(data))
    }, []);

    const date = new Date();


    const handleDisburse = (item) => {
        // console.log(date.getMonth());
        const month = date.getMonth() + 1;

        item.disbursed = true;
        item.paymentDate = date.getDate() + '/' + month + '/' + date.getFullYear()
        // console.log(item);

        axios.put(backendUrl + 'disburse-payment/' + item._id, item).then(({ data }) => console.log(data))
    }


    const handleDecline = item => {
        const month = date.getMonth() + 1;

        item.paymentDate = date.getDate() + '/' + month + '/' + date.getFullYear()
        axios.post(backendUrl + 'disburse-payment/' + item._id, item).then(({ data }) => console.log(data))
    }


    return (
        // <div className="my-4">
        <div className='w-1/2 bg-white rounded-[20px] custom-shadow text-interactive-dark-hover flex flex-col justify-between mx-auto'>
            {/* header */}

            <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
                <p className="text-heading-6-bold">Disburse Payment</p>
                {/* <Arrow increased={true} /> */}
            </div>


            {data.map((item) => <div className="grid grid-cols-3 p-4 text-center" key={item._id}>
                <p>{item.mail}</p>
                <p>&#8377; {item.amount}</p>
                <p className='flex gap-3'>
                    <button disabled={item.disbursed} className={`${!item.disbursed ? 'bg-interactive-light-destructive-focus text-interactive-light-destructive' : 'bg-interactive-light-confirmation-focus text-interactive-light-confirmation cursor-not-allowed'} bg-opacity-35 px-3 py-1 rounded-full text-button`} onClick={() => handleDisburse(item)}>{item.disbursed ? 'Disbursed' : 'Disburse'}</button>
                    <button disabled={item.disbursed} className={`bg-interactive-light-destructive-focus text-interactive-light-destructive bg-opacity-35 px-3 py-1 rounded-full text-button`} onClick={() => handleDecline(item)}>Decline</button>
                </p>
            </div>)}
        </div>
        // </div>
    );
};

export default RequestPayment;