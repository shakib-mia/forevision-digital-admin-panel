import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";

const TakedownRequests = () => {
  const [requests, setRequests] = useState([]);
  const [takedown, showTakedown] = useState(-1);

  useEffect(() => {
    axios
      .get(backendUrl + "takedown-requests")
      .then(({ data }) => setRequests(data));
  }, []);

  const handleTakedown = (_id, isrc) => {
    console.log(_id, isrc);
    axios
      .put(backendUrl + "takedown-requests/" + _id, { isrc })
      .then(({ data }) => showTakedown(-1));
  };

  // console.log(requests);

  return (
    <div className="bg-white rounded-[20px] custom-shadow  text-interactive-dark-hover h-[500px] overflow-y-auto">
      {takedown > -1 && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur flex justify-center items-center">
          <div className="w-1/2 h-1/2 shadow-lg bg-white relative p-3 text-black">
            <button
              className="text-black text-heading-5 absolute top-0 right-3"
              onClick={() => showTakedown(-1)}
            >
              &times;
            </button>

            <h5 className="font-medium text-center">Takedown Reason</h5>
            <div className="border divide-y divide-black mt-4">
              <div className="grid grid-cols-2 divide-x divide-black">
                <p className="p-3">Reason</p>
                <p className="p-3">{requests[takedown].reason}</p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-black">
                <p className="p-3">Platforms to Takedown</p>
                <p className="p-3">{requests[takedown].platformsToDelete}</p>
              </div>
            </div>

            <Button
              onClick={() =>
                handleTakedown(requests[takedown]._id, requests[takedown].isrc)
              }
              containerClassName={"mt-2 mx-auto"}
              action={"destructive"}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Takedown Requests</p>
      </div>

      <div className="grid grid-cols-4 text-center py-4">
        <p>ISRC</p>
        <p>Reason</p>
        <p>Email ID</p>
        <p></p>
      </div>

      {requests.map((item, id) => (
        <div
          className="grid grid-cols-4 items-center text-center py-4"
          key={item._id}
        >
          <p>{item.isrc}</p>
          <p>{item.reason}</p>
          <p>{item.emailId}</p>
          <Button
            onClick={() => showTakedown(id)}
            // onClick={() => handleTakedown(item._id, item.isrc)}
            action={"destructive"}
          >
            Takedown
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TakedownRequests;
