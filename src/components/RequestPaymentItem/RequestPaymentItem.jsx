// import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Button from "../Button/Button";

const RequestPaymentItem = ({ item }) => {
  const date = new Date();
  const [showModal, setShowModal] = useState(false);
  // const [item, set]

  const handleDisburse = () => {
    // console.log(date.getMonth());
    const month = date.getMonth() + 1;

    item.disbursed = true;
    item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    // console.log(item);

    axios
      .put("http://localhost:5000/disburse-payment/" + item._id, item)
      .then(({ data }) => console.log(data));
  };

  const handleDecline = () => {
    const month = date.getMonth() + 1;

    item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    const newData = { ...item };
    delete newData._id;

    axios
      .post("http://localhost:5000/disburse-payment/" + item._id, newData)
      .then(({ data }) => console.log(data));
  };

  return (
    <div className="grid grid-cols-3 p-4 text-center" key={item._id}>
      <p>{item.partner_name}</p>
      <p>&#8377; {item.lifetimeRevenue.toFixed(2)}</p>
      <div className="flex gap-3 justify-center">
        <button
          className="px-3 py-1 bg-interactive-light bg-opacity-30 text-interactive-light font-bold rounded-full text-button"
          onClick={() => setShowModal(true)}
        >
          Review
        </button>
        {showModal && (
          <Modal handleClose={() => setShowModal(false)}>
            <div className="text-center">
              <h5 className="font-medium">{item.partner_name}</h5>
              <h5 className="font-medium my-2">
                Total Songs: {item.isrc.split(",").length}
              </h5>
              <h5 className="font-medium">
                Lifetime Revenue: {item.lifetimeRevenue.toFixed(2)}
              </h5>
              {item["gst-url"] ? (
                <div className="flex">
                  <h5>GST Certificate</h5>
                  <img src={item["gst-url"]} alt="" />
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex justify-center">
                    Adhar Card:{" "}
                    <img src={item["adhar-url"]} alt="" className="w-1/2" />
                  </div>
                  <div className="flex justify-center">
                    PAN Card:{" "}
                    <img src={item["pan-url"]} alt="" className="w-1/2" />
                  </div>
                  <div className="flex justify-center">
                    Cancelled Cheque:{" "}
                    <img
                      src={item["cancelled-cheque-url"]}
                      alt=""
                      className="w-1/2"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <Button action="confirmation" onClick={handleDisburse}>
                  Disburse
                </Button>
                <Button action="destructive" onClick={handleDecline}>
                  Decline
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* <button
          disabled={item.disbursed}
          className={`${
            !item.disbursed
              ? "bg-interactive-light-destructive-focus text-interactive-light-destructive"
              : "bg-interactive-light-confirmation-focus text-interactive-light-confirmation cursor-not-allowed"
          } bg-opacity-35 px-3 py-1 rounded-full text-button`}
          onClick={handleDisburse}
        >
          {item.disbursed ? "Disbursed" : "Disburse"}
        </button>
        <button
          disabled={item.disbursed}
          className={`bg-interactive-light-destructive-focus text-interactive-light-destructive bg-opacity-35 px-3 py-1 rounded-full text-button`}
          onClick={handleDecline}
        >
          Decline
        </button> */}
      </div>
    </div>
  );
};

RequestPaymentItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RequestPaymentItem;
