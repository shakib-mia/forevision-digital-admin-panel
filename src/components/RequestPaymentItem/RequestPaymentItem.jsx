// import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import { AppContext } from "../../contexts/AppContext";
import RequestPaymentDetails from "../RequestPaymentDetails/RequestPaymentDetails";
import { Link } from "react-router-dom";

const RequestPaymentItem = ({ item }) => {
  const date = new Date();
  const { showModal, setShowModal } = useContext(AppContext);
  // const
  const [enlargedAadhar, setEnlargedAadhar] = useState(false);
  const [enlargedPan, setEnlargedPan] = useState(false);
  const [enlargedCancelled, setEnlargedCancelled] = useState(false);
  // const [item, set]

  // const handleDisburse = () => {
  //   // console.log(date.getMonth());
  //   const month = date.getMonth() + 1;

  //   item.disbursed = true;
  //   item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
  //   // console.log(item);

  //   axios
  //     .put("https://api.forevisiondigital.in/disburse-payment/" + item._id, item)
  //     .then(({ data }) => console.log(data));
  // };

  // const handleDecline = () => {
  //   const month = date.getMonth() + 1;

  //   item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
  //   const newData = { ...item };
  //   delete newData._id;

  //   // axios
  //   //   .post(
  //   //     "https://api.forevisiondigital.in/disburse-payment/" + item._id,
  //   //     newData
  //   //   )
  //   //   .then(({ data }) => console.log(data));
  // };

  return (
    <div className="grid grid-cols-3 p-4 text-center" key={item._id}>
      <p>{item.partner_name || item.first_name + " " + item.last_name}</p>
      <p>&#8377; {item.totalAmount}</p>
      <div className="flex gap-3 justify-center">
        <Link
          to={`/request-payment-details/${item._id}`}
          className="px-3 py-1 bg-interactive-light bg-opacity-30 text-interactive-light font-bold rounded-full text-button"
          // onClick={() => setShowModal(true)}
        >
          Review
        </Link>
        {/* {showModal && (
          <Modal handleClose={() => setShowModal(false)}>
            <RequestPaymentDetails {...item} />
          </Modal>
        )} */}

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
