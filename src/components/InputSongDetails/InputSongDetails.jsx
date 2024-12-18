import React, { useContext, useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import axios from "axios";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import { AppContext } from "../../contexts/AppContext";
import Swal from "sweetalert2";

const InputSongDetails = ({
  platforms,
  updated,
  setRefetch,
  albumSelectedOption,
  album,
}) => {
  // console.log(albumSelectedOption);
  const [newIsrc, setNewIsrc] = useState("");
  const [formData, setFormData] = useState({ isrc: newIsrc });

  const parent = albumSelectedOption.length ? album : updated;
  const store = useContext(AppContext);

  const config = {
    headers: {
      token: store.token || sessionStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  const allowedPlatforms = [
    "JioSaavn",
    "Gaana",
    "Wynk Music",
    "Spotify",
    "Apple Music",
    "YouTube Topic",
    "YouTube Music",
    "Meta",
    "Hungama",
    "Amazon Music",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log();

    formData.status = "streaming";

    const newBody = { ...formData, ...parent };

    const selectedPlatforms = parent.selectedPlatforms.map((platform) =>
      platform.toLowerCase().replace(/\s+/g, "-")
    );

    const matchingKeys = Object.keys(formData).filter((key) => {
      const normalizedKey = key.toLowerCase().replace(/-/g, " ");
      return (
        selectedPlatforms.includes(normalizedKey) &&
        allowedPlatforms.includes(normalizedKey)
      );
    });

    newBody.availablePlatforms = matchingKeys;
    newBody.status = "streaming";
    delete newBody.hold;
    delete newBody.rejected;
    delete newBody.requested;
    delete newBody.reason;

    // Log formData and matchingKeys for debugging
    console.log("Form Data:", newBody);
    console.log("Matching Keys:", matchingKeys);

    // Calculate hasLinks: true if any platform URL exists in formData
    const hasLinks = matchingKeys.some((key) => formData[key]?.length > 0);
    // newBody.hasLinks = hasLinks;

    // console.log("Has Links:", hasLinks);
    // console.log(Object.keys(newBody).includes());
    parent.selectedPlatforms.map((item) =>
      console.log(Object.keys(newBody).includes(item))
    );

    if (!newBody.isrc) {
      newBody.isrc = newIsrc;
    }
    console.log(newBody);

    // if (matchingKeys.length > 0) {
    axios.post(backendUrl + "songs", newBody, config).then(({ data }) => {
      if (data.insertCursor?.acknowledged) {
        axios.post(backendUrl + "send-song-status", newBody).then(() => {
          setRefetch((ref) => !ref);
          Swal.close();
        });
      }
    });
  };

  useEffect(() => {
    parent.selectedPlatforms.map((item) => {
      const platformKey = item.includes(" ")
        ? item.split(" ").join("-").toLowerCase()
        : item.toLowerCase();

      if (allowedPlatforms.includes(platformKey)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [platformKey]: "",
        }));
      }
    });
  }, []);
  console.log(parent.selectedPlatforms);
  parent.selectedPlatforms.includes("YouTube Topic") ||
    parent.selectedPlatforms.push("YouTube Topic");

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {parent.selectedPlatforms.map((item) => {
          if (allowedPlatforms.includes(item)) {
            return (
              <InputField
                containerClassName={"text-left"}
                className={"mt-2"}
                label={`${item}'s URL`}
                id={`${item}-url`}
                onChange={(e) => {
                  // Update formData with the entered URL
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [item.includes(" ") ? item.split(" ").join("-") : item]:
                      e.target.value,
                  }));

                  // If the input is cleared, remove the platform key
                  if (!e.target.value) {
                    setFormData((prevFormData) => {
                      const { [item]: removed, ...rest } = prevFormData;
                      return rest;
                    });
                  }
                }}
                placeholder={`Enter the ${item}'s URL Here`}
                required={false}
              />
            );
          }
        })}
      </div>

      <Button type={"submit"}>Save</Button>
    </form>
  );
};

export default InputSongDetails;
