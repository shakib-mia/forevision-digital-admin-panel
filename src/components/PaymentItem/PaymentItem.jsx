// import React from 'react';

const PaymentItem = () => {
    return (
        <div className="grid grid-cols-3 p-4 text-center">
            <p>Md. Shakib Mia</p>
            <p>&#8377; 2500</p>
            <p>
                <button className="bg-interactive-light-destructive-focus bg-opacity-35 px-3 py-1 rounded-full text-interactive-light-destructive text-button">Disburse</button>
            </p>
        </div>
    );
};

export default PaymentItem;