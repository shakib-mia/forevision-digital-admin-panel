import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import Button from "./../../components/Button/Button";
import Modal from "./../../components/Modal/Modal";
import Select from "../Select/Select";

const RecordLabelRequests = () => {
  const [labels, setLabels] = useState([]);
  const [index, setIndex] = useState(-1);
  const [declineId, setDeclineId] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  // console.log(declineId);

  useEffect(() => {
    axios
      .get(backendUrl + "record-labels/all", config)
      .then(({ data }) => setLabels(data));
  }, []);

  // console.log(labels[index]);

  const handleApprove = (_id) => {
    // console.log(_id);
    // const body lab

    labels[index].status = "Active";
    // console.log(labels[index]);

    axios
      .put(backendUrl + "record-labels/" + _id, labels[index])
      .then(({ data }) => console.log(data));
  };

  const handleDecline = (_id) => {
    // e.preventd;
    // console.log(labels[index]);
    const label = labels.find((item) => item._id === _id);

    // console.log(label);

    const message = `Your Record Label Creation Request is declined for ${selectedValue}`;

    axios
      .post(backendUrl + "record-labels/" + _id, {
        message,
        emailId: label["Email ID"],
      })
      .then(({ data }) => console.log(data));
  };

  console.log(labels);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Record Labels</p>
      </div>
      <ul className="p-3 flex flex-col gap-1">
        {labels.map((item, key) => (
          <li
            className="grid grid-cols-2 items-center text-center"
            key={item._id}
          >
            <aside>{item["Sub-Label Name"]}</aside>
            <div className="flex items-center">
              <a href={item.pdf} target="_blank">
                <IoMdDownload />
              </a>
              <Button
                onClick={() => setIndex(key)}
                containerClassName={"mx-auto"}
              >
                Check
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {index >= 0 && (
        <Modal handleClose={() => setIndex(-1)} className={"!w-1/3 !h-fit"}>
          <ul className="flex flex-col justify-center items-center divide-y border rounded-xl">
            <li className="grid grid-cols-2 divide-x w-full">
              <aside className="p-3 text-right">
                <b>Sub Label:</b>
              </aside>{" "}
              <aside className="p-3">{labels[index]["Sub-Label Name"]}</aside>
            </li>

            <li className="grid grid-cols-2 divide-x w-full">
              <aside className="p-3 text-right">
                <b>Email ID:</b>
              </aside>{" "}
              <aside className="p-3">{labels[index]["Email ID"]}</aside>
            </li>

            <li className="grid grid-cols-2 divide-x w-full">
              <aside className="p-3 text-right">
                <b>Start Date:</b>
              </aside>{" "}
              <aside className="p-3">{labels[index]["Start Date"]}</aside>
            </li>

            <li className="grid grid-cols-2 divide-x w-full">
              <aside className="p-3 text-right">
                <b>Address:</b>
              </aside>{" "}
              <aside className="p-3">{labels[index]["address"]}</aside>
            </li>

            <li className="grid grid-cols-2 divide-x w-full">
              <aside className="p-3 text-right">
                <b>Phone No:</b>
              </aside>{" "}
              <aside className="p-3">{labels[index]["phoneNo"]}</aside>
            </li>
          </ul>

          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={() => handleApprove(labels[index]._id)}
              action={"confirmation"}
            >
              Approve
            </Button>
            <Button
              onClick={() => setDeclineId(labels[index]._id)}
              action={"destructive"}
            >
              Decline
            </Button>
          </div>
        </Modal>
      )}

      {declineId.length > 0 && (
        <Modal handleClose={() => setDeclineId("")} className={"w-1/4 h-1/2"}>
          <form
            className="py-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleDecline(declineId);
            }}
          >
            <Select
              placeholder="Enter a Reason to Decline"
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              options={[1, 2, 3, 4, 5, 6]}
            />

            <div className="flex justify-center mt-4">
              <Button>Submit</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RecordLabelRequests;
