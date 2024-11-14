import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import Button from "../Button/Button";
import RefundRequestsItem from "./../RefundRequestItem/RefundRequestItem";
import { AiOutlineLoading } from "react-icons/ai";

const RefundRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "refund", config)
      .then(({ data }) => setRequests(data));
  }, []);

  // console.log(requests);
  // requests.map((item) => console.log(item));

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-96 max-h-96 overflow-y-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <h6 className="text-heading-6-bold">Refund Requests</h6>
        {/* <Arrow increased={true} /> */}
      </div>
      {/* refund */}

      <div className="grid grid-cols-5 text-center py-4">
        <h6>Song Name</h6>
        <h6>Order ID</h6>
        <h6>ISRC</h6>
        <h6>Amount</h6>
        <h6>Action</h6>
      </div>
      {requests.length > 0 ? (
        <ul className="flex flex-col gap-1 py-4">
          {requests.map((item) =>
            item._id.length > 0 ? <RefundRequestsItem {...item} /> : <></>
          )}
        </ul>
      ) : (
        <div className="flex justify-center">
          <AiOutlineLoading className="text-heading-4 text-center animate-spin" />
        </div>
      )}
    </div>
  );
};

export default RefundRequests;
