import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import EditSongAction from "../EditSongAction/EditSongAction";
import { AppContext } from "../../contexts/AppContext";

const SongUpdateRequest = () => {
  const [requests, setRequests] = useState([]);
  const { updated, setUpdated, store } = useContext(AppContext);
  const [check, setCheck] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(-1);
  // const [selectedSong, setSelectedSong] = useState({});
  const [tab, setTab] = useState("Requests");

  useEffect(() => {
    axios
      .get(backendUrl + "edit-song", {
        headers: {
          token: store.token,
        },
      })
      .then(({ data }) => setRequests(data));
  }, [updated]);

  // useEffect(() => {
  //   axios.get(backendUrl + "songs/all", config).then(({ data }) => {
  //     console.log(data);
  //     if (data.length) {
  //       if (data.find((item) => item?.ISRC === requests[checkedIndex]?.ISRC)) {
  //         setSelectedSong(
  //           data.find((item) => item?.ISRC === requests[checkedIndex]?.ISRC)
  //         );
  //       }
  //     }
  //   });

  //   axios.get(backendUrl + "recent-uploads/admin", config).then(({ data }) => {
  //     console.log(data);
  //     if (data.length) {
  //       if (data.find((item) => item?.ISRC === requests[checkedIndex]?.ISRC)) {
  //         setSelectedSong(
  //           data.find((item) => item?.ISRC === requests[checkedIndex]?.ISRC)
  //         );
  //       }
  //     }
  //   });
  // }, [checkedIndex]);
  // const requested

  // console.log(requests.filter((item) => item.approved));

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-y-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Update Requests</p>
      </div>

      <ul className="flex divide-x border-b">
        <li
          className={`p-2 w-1/3 text-center py-4 cursor-pointer ${
            tab === "Requests" ? "bg-grey-light" : "bg-white"
          }`}
          onClick={() => setTab("Requests")}
        >
          Requests
        </li>
        <li
          className={`p-2 w-1/3 text-center py-4 cursor-pointer ${
            tab === "Approved" ? "bg-grey-light" : "bg-white"
          }`}
          onClick={() => setTab("Approved")}
        >
          Approved
        </li>
        <li
          className={`p-2 w-1/3 text-center py-4 cursor-pointer ${
            tab === "Denied" ? "bg-grey-light" : "bg-white"
          }`}
          onClick={() => setTab("Denied")}
        >
          Denied
        </li>
      </ul>

      <div className="p-4">
        <div
          className={`grid ${
            tab === "Denied" || tab === "Approved"
              ? "grid-cols-3"
              : "grid-cols-4"
          } text-center mb-4`}
        >
          <p>ISRC</p>
          <p>Song Name</p>
          <p>Email Id</p>
          {tab === "Denied" || tab === "Approved" ? <></> : <p>Action</p>}
        </div>

        {requests
          .filter((item) =>
            tab === "Requests"
              ? item.requested === true && !item.approved && !item.denied
              : tab === "Approved"
              ? item.approved === true
              : item.denied
          )
          .map(({ ISRC, Song, songName, emailId, _id, isrc }, id) => (
            <div
              className={`grid ${
                tab === "Denied" || tab === "Approved"
                  ? "grid-cols-3"
                  : "grid-cols-4"
              } text-center mb-2 items-center`}
              key={_id}
            >
              <p>{ISRC || isrc}</p>
              <p>{Song || songName}</p>
              <p>{emailId}</p>
              {tab === "Denied" || tab === "Approved" ? (
                <></>
              ) : (
                <Button
                  onClick={() => {
                    setCheck(true);
                    setCheckedIndex(id);
                  }}
                  containerClassName={"mx-auto"}
                >
                  Check
                </Button>
              )}
            </div>
          ))}
        {/* {} */}
      </div>
      {check && (
        <EditSongAction
          requests={requests}
          checkedIndex={checkedIndex}
          // selectedSong={selectedSong}
          setCheck={setCheck}
          setCheckedIndex={setCheckedIndex}
        />
      )}
    </div>
  );
};

export default SongUpdateRequest;
