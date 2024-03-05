import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../constants";

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(backendUrl + "history").then(({ data }) => setHistory(data));
  }, []);

  return (
    <div className="w-1/2 bg-white rounded-[20px] custom-shadow text-interactive-dark-hover flex flex-col justify-between mx-auto">
      {/* header */}

      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Payment History</p>
        {/* <Arrow increased={true} /> */}
      </div>

      <div className="grid grid-cols-4 p-4 text-center font-medium text-interactive-light">
        <p>Mail/Name</p>
        <p>Amount</p>
        <p>Status</p>
        <p>Date</p>
      </div>

      {history.map((item) => (
        <div
          className="grid grid-cols-4 p-4 text-center text-interactive-light-focus"
          key={item._id}
        >
          <p className="text-wrap">{item.partner_name}</p>
          <p className="text-wrap">&#8377; {item.lifetimeRevenue.toFixed(2)}</p>
          <p>
            {item.disbursed ? "Disbursed" : item.declined ? "Declined" : ""}
          </p>
          <p className="text-wrap">{item.paymentDate}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
