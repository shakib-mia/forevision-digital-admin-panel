import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const SentToStores = ({ updated }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [upc, setUpc] = useState(updated.upc || "");
  //   console.log(updated?.upc);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    updated.ISRC = newIsrc;
    updated.UPC = upc;

    // console.log(updated);
    // Swal.close();

    // formData.status = "Sent to Stores";
    // formData.isrc = newIsrc;

    // console.log({ ...updated, ...formData });
    const newBody = { ...updated, status: "Sent to Stores", isrc: newIsrc };

    // console.log(newBody);

    axios.post(backendUrl + "songs", newBody, config).then(({ data }) => {
      if (data.insertCursor.acknowledged) {
        axios
          .post(backendUrl + "send-song-status", newBody)
          .then(({ data }) => {
            // if (data.acknowledged) {
            Swal.close();
            // }
          });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        containerClassName={"text-left"}
        className={"mt-2"}
        label={"ISRC"}
        id={"isrc"}
        disabled={true}
        value={updated.isrc ? updated.isrc : newIsrc}
        onChange={(e) => setFormData({ ...formData, isrc: e.target.value })}
        placeholder={"Enter the Song's ISRC Here"}
      />

      <InputField
        containerClassName={"text-left mt-4"}
        className={"mt-2"}
        label={"UPC"}
        id={"UPC"}
        onChange={(e) => setUpc(e.target.value)}
        placeholder={"Enter the Song's UPC Here"}
        value={upc}
        disabled={updated?.upc}
      />

      <div className="flex justify-center mt-8">
        <Button type={"submit"}>Next</Button>
      </div>
    </form>
  );
};

export default SentToStores;
