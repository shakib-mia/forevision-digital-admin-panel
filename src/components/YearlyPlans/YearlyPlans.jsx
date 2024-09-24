import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import Button from "./../Button/Button";
import InputField from "../InputField/InputField";
import { IoIosSend } from "react-icons/io";
import Swal from "sweetalert2";

const YearlyPlans = () => {
  const [requests, setRequests] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [declineReason, setDeclineReason] = useState("");
  // delete selectedItem._id;

  useEffect(() => {
    axios
      .get(backendUrl + "yearly-plans")
      .then(({ data }) => setRequests(data));
  }, []);

  // console.log(selectedItem);

  const sendPaymentLink = (e) => {
    e.preventDefault();

    // console.log(selectedItem);
    axios
      .post(backendUrl + "razorpay/send-link/" + selectedItem._id, {
        link: e.target.paymentLink.value,
      })
      .then(({ data }) => console.log(data));
  };

  const handleApprove = () => {
    // console.log(selectedItem);
    selectedItem.approved = true;
    selectedItem.yearlyPlanStartDate = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;
    selectedItem.yearlyPlanEndDate = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear() + 1}`;

    const newData = { ...selectedItem };

    delete newData._id;

    // console.log(selectedItem, newData);
    axios
      .put(backendUrl + "yearly-plans/" + selectedItem._id, newData)
      .then(({ data }) => console.log(data));
  };

  const handleDecline = (emailId, id) => {
    console.log(emailId, id);

    if (declineReason.length > 0) {
      axios
        .post(backendUrl + "yearly-plans/delete/" + id, {
          emailId,
          declineReason,
        })
        .then(({ data }) => console.log(data));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You've forgot to enter the reason of decline",
      });
    }
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Yearly Plan Requests</p>
      </div>
      {/* {requests.length} */}
      <div className="grid grid-cols-3 text-center">
        <p>Email ID</p>
        <p>Phone No.</p>
        <p></p>
      </div>

      {requests.map((item) => (
        <div className="grid grid-cols-3 text-center p-4">
          <p>{item.emailId}</p>
          <p>{item.phoneNo}</p>
          <p>
            <BsBoxArrowUpRight
              className="cursor-pointer"
              onClick={() => setSelectedItem(item)}
            />
          </p>
        </div>
      ))}

      {selectedItem.phoneNo && (
        <Modal
          className={"w-2/5 text-heading-6 text-black"}
          handleClose={() => setSelectedItem({})}
        >
          <h4 className="text-heading-4-bold mb-2 p-4">Yearly Upload</h4>
          <p className="pl-4 text-paragraph-1">
            Email Id: <b>{selectedItem.emailId}</b>
          </p>
          <p className="pl-4 mt-1 text-paragraph-1">
            Phone No.: <b>{selectedItem.phoneNo}</b>
          </p>
          {/* <ul className="grid grid-cols-12 text-center">
            {Object.keys(selectedItem).map(
              (item) => item !== "_id" && <li>{camelCaseToNormalText(item)}</li>
            )}
          </ul> */}

          <ul className="grid grid-cols-2 gap-0 mt-4">
            {/* <li className="grid grid-cols-12">
              {Object.values(selectedItem).map(
                (it) =>
                  typeof it !== "boolean" && (
                    <li className="text-center text-wrap">
                      {it.includes("http") ? <a href={it}>Open</a> : it}
                    </li>
                  )
              )}
            </li> */}
            {Object.entries(selectedItem)
              .slice(2, Object.entries(selectedItem).length - 1)
              .map((item, key) => (
                <li className="p-4" key={key}>
                  <aside className="font-bold">
                    {camelCaseToNormalText(item[0])}:
                  </aside>
                  <aside className="">
                    {item[1].includes("https") ? (
                      <a
                        target="_blank"
                        className="text-interactive-light border-b hover:border-none"
                        rel="noreferrer"
                        href={item[1]}
                      >
                        Open
                      </a>
                    ) : (
                      item[1]
                    )}
                  </aside>
                </li>
              ))}
          </ul>

          <form onSubmit={sendPaymentLink} className="flex items-end">
            <InputField
              label={"Payment Link"}
              name={"paymentLink"}
              containerClassName={"mt-4 mx-2 w-11/12"}
            />
            <Button type={"submit"} containerClassName={"w-1/12"}>
              <IoIosSend className="text-heading-6" />
            </Button>
          </form>

          {/* <form onSubmit={sendPaymentLink} className="flex items-end"> */}
          <InputField
            label={"Reason (If Decline)"}
            onChange={(e) => setDeclineReason(e.target.value)}
            containerClassName={"mt-4 mx-2 w-11/12"}
          />
          <div className="flex gap-4 justify-center mt-4">
            <Button onClick={handleApprove} action={"confirmation"}>
              Approve
            </Button>
            <Button
              onClick={() =>
                handleDecline(selectedItem.emailId, selectedItem._id)
              }
              action={"destructive"}
            >
              Deny
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default YearlyPlans;
