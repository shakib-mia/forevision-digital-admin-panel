import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import axios from "axios";
import { backendUrl } from "../../constants";
import Swal from "sweetalert2";
import { AppContext } from "../../contexts/AppContext";

const EditSongAction = ({
  requests,
  checkedIndex,
  // selectedSong,
  setCheck,
  setCheckedIndex,
}) => {
  // console.log(selectedSong);
  // console.log({
  //   requests,
  //   checkedIndex,
  //   selectedSong,
  //   setCheck,
  //   setCheckedIndex,
  // });
  const { updated, setUpdated } = useContext(AppContext);

  const selectedSong = requests.filter(
    (item) => item.requested === true && !item.approved && !item.denied
  )[checkedIndex];
  const selectedSong2 = { ...selectedSong };
  const request = {
    ...requests.filter(
      (item) => item.requested === true && !item.approved && !item.denied
    )[checkedIndex],
  };

  delete selectedSong2._id;
  // delete request._id;
  // delete request.emailId;
  const handleApprove = (e) => {
    // console.log(selectedSong);
    delete request.requested;
    request.approved = true;
    if (Object.keys(request).includes("denied")) {
      delete request.denied;
    }

    if (!selectedSong["S.no"]) {
      // new
      // request.updated = true;
      axios
        .put(backendUrl + "edit-song/new/" + selectedSong._id, request)
        .then(({ data }) => {
          // console.log("closing");
          // if (data.acknowledged) {
          setCheck(false);
          setCheckedIndex("");
          setUpdated(!updated);
          Swal.fire({
            text: "Edit request has ben approved successfully",
            icon: "success",
          });
          // }
        });
    } else {
      // old
      // console.log("editing old song");
      // console.log(selectedSong);
      // request.approved = true;
      delete selectedSong.S;

      axios
        .put(backendUrl + "edit-song/old/" + selectedSong._id, request)
        .then(({ data }) => {
          // console.log("closing");
          // if (data.acknowledged) {
          setCheck(false);
          setCheckedIndex("");
          setUpdated(!updated);
          Swal.fire({
            text: "Edit request has ben approved successfully",
            icon: "success",
          });
          // }
        });
    }
  };

  delete request._id;
  delete request.updated;

  delete selectedSong2.selectedPlatforms;
  delete request.selectedPlatforms;
  const [oldSong, setOldSong] = useState({});
  // console.log(selectedSong2, request);

  useEffect(() => {
    if (request.ISRC || request.isrc) {
      axios
        .get(backendUrl + "songs/by-isrc/" + (request.ISRC || request.isrc))
        .then(({ data }) => {
          delete data.S;
          setOldSong(data);
        });
    } else {
      axios
        .get(backendUrl + "songs/by-order-id/" + request.orderId)
        .then(({ data }) => {
          delete data.S;
          setOldSong(data);
        });
    }
  }, [request.ISRC]);
  delete selectedSong2.S;
  // delete selectedSong2.artists;
  // console.log(oldSong);
  // console.log(selectedSong2);

  const handleDeny = (e) => {
    request.denied = true;
    delete request.requested;
    // console.log(request);
    axios
      .put(backendUrl + "edit-song/new/" + selectedSong._id, request)
      .then(({ data }) => {
        // console.log("closing");
        // if (data.acknowledged) {
        setCheck(false);
        setCheckedIndex("");
        setUpdated((upd) => !upd);
        Swal.fire({
          text: "Edit request has ben denied successfully",
          icon: "success",
        });
        // }
      });
  };

  return (
    <Modal
      handleClose={() => {
        setCheck(false);
        setCheckedIndex("");
      }}
    >
      <h3 className="text-heading-3-bold text-center mt-4 text-interactive-light">
        {selectedSong2.Song}
      </h3>
      <div className="flex w-full gap-6 p-5 mt-2">
        <aside className="w-1/2">
          <h4 className="text-heading-4-bold uppercase mb-6 text-interactive-light-destructive-focus pl-4 text-center">
            Old
          </h4>
          <div className="border p-4 pt-0 overflow-y-auto px-2 rounded h-[378px] song-container">
            {Object.keys(oldSong).map((key, index) => {
              const requestValue = request[key];
              const selectedValue = key === "artists" ? "" : oldSong[key];
              // if (key === "artists") {
              //   delete oldSong[key];
              // }
              // console.log(oldSong);
              if (key !== "_id") {
                return (
                  <div key={index} className="p-2 w-full">
                    <strong>
                      {key === "ISRC" || key === "UPC"
                        ? key
                        : camelCaseToNormalText(key)}
                      :
                    </strong>{" "}
                    {Array.isArray(requestValue) ? (
                      key === "artists" ? (
                        <ul>
                          {requestValue.map((artist, idx) => (
                            <li key={idx}>
                              {artist.name} - {artist.role}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        // Handling other arrays (e.g., selectedPlatforms)
                        <ul>
                          {requestValue.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )
                    ) : key === "selectedPlatforms" ? (
                      selectedValue.join(", ")
                    ) : (
                      selectedValue
                    )}
                  </div>
                );
              }
            })}
          </div>
        </aside>
        <aside className="w-1/2">
          <h4 className="text-heading-4-bold uppercase mb-6 text-interactive-light-confirmation-focus pl-4 text-center">
            Updated
          </h4>
          <div className="border overflow-y-auto pb-4 rounded h-[378px] song-container">
            {selectedSong2.Song || selectedSong2.songName ? (
              Object.keys(selectedSong2).map((key, index) => {
                const requestValue = selectedSong2?.[key];
                const selectedValue = oldSong[key];

                if (requestValue === undefined) {
                  return (
                    <div key={index} className="p-2 w-full">
                      <strong>{camelCaseToNormalText(key)}:</strong>{" "}
                      <span>Loading...</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className={`p-2 w-full ${
                      JSON.stringify(requestValue) !==
                      JSON.stringify(selectedValue)
                        ? "bg-interactive-dark-destructive-hover text-white"
                        : ""
                    }`}
                  >
                    <strong>{key}:</strong>{" "}
                    {Array.isArray(requestValue) ? (
                      key === "artists" ? (
                        <ul>
                          {requestValue.map((artist, idx) => (
                            <li key={idx}>
                              {artist.name} - {artist.role}
                            </li>
                          ))}
                        </ul>
                      ) : key === "selectedPlatforms" ? (
                        <ul>
                          {requestValue.map((platform, idx) => (
                            <li key={idx}>{platform}</li>
                          ))}
                        </ul>
                      ) : (
                        <ul>
                          {requestValue.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )
                    ) : (
                      requestValue
                    )}
                  </div>
                );
              })
            ) : (
              <>Loading...</>
            )}
          </div>
        </aside>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <Button onClick={handleApprove} action={"confirmation"}>
          Approve
        </Button>
        <Button onClick={handleDeny} action={"destructive"}>
          Deny
        </Button>
      </div>
    </Modal>
  );
};

export default EditSongAction;
