import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";

const RoyaltySplitRequest = () => {
  const [splits, setSplits] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active accordion item

  useEffect(() => {
    axios
      .get(backendUrl + "royalty-splits", config)
      .then(({ data }) => setSplits(data));
  }, []);

  // Toggle accordion
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
        <div key={item._id}>
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
            <p>
              <strong>Owner Email:</strong> {item.owner}
            </p>
            <div>
              <strong>Splits:</strong>
              <table className="border divide-y">
                <tr className="divide-x">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoyaltySplitRequest;
