import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { camelCaseToNormalText } from "../../utils/camelCaseToNormalText";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import axios from "axios";
import { backendUrl } from "../../constants";

const SearchSongModal = ({ setSong, song }) => {
  const [viewCut, setViewCut] = useState(0);
  const [customCut, setCustomCut] = useState(viewCut);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      isrc: song.isrc || song.ISRC,
      cut_percentage: e.target["cut-percentage"].value,
    };

    axios.post(backendUrl + "custom-cut", body).then(({ data }) => {
      if (data.acknowledged) {
        setSong({});
        setCustomCut(data.cut_percentage);
      }
    });
  };
  useEffect(() => {
    axios
      .get(backendUrl + "custom-cut/" + (song.isrc || song.ISRC))
      .then((data) => setViewCut(data.data.cut_percentage));
  }, [customCut]);

  //// console.log(viewCut);

  return (
    <Modal handleClose={() => setSong({})}>
      {/* Display song name and ISRC at the top */}
      <div className="mb-4">
        <div className="flex justify-between">
          <aside>
            <h4 className="font-bold text-2xl text-primary">
              {song.Song || song.songName}
            </h4>
            <p className="text-heading-6-bold text-grey-dark mt-4 italic">
              ISRC: {song.isrc || song.ISRC}
            </p>
            {viewCut ? <>Cut Percentage: {viewCut}</> : <></>}
          </aside>

          {(song.planName?.includes("social") ||
            song.planName?.includes("yearly")) && (
            <form
              onSubmit={handleSubmit}
              className="mr-5 flex items-center w-1/2"
            >
              <InputField
                placeholder={"Add Custom Cut"}
                containerClassName={"w-11/12"}
                type="number"
                min="1"
                name={"cut-percentage"}
                max="100"
                onChange={(e) => setCustomCut(e.target.value)}
                // value={customCut}
              />
              <Button type={"submit"}>Submit</Button>
            </form>
          )}
        </div>
      </div>

      {/* Display the rest of the song details, excluding 'Song' and 'isrc' */}
      <ul>
        {Object.keys(song).map((item) =>
          item !== "_id" &&
          item !== "Song" &&
          item !== "isrc" &&
          item !== "S.no" &&
          item !== "artists" &&
          item !== "accepted" &&
          item !== "songs" &&
          item !== "selectedPlatforms" &&
          item !== "availablePlatforms" ? (
            <li key={item} className="grid grid-cols-2 text-nowrap capitalize">
              <aside className="p-3 font-semibold text-gray-800">
                {camelCaseToNormalText(item)}
              </aside>
              <aside className="p-3 text-wrap">
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
          ) : item === "artists" ? (
            <li className="grid grid-cols-2 capitalize">
              <aside className="p-3 font-semibold text-grey-dark">
                {camelCaseToNormalText(item)}
              </aside>
              <aside className="p-3">
                {song[item].map((item, key) => (
                  <ul key={key}>
                    <b>{item.name}</b> - {item.role}
                  </ul>
                ))}
              </aside>
            </li>
          ) : item === "selectedPlatforms" ? (
            <li className="grid grid-cols-2 capitalize">
              <aside className="p-3 font-semibold text-grey-dark">
                {camelCaseToNormalText(item)}
              </aside>
              <aside className="p-3">{song[item].join(", ")}</aside>
            </li>
          ) : (
            <></>
          )
        )}
      </ul>
    </Modal>
  );
};

export default SearchSongModal;
