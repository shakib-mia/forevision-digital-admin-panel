import React, { useState } from "react";
import Button from "../Button/Button";
import { LiaRupeeSignSolid } from "react-icons/lia";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";

const RefundRequestItem = ({
  songName,
  orderId,
  payment_id,
  isrc,
  _id,
  price,
  refundId,
  reason,
}) => {
  // console.log(songName);
  const [showRefund, setShowRefund] = useState(false);
  const handleRefund = () => {
    // alert(payment_id);
    axios
      .get(backendUrl + "refund/" + payment_id)
      .then(({ data }) => console.log(data))
      .catch((error) =>
        toast.error(error.response.data.error, {
          position: "bottom-center",
        })
      );
  };

  const fire = async () => {
    const { value: percentage } = await Swal.fire({
      title: "Refund",
      input: "text",
      text: reason,
      inputLabel: "Percentage",
      inputPlaceholder: "Enter Refund Percentage",
      confirmButtonText: "Refund",
      confirmButtonColor: "#22683E",
      denyButtonText: "Reject",
      customClass: {
        confirmButton: "rounded-full",
      },
    });
    if (percentage) {
      // Swal.fire(`Entered percentage: ${percentage}`);
      axios
        .post(backendUrl + "refund/" + payment_id, { percentage })
        .then(({ data }) => console.log(data))
        .catch((error) =>
          toast.error(error.response.data.error, {
            position: "bottom-center",
          })
        );
    }
  };

  return (
    <div className="grid grid-cols-5 text-center items-center font-medium">
      <div className="">{songName}</div>
      <div className="">{orderId}</div>
      <div className="">{isrc}</div>
      <div className="flex items-center justify-center gap-0">
        <LiaRupeeSignSolid />
        {price / 100}
      </div>
      <div className="flex gap-4 justify-center">
        {refundId && refundId?.length !== 0 ? (
          <Button action={"confirmation"} onClick={fire}>
            View
          </Button>
        ) : (
          <p className="px-5 py-3 text-interactive-dark-destructive-active font-medium">
            Refunded
          </p>
        )}
      </div>
    </div>
  );
};

export default RefundRequestItem;
