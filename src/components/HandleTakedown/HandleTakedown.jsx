import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const HandleTakedown = ({ updated, album }) => {
  const [newIsrc, setNewIsrc] = useState("");
  const [reason, setreason] = useState(updated.reason || "");
  console.log(album);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  console.log(updated);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newUpdate = { ...updated };
  //   const { _id } = newUpdate;
  //   delete updated._id;
  //   // updated.ISRC = newIsrc;
  //   updated.hold = true;
  //   updated.reason = reason;
  //   updated.status = "Taken Down";
  //   console.log(_id);
  //   axios.put(backendUrl + "songs/" + _id, updated, config).then(({ data }) => {
  //     if (data.acknowledged) {
  //       axios
  //         .post(backendUrl + "send-song-status", updated)
  //         .then(({ data }) => {
  //           // if (data.acknowledged) {
  //           Swal.close();
  //           // }
  //         });
  //     }
  //   });

  //   // formData.status = "Sent to Stores";
  //   // formData.isrc = newIsrc;

  //   // // console.log({ ...updated, ...formData });
  //   // const newBody = { ...updated, ...formData };

  //   // console.log(config);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (album.songs?.length) {
      // console.log();
      const song = album.songs.find((item) => item.isrc === updated.isrc);
      // updatedSingleSong.status =
      // console.log(album);
      const { userEmail } = album;

      const newBody = {
        songName: song.songName,
        userEmail,
        status: "Taken Down",
        reason,
      };

      console.log({ album, newBody });

      axios
        .put(backendUrl + "recent-uploads/" + album._id, album, config)
        .then(({ data }) => {
          console.log(data);
          if (data.acknowledged) {
            axios
              .post(backendUrl + "send-song-status", newBody)
              .then(({ data }) => {
                if (data.acknowledged) {
                  Swal.close();
                }
              });
          }
        });
    } else {
      const newUpdate = { ...updated };
      const { _id } = newUpdate;
      delete updated._id;
      // updated.ISRC = newIsrc;
      updated.hold = true;
      updated.reason = reason;
      updated.status = "Taken Down";
      console.log(_id);
      axios
        .put(backendUrl + "songs/" + _id, updated, config)
        .then(({ data }) => {
          if (data.acknowledged) {
            axios
              .post(backendUrl + "send-song-status", updated)
              .then(({ data }) => {
                if (data.acknowledged) {
                  Swal.close();
                }
              });
          }
        });

      // formData.status = "Sent to Stores";
      // formData.isrc = newIsrc;

      // // console.log({ ...updated, ...formData });
      // const newBody = { ...updated, ...formData };

      // console.log(config);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        containerClassName={"text-left mt-4"}
        className={"mt-2"}
        label={"reason"}
        id={"reason"}
        onChange={(e) => setreason(e.target.value)}
        placeholder={"Enter the reason for Taking Down"}
        value={reason}
        // disabled={updated?.reason}
      />

      <div className="flex justify-center mt-8">
        <Button type={"submit"}>Next</Button>
      </div>
    </form>
  );
};

export default HandleTakedown;
