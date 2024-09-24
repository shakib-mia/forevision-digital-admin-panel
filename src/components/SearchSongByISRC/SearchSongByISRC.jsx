import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";
import Modal from "../Modal/Modal";

const SearchSongByISRC = () => {
  const [song, setSong] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    // alert(e.target.isrc.value);
    axios
      .get(backendUrl + "songs/by-isrc/" + e.target.isrc.value)
      .then(({ data }) => setSong(data));
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
          <h4 className="font-bold text-center">{song.Song}</h4>

          <ul>
            {Object.keys(song).map(
              (item) =>
                item !== "_id" && (
                  <li
                    key={item}
                    className="grid grid-cols-2 text-nowrap capitalize"
                  >
                    <aside className="p-3">{item}</aside>
                    <aside className="p-3">
                      {typeof song[item] === "string" &&
                      song[item].includes("https") ? (
                        <a
                          href={song[item]}
                          target="_blank"
                          rel="noopener noreferrer"
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
