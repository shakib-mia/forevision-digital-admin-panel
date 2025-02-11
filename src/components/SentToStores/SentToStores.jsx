import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { backendUrl, config } from "../../constants";
import axios from "axios";
import Button from "../Button/Button";
import Swal from "sweetalert2";

const SentToStores = ({
  updated,
  album,
  setRefetch,
  albumSelectedOption,
  selectedOption,
}) => {
  console.log(updated);
  const [newIsrc, setNewIsrc] = useState("");
  const [upc, setUpc] = useState(updated.UPC || album?.UPC || "");

  useEffect(() => {
    axios
      .get(backendUrl + "generate-isrc")
      .then(({ data }) => setNewIsrc(data.newIsrc));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(album);

    if (album) {
      // console.log();
      // const song = album.songs.find((item) => item.isrc === updated.isrc);
      // // updatedSingleSong.status =
      // // console.log(album);
      // const { userEmail } = album;

      // const newBody = {
      //   songName: song.songName,
      //   userEmail,
      //   status: "Sent to Stores",
      // };

      album.UPC = upc;
      // console.log(album);

      axios
        .put(backendUrl + "recent-uploads/" + album._id, album, config)
        .then(({ data }) => {
          // console.log(data);
          setRefetch((ref) => !ref);
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
        // if (data.insertCursor.acknowledged) {
        axios
          .post(backendUrl + "send-song-status", newBody)
          .then(({ data }) => {
            setRefetch((ref) => !ref);
            // if (data.acknowledged) {
            Swal.close();

            // }
          });
        // }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {selectedOption && albumSelectedOption ? (
        <></>
      ) : (
        <InputField
          containerClassName={"text-left"}
          className={"mt-2"}
          label={"ISRC"}
          id={"isrc"}
          // disabled={true}
          value={updated.isrc ? updated.isrc : newIsrc}
          onChange={(e) => setFormData({ ...formData, isrc: e.target.value })}
          placeholder={"Enter the Song's ISRC Here"}
        />
      )}

      <InputField
        containerClassName={"text-left mt-4"}
        className={"mt-2"}
        label={"UPC"}
        id={"UPC"}
        onChange={(e) => setUpc(e.target.value)}
        placeholder={"Enter the Song's UPC Here"}
        value={upc}
        disabled={updated?.upc || album?.UPC}
      />

      <div className="flex justify-center mt-8">
        <Button type={"submit"}>Next</Button>
      </div>
    </form>
  );
};

export default SentToStores;
