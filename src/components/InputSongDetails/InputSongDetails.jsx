import React, { useContext, useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import axios from "axios";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import { AppContext } from "../../contexts/AppContext";
import Swal from "sweetalert2";

const InputSongDetails = ({ platforms, updated }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [formData, setFormData] = useState({ isrc: newIsrc });

  const store = useContext(AppContext);

  const config = {
    headers: {
      token: store.token || localStorage.getItem("token"),
    },
  };
  // console.log(store);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);
  // console.log(updated);
  const handleSubmit = (e) => {
    e.preventDefault();

    formData.status = "streaming";
    formData.isrc = newIsrc;

    // console.log({ ...updated, ...formData });
    const newBody = { ...updated, ...formData };
    console.log(newBody);

    const selectedPlatforms = newBody.selectedPlatforms.map((platform) =>
      platform.toLowerCase().replace(/\s+/g, "-")
    );

    const matchingKeys = Object.keys(newBody).filter((key) => {
      const normalizedKey = key.toLowerCase().replace(/-/g, " ");
      return selectedPlatforms.includes(normalizedKey);
    });

    // console.log(matchingKeys);
    newBody.availablePlatforms = matchingKeys;
    newBody.status = "streaming";
    delete newBody.hold;
    delete newBody.rejected;
    delete newBody.requested;
    delete newBody.reason;

    // console.log(config);

    axios.post(backendUrl + "songs", newBody, config).then(({ data }) => {
      console.log(data);
      // if (data.insertCursor) {
      if (data.insertCursor.acknowledged) {
        axios
          .post(backendUrl + "send-song-status", newBody)
          .then(({ data }) => {
            // if (data.acknowledged) {
            Swal.close();
            // }
          });
      }
      // }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* <InputField
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
          containerClassName={"text-left"}
          className={"mt-2"}
          label={"UPC"}
          id={"UPC"}
          onChange={(e) => setFormData({ ...formData, upc: e.target.value })}
          placeholder={"Enter the Song's UPC Here"}
        /> */}

        {updated.selectedPlatforms.map((item) => (
          <InputField
            containerClassName={"text-left"}
            className={"mt-2"}
            label={item + "'s URL"}
            id={`${item}-url`}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setFormData({
                  ...formData,
                  [item.includes(" ")
                    ? `${item.split(" ").join("-").toLowerCase()}`
                    : item.toLowerCase()]: e.target.value,
                });
                // console.log({ ...updated, ...formData });
              } else {
                delete formData[
                  item.includes(" ")
                    ? `${item.split(" ").join("-").toLowerCase()}`
                    : item.toLowerCase()
                ];

                // console.log({ ...updated, ...formData });
              }
            }}
            placeholder={`Enter the ${item}'s URL Here`}
            required={false}
          />
        ))}
      </div>

      <Button type={"submit"}>Save</Button>
    </form>
  );
};

export default InputSongDetails;
