import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import EditSongAction from "../EditSongAction/EditSongAction";

const SongUpdateRequest = () => {
  const [requests, setRequests] = useState([]);
  const [check, setCheck] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const [selectedSong, setSelectedSong] = useState({});

  useEffect(() => {
    axios
      .get(backendUrl + "edit-song", config)
      .then(({ data }) => setRequests(data));
  }, []);

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

  // console.log(requests);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-y-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Update Requests</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 text-center mb-4">
          <p>ISRC</p>
          <p>Song Name</p>
          <p>Email Id</p>
          <p>Action</p>
        </div>

        {requests.map(({ ISRC, Song, songName, emailId, _id, isrc }, id) => (
          <div
            className="grid grid-cols-4 text-center mb-2 items-center"
            key={_id}
          >
            <p>{ISRC || isrc}</p>
            <p>{Song || songName}</p>
            <p>{emailId}</p>
            <Button
              onClick={() => {
                setCheck(true);
                setCheckedIndex(id);
              }}
              containerClassName={"mx-auto"}
            >
              Check
            </Button>
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
