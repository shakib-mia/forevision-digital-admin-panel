import { MdDownload } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl, config } from "../../constants";
// import SwalContent from "../SwalContent/SwalContent";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom";

import SwalContainer from "../InputSongDetails/InputSongDetails";
import InputSongDetails from "../InputSongDetails/InputSongDetails";
import SentToStores from "../SentToStores/SentToStores";
import { utils, writeFile } from "xlsx";
import { jsonToExcel } from "../../utils/jsonToExcel";
import { flattenObject } from "../../utils/flattenObject";
import { objectToKeyValueArray } from "../../utils/objectToKeyValueArray";
import ReasonToHold from "../ReasonToHold/ReasonToHold";
import HandlePaid from "../HandlePaid/HandlePaid";
import ReasonToReject from "../ReasonToReject/ReasonToReject";
import HandleTakedown from "../HandleTakedown/HandleTakedown";
import { AppContext } from "../../contexts/AppContext";

const SongsItem = ({ item, setRefetch }) => {
  const [selectedOption, setSelectedOption] = useState("Set Status");
  // const [platforms, setPlatforms] = useState([]);
  const { platforms } = useContext(AppContext);
  const options = [
    {
      value: "Sent to Stores",
      label: "Sent to Stores",
      color: "text-interactive-light-confirmation",
    },
    { value: "streaming", label: "Streaming", color: "text-interactive-light" },
    {
      value: "copyright-infringed",
      label: "Copyright Infringed",
      color: "text-interactive-dark-destructive-active",
    },
    {
      value: "taken-down",
      label: "Taken Down",
      color: "text-interactive-light-destructive",
    },
    {
      value: "rejected",
      label: "Rejected",
      color: "text-interactive-light-destructive",
    },
    {
      value: "paid",
      label: "Mark As Paid",
      color: "text-interactive-light",
    },

    {
      value: "on-hold",
      label: "Hold",
      color: "text-grey-dark",
    },
  ];

  // useEffect(() => {
  //   axios
  //     .get(backendUrl + "platforms/all")
  //     .then(({ data }) => setPlatforms(data));
  // }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    if (selectedOption !== "Set Status") {
      item.status = selectedOption;
      const updated = { ...item };

      const handleSwal = (Component, title) => {
        let swalContent = document.createElement("div");
        ReactDOM.render(
          <Component
            platforms={platforms}
            updated={updated}
            setRefetch={setRefetch}
          />,
          swalContent
        );

        Swal.fire({
          title: title,
          html: swalContent,
          showConfirmButton: false,
          customClass: {
            popup: "custom-swal-width",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            triggerFinalSwal(updated);
          }

          if (result.dismiss === Swal.DismissReason.backdrop) {
            setSelectedOption("Set Status");
          }
        });
      };

      console.log(selectedOption);

      if (selectedOption === "streaming") {
        handleSwal(InputSongDetails, "Input Song details");
      } else if (selectedOption === "Sent to Stores") {
        handleSwal(SentToStores, "Input Song details");
      } else if (selectedOption === "on-hold") {
        handleSwal(ReasonToHold, "Enter Reason");
      } else if (selectedOption === "paid") {
        handleSwal(HandlePaid, "Enter Transaction Id");
      } else if (selectedOption === "taken-down") {
        handleSwal(HandleTakedown, "Enter Reason for Taking Down");
      } else if (selectedOption === "copyright-infringed") {
        updated.status = "Copyright infringed";
        const { _id, ...updatedData } = updated;
        updatedData.status = "Copyright infringed";
        axios
          .put(`${backendUrl}songs/${_id}`, updatedData, config)
          .then(({ data }) => {
            if (data.acknowledged) {
              axios
                .post(backendUrl + "send-song-status", updatedData)
                .then(({ data }) => {
                  // if (data.acknowledged) {
                  Swal.close();
                  // }
                });
            }
          });
      } else if (selectedOption === "rejected") {
        handleSwal(ReasonToReject, "Enter Reason for Song Rejection");

        // handleSwal(HandlePaid, "Enter Transaction Id");

        // updated.rejected = true;
        // const { _id, ...updatedData } = updated;
        // axios
        //   .put(`http://localhost:5100/songs/${_id}`, updatedData, config)
        //   .then(({ data }) => {
        //     if (data.acknowledged) {
        //       updatedData.status = "Rejected";
        //       axios
        //         .post(backendUrl + "send-song-status", updatedData)
        //         .then(({ data }) => {
        //           // if (data.acknowledged) {
        //           Swal.close();
        //           // }
        //         });
        //     }
        //   });
      } else {
        // Handle default case if necessary
      }

      console.log(selectedOption);
    }
  }, [selectedOption]);

  const triggerFinalSwal = (updated) => {
    Swal.fire({
      title: `Mark the song as ${selectedOption}?`,
      // showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: "Save",
      // denyButtonText: `Don't save`,
      customClass: {
        confirmButton:
          "bg-interactive-light-confirmation hover:bg-interactive-light-confirmation-hover focus:bg-interactive-light-confirmation-focus text-white ring-interactive-light-confirmation",
        // denyButton:
        //   "bg-interactive-light-destructive hover:bg-interactive-light-destructive-hover focus:bg-interactive-light-destructive-focus text-white ring-interactive-light-destructive-hover",
      },
    }).then((result) => {
      // if (result.isConfirmed) {
      //   delete updated._id;
      //   axios
      //     .put(backendUrl + "handle-song-status/" + item._id, updated)
      //     .then(({ data }) => console.log(data));
      // } else if (result.isDenied) {
      //   Swal.fire("Changes are not saved", "", "info");
      // }
    });
  };

  // const downloadExcel = () => {
  //   // console.log(flattenObject(item));

  //   // Convert object into key-value array
  //   const keyValueArray = objectToKeyValueArray(flattenObject(item));
  //   console.log(keyValueArray);

  //   // Use the keyValueArray in the jsonToExcel function
  //   jsonToExcel(keyValueArray, "item.xlsx");
  // };

  const renameFields = (data) => {
    return data.map((item) => ({
      "CRBT CUT NAME": item.songName,
      "SONG NAME": item.songName,
      "FILM ALBUM NAME": item.albumTitle,
      LANGUAGE: item.language || "", // Example: you can modify this if language is available in the data
      "Album Type": item.albumType,
      "Content Type": item.contentType,
      Genre: item.genre,
      "Sub-Genre": item.subGenre,
      Mood: item.mood,
      Description: item.description,
      "UPC ID": item.UPC,
      ISRC: item.isrc,
      LABEL: item.recordLabel,
      "IPRS Ownership Label": "", // Dynamic values can be added here if needed
      "IPI Label": "",
      Publisher: item.publisher,
      "Album Level Main Artist Singer":
        item.artists.find((artist) => artist.role === "Singer/Primary Artist")
          ?.name || "",
      "Track Level Main Artist Singer":
        item.artists.find((artist) => artist.role === "Singer/Primary Artist")
          ?.name || "",
      "Track Level Featuring Artist Singer":
        item.artists.find((artist) => artist.role === "Featuring Artist")
          ?.name || "",
      "Track Level Remixer Name": "", // Additional fields can be added similarly
      Composer:
        item.artists.find((artist) => artist.role === "Composer")?.name || "",
      "IPRS Member Composer": "",
      "IPI Composer": "",
      Lyricist:
        item.artists.find((artist) => artist.role === "Lyricist")?.name || "",
      "IPI Lyricist": "",
      "IPRS Member Lyricist": "",
      "Track No": "",
      "Track Duration": "",
      "Time for CRBT Cut": "",
      "Original Release Date of Movie": "",
      "Original Release Date of Music": item.releaseDate,
      "Go Live Date": item.liveDate,
      "Time of Music Release": item.time,
      "Date of Expiry": "",
      "C Line": "",
      "P Line": "",
      "Film Banner": "",
      "Film Director": "",
      "Film Producer": "",
      "Film Star Cast Actors": "",
      "Parental Advisory": "",
      "Is Instrumental": false,
      "Spotify Artist Profile ID for Main Artist": "",
      "Spotify Artist Profile ID for Featured Artist": "",
      "Apple Artist ID for Main Artist": "",
      "Apple Artist ID for Remixer": "",
      "Apple Artist ID for Composer": "",
      "Apple Artist ID for Lyricist": "",
      "Apple Artist ID for Film Producer": "",
      "Apple Artist ID for Film Director": "",
      "Apple Artist ID for Starcast": "",
      "Facebook Page Link for Track Main Artist": "",
      "Instagram Artist Handle for Track Main Artist": "",
    }));
  };

  const downloadExcel = () => {
    // Step 1: Rename fields dynamically
    delete item._id;
    const renamedData = renameFields([item]);

    console.log(renamedData);

    const flattenedObject = flattenObject(renamedData[0]);

    // Create an array of keys and an array of values
    const keys = Object.keys(flattenedObject);
    const values = Object.values(flattenedObject);

    // Create the JSON data with keys in the first row and values in the second row
    const jsonData = [
      values.reduce((acc, value, index) => {
        acc[keys[index]] = value;
        return acc;
      }, {}),
    ];

    // Use the jsonData in the jsonToExcel function
    jsonToExcel(jsonData, "item.xlsx");
  };

  return (
    <div className="grid grid-cols-5 p-3 items-center text-center gap-2">
      <Link to={`/song/${item._id}`}>{item.songName}</Link>
      <p>{item.userEmail}</p>
      <p className={!item.status && "text-interactive-light-destructive"}>
        {item.status || "pending"}
      </p>
      <audio controls className="w-full max-w-md">
        <source src={item.songUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex gap-2 items-center">
        <MdDownload
          className="text-heading-6 cursor-pointer"
          onClick={downloadExcel}
        />
        <Dropdown
          options={options}
          selected={selectedOption}
          onSelectedChange={setSelectedOption}
        />
      </div>
    </div>
  );
};

export default SongsItem;
