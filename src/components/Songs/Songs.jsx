import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import SongsItem from "../SongsItem/SongsItem";
import { AppContext } from "../../contexts/AppContext";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { store } = useContext(AppContext);

  useEffect(() => {
    const config = {
      headers: { token: store.token },
    };
    axios.get(backendUrl + "upload-song", config).then(({ data }) => {
      // console.log(data.find((item) => !item.songs));
      setSongs(data);
    });
  }, [refetch]);

  const singleSongs = songs
    .map((item) => item.hasOwnProperty("songName") && item)
    .filter((item) => item);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[500px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Uploads</p>
      </div>

      <div className="grid grid-cols-6 text-center py-2">
        <p>Song Name</p>
        <p>User Email</p>
        <p>Status</p>
        <p>Order ID</p>
        <p></p>
        <p>Action</p>
      </div>

      {singleSongs.map((item, key) => (
        <SongsItem setRefetch={setRefetch} item={item} key={key} />
      ))}
    </div>
  );
};

export default Songs;
