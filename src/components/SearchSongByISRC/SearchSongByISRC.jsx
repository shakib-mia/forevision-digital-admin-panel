import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import SearchSongModal from "../SearchSongModal/SearchSongModal";

const SearchSongByISRC = () => {
  const [song, setSong] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    // alert(e.target.isrc.value);
    axios
      .get(backendUrl + "songs/by-isrc/" + e.target.isrc.value)
      .then(({ data }) => {
        // console.log(data);
        if (data._id) {
          setSong(data);
        } else {
          Swal.fire({
            text: `No songs found with isrc ${e.target.isrc.value}`,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="bg-white rounded-[20px] custom-shadow">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light text-interactive-dark-hover">
        <p className="text-heading-6-bold">Search Song By ISRC</p>
      </div>

      <form className="p-4" onSubmit={handleSubmit}>
        <InputField placeholder={"Enter the ISRC"} name={"isrc"} />

        <div className="flex justify-center mt-4">
          <Button>Search</Button>
        </div>
      </form>

      {(song.Song || song.songName) && (
        <SearchSongModal song={song} setSong={setSong} />
      )}
    </div>
  );
};

export default SearchSongByISRC;
