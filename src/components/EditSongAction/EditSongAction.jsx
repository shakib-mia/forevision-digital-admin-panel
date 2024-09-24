import React from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import axios from "axios";
import { backendUrl } from "../../constants";

const EditSongAction = ({
  requests,
  checkedIndex,
  selectedSong,
  setCheck,
  setCheckedIndex,
}) => {
  //   console.log(selectedSong);
  // console.log({
  //   requests,
  //   checkedIndex,
  //   selectedSong,
  //   setCheck,
  //   setCheckedIndex,
  // });
  const selectedSong2 = { ...selectedSong };
  const request = { ...requests[checkedIndex] };

  delete selectedSong2._id;
  // delete request._id;
  delete request.emailId;
  const handleApprove = (e) => {
    // console.log(selectedSong);
    if (selectedSong.songUrl) {
      // new
      request.updated = true;
      axios
        .put(backendUrl + "edit-song/new/" + selectedSong._id, request)
        .then(({ data }) => {
          if (data.acknowledged) {
            setCheck(false);
            setCheckedIndex("");
          }
        });
    } else {
      // old
    }
  };

  delete request._id;
  delete request.updated;

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
            {Object.keys(request).map((key, index) => {
              const requestValue = request[key];
              const selectedValue = selectedSong2[key];

              return (
                <div key={index} className="p-2 w-full">
                  <strong>{camelCaseToNormalText(key)}:</strong>{" "}
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
                  ) : (
                    selectedValue
                  )}
                </div>
              );
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
                const requestValue = requests?.[checkedIndex]?.[key];
                const selectedValue = selectedSong2[key];

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
                      requestValue !== selectedValue
                        ? "bg-interactive-dark-destructive-hover text-white"
                        : ""
                    }`}
                  >
                    <strong>{key}:</strong> {/* {} */}
                    {Array.isArray(requestValue) ? (
                      key === "artists" ? (
                        // console.log(requestValue);
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
        <Button action={"destructive"}>Deny</Button>
      </div>
    </Modal>
  );
};

export default EditSongAction;
