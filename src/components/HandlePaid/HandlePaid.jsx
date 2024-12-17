import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const SentToStores = ({ updated, setRefetch }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [trId, setTrId] = useState(updated.transactionId || "");
  //   console.log(updated?.reason);
  //   console.log(updated);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure _id from updated
    const { _id, ...updatedData } = updated;

    // Modify the updated object as needed
    updated.paid = true;
    updated.transactionId = trId;

    // If you need to exclude _id for the axios request:
    const newData = { ...updatedData, ISRC: newIsrc }; // Spread updatedData which excludes _id and make necessary changes

    // console.log("Updated Object (including _id):", updated);
    // console.log("_id:", _id);

    // Example of using newData without _id in the PUT request
    axios.put(backendUrl + `songs/${_id}`, newData, config).then(({ data }) => {
      if (data.acknowledged) {
        Swal.close();
        setRefetch((ref) => !ref);
      }
    });

    // formData.status = "Sent to Stores";
    // formData.isrc = newIsrc;

    // If you want to combine both objects
    // const newBody = { ...newData, ...formData };
    // console.log(newBody);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        containerClassName={"text-left mt-4"}
        className={"mt-2"}
        label={"Transaction Id"}
        id={"transactionId"}
        onChange={(e) => setTrId(e.target.value)}
        placeholder={"Enter the Transaction ID Here"}
        value={trId}
        // disabled={updated?.reason}
      />

      <div className="flex justify-center mt-8">
        <Button type={"submit"}>Next</Button>
      </div>
    </form>
  );
};

export default SentToStores;
