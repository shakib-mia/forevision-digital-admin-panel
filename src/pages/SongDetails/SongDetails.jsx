// import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import { useLocation } from "react-router-dom";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import Button from "./../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";

const SongDetails = () => {
  const location = useLocation();
  const [tableData, setTableData] = useState({});
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const options = [
    {
      value: "sent-to-stores",
      label: "Sent to Stores",
      color: "text-interactive-light-confirmation",
    },
    { value: "streaming", label: "Streaming", color: "text-interactive-light" },
    {
      value: "copyright-infringed",
      label: "Copyright Infringed",
      color: "text-interactive-dark-destructive-active",
    },
    {
      value: "taken-down",
      label: "Taken Down",
      color: "text-interactive-light-destructive",
    },
  ];

  useEffect(() => {
    axios
      .get(
        backendUrl + "upload-song/by-id/" + location.pathname.split("/")[2],
        config
      )
      .then(({ data }) => setTableData(data));
  }, []);

  useEffect(() => {
    if (selectedOption !== "Select an option") {
      // console.log(selectedOption);
      // console.log(tableData);
      // clg
    } else {
      console.log("default");
    }
  }, [selectedOption]);

  return (
    <div className="w-3/4 mx-auto my-5 rounded-2xl bg-white shadow-[0px_0px_35px_#ccc] px-7">
      <div className="container mx-auto p-4">
        <h1 className="text-heading-1-bold font-bold mb-4 text-grey-dark text-center">
          Album Details
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <tbody>
            {Object.entries(tableData).map(([key, value]) => (
              <tr key={key} className="border border-grey divide-x divide-grey">
                <td className="px-4 py-2 font-medium text-gray-700">
                  {key
                    ? camelCaseToNormalText(
                        key === "accepted"
                          ? "t&cAccepted"
                          : key === "requested"
                          ? "refundRequested"
                          : key === "reason"
                          ? "reasonForRefund"
                          : key
                      )
                    : camelCaseToNormalText(key)}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {key === "artists" ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((artist, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-2">{artist.name}</td>
                            <td className="px-4 py-2">{artist.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : Array.isArray(value) ? (
                    value.map((item, index) => (
                      <div key={index} className="py-1">
                        <span>{item}</span>
                      </div>
                    ))
                  ) : key === "artWork" ? (
                    <img
                      src={value}
                      alt="Album Artwork"
                      className="max-w-xs h-auto"
                    />
                  ) : key === "songUrl" ? (
                    <audio controls className="w-full">
                      <source src={value} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <span>{value.toString()}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {tableData.payment_id?.length && (
          <div className="flex justify-center mt-10">
            <Button action={"confirmation"} onClick={handleMakeLive}>
              Make Live
            </Button>
          </div>
        )} */}

        <h4 className="mt-8">Actions</h4>
        {/* <select className="w-full px-5 py-5">
          <option
            className="text-interactive-light-confirmation"
            value="sent-to-stores"
          >
            Sent to Stores
          </option>
          <option className="text-interactive-light" value="streaming">
            streaming
          </option>
          <option
            className="text-interactive-dark-destructive-active"
            value="copyright-infringed"
          >
            copyright-infringed
          </option>
          <option
            className="text-interactive-light-destructive"
            value="taken-down"
          >
            taken-down
          </option>
        </select> */}

        {/* <div className="relative inline-block w-full">
          <select className="w-full px-5 py-5 appearance-none">
            <option value="sent-to-stores">Sent to Stores</option>
            <option value="streaming">streaming</option>
            <option value="copyright-infringed">copyright-infringed</option>
            <option value="taken-down">taken-down</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div> */}

        <Dropdown
          options={options}
          selected={selectedOption}
          onSelectedChange={setSelectedOption}
        />
      </div>
    </div>
  );
};

export default SongDetails;
