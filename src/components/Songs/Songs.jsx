import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, config } from "../../constants";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import SongsItem from "../SongsItem/SongsItem";

const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "upload-song", config)
      .then(({ data }) => setSongs(data));
  }, []);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-y-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Uploads</p>
      </div>

      <div className="grid grid-cols-5 text-center py-2">
        <p>Song Name</p>
        <p>User Email</p>
        <p>Status</p>
        <p></p>
        <p>Action</p>
      </div>

      {songs.map((item, key) => (
        <SongsItem item={item} key={key} />
      ))}
    </div>
  );
};

export default Songs;
