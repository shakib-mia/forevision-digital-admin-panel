import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";

const SearchSongByISRC = () => {
  const [song, setSong] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    // alert(e.target.isrc.value);
    axios
      .get(backendUrl + "songs/by-isrc/" + e.target.isrc.value)
      .then(({ data }) => {
        console.log(data);
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

      {song.Song && (
        <Modal handleClose={() => setSong({})}>
          {/* Display song name and ISRC at the top */}
          <div className="mb-4">
            <h4 className="font-bold text-2xl text-primary">{song.Song}</h4>
            <p className="text-lg text-gray-600 italic">
              ISRC: {song.isrc || song.ISRC}
            </p>
          </div>

          {/* Display the rest of the song details, excluding 'Song' and 'isrc' */}
          <ul>
            {Object.keys(song).map(
              (item) =>
                item !== "_id" &&
                item !== "Song" &&
                item !== "isrc" &&
                item !== "S.no" && (
                  <li
                    key={item}
                    className="grid grid-cols-2 text-nowrap capitalize"
                  >
                    <aside className="p-3 font-semibold text-gray-800">
                      {item}
                    </aside>
                    <aside className="p-3">
                      {typeof song[item] === "string" &&
                      song[item].includes("https") ? (
                        <a
                          href={song[item]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Open
                        </a>
                      ) : (
                        song[item]
                      )}
                    </aside>
                  </li>
                )
            )}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default SearchSongByISRC;
