import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import RequestPaymentItem from "../RequestPaymentItem/RequestPaymentItem";

const RequestPayment = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "disburse-payment")
      .then(({ data }) => setData(data));
  }, []);

  return (
    // <div className="my-4">
    <div className="w-1/2 bg-white rounded-[20px] custom-shadow text-interactive-dark-hover flex flex-col justify-between mx-auto">
      {/* header */}

      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Disburse Payment</p>
        {/* <Arrow increased={true} /> */}
      </div>

      {data.map((item) => (
        <RequestPaymentItem item={item} key={item._id} />
      ))}
    </div>
    // </div>
  );
};

export default RequestPayment;
