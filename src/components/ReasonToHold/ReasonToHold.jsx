import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const ReasonToHold = ({ updated, album, setRefetch }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [reason, setreason] = useState(updated.reason || "");
  console.log(updated);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { _id } = updated;
    // delete updated._id;
    console.log(_id);
    const newupdated = { ...updated };
    // updated.ISRC = newIsrc;

    if (album?.songs?.length) {
      // console.log();
      const foundSong = album.songs.find((item) => item.isrc === updated.isrc);
      foundSong.reason = reason;

      // updatedSingleSong.status =
      // console.log(album);
      const newBody = {
        songName: foundSong.songName,
        userEmail: foundSong.userEmail,
        status: "On Hold",
        reason,
      };

      axios
        .put(backendUrl + "recent-uploads/" + album._id, album, config)
        .then(({ data }) => {
          setRefetch((ref) => !ref);
          if (data.acknowledged) {
            axios
              .post(backendUrl + "send-song-status", newBody)
              .then(({ data }) => {
                // console.log(data);
                Swal.close();
              });
          }
        });
    } else {
      newupdated.hold = true;
      newupdated.reason = reason;
      newupdated.status = "On Hold";
      // console.log(_id);
      axios
        .put(backendUrl + "songs/" + _id, updated, config)
        .then(({ data }) => {
          if (data.acknowledged) {
            axios
              .post(backendUrl + "send-song-status", updated)
              .then(({ data }) => {
                setRefetch((ref) => !ref);
                // if (data.acknowledged) {
                Swal.close();
                // }
              });
          }
        });
    }

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

export default ReasonToHold;
