import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const ReasonToReject = ({ updated, setRefetch }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [reason, setreason] = useState(updated.reason || "");
  //// console.log(updated);

  //   useEffect(() => {
  //     axios
  //       .get(backendUrl + "generate-isrc")
  //       .then(({ data }) => setNewIsrc(data.newIsrc));
  //   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { _id } = updated;
    // delete updated._id;
    const newUpdated = { ...updated };
    delete newUpdated._id;
    // updated.ISRC = newIsrc;
    updated.hold = true;
    updated.reason = reason;
    updated.status = "Rejected";

    axios
      .put(backendUrl + "songs/" + _id, newUpdated, config)
      .then(({ data }) => {
        if (data.acknowledged) {
          axios
            .post(backendUrl + "send-song-status", updated)
            .then(({ data }) => {
              if (data.acknowledged) {
                setRefetch((ref) => !ref);
                Swal.close();
              }
            });
        }
      });

    // formData.status = "Sent to Stores";
    // formData.isrc = newIsrc;

    // // console.log({ ...updated, ...formData });
    // const newBody = { ...updated, ...formData };

    // console.log(config);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        containerClassName={"text-left mt-4"}
        className={"mt-2"}
        label={"reason"}
        id={"reason"}
        onChange={(e) => setreason(e.target.value)}
        placeholder={"Enter the Song rejection reason Here"}
        value={reason}
        // disabled={updated?.reason}
      />

      <div className="flex justify-center mt-8">
        <Button type={"submit"}>Next</Button>
      </div>
    </form>
  );
};

export default ReasonToReject;
