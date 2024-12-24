import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import Button from "../Button/Button";

const RoyaltySplitRequest = () => {
  const [splits, setSplits] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active accordion item
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    axios
      .get(backendUrl + "royalty-splits", config)
      .then(({ data }) => setSplits(data));
  }, [refetch]);

  // Toggle accordion
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleApprove = (_id) => {
    // alert(_id);
    const split = splits.find((song) => song._id === _id);
    split.confirmed = true;
    if (Object.keys(split).includes("denied")) {
      delete split.denied;
    }
    // console.log(split);
    axios.put(backendUrl + "royalty-splits/" + _id, split).then(({ data }) => {
      if (data.message.length) {
        setRefetch(new Date().getTime()); // Use a unique value like a timestamp
      }
    });
  };

  const handleDeny = (_id) => {
    // alert(_id);
    const split = splits.find((song) => song._id === _id);
    split.denied = true;

    if (Object.keys(split).includes("approved")) {
      delete split.approved;
    }
    axios.put(backendUrl + "royalty-splits/" + _id, split).then(({ data }) => {
      if (data.message.length) {
        setRefetch(new Date().getTime()); // Use a unique value like a timestamp
      }
    });
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[1000px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Royalty Splits</p>
      </div>

      <div className="grid grid-cols-2 text-center py-4">
        <p>ISRC</p>
        <p>User</p>
        <p></p>
      </div>

      {splits.map((item, index) => (
        <div key={item._id} className="text-black">
          {/* Accordion Header */}
          <div
            onClick={() => handleToggle(index)}
            className="grid grid-cols-2 text-center cursor-pointer border-t border-grey-light py-4"
          >
            <p>{item.isrc}</p>
            <p>{item.owner}</p>
          </div>

          {/* Accordion Content */}
          <div
            className={`px-4 bg-grey-light overflow-hidden transition-all duration-500 ${
              activeIndex === index ? "max-h-[1000px] py-4" : "max-h-0 py-0"
            }`}
          >
            <div className="w-1/2 mx-auto">
              <p>
                <strong>Owner Email:</strong> {item.owner}
              </p>
              <div className="w-full mt-2">
                <strong>Splits:</strong>
                <table className="border divide-y w-full">
                  <tr className="divide-x text-interactive-dark">
                    <th className="p-2">Email ID</th>
                    <th className="p-2">Percentage</th>
                  </tr>
                  {item.splits.map((split, idx) => (
                    <tr key={idx} className="divide-x">
                      <td className="p-2">{split.emailId}</td>
                      <td className="p-2">{split.percentage}%</td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="flex gap-2 mt-5 justify-center">
                <Button
                  onClick={() => handleApprove(item._id)}
                  action={"confirmation"}
                  disabled={item.denied || item.confirmed}
                >
                  Approve{item.confirmed && "d"}
                </Button>
                <Button
                  onClick={() => handleDeny(item._id)}
                  action={"destructive"}
                  disabled={item.denied || item.confirmed}
                >
                  Den{item.denied ? "ied" : "y"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoyaltySplitRequest;
