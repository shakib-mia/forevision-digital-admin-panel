import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import AlbumCard from "../AlbumCard/AlbumCard";

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + "recent-uploads/admin/album")
      .then(({ data }) => setAlbums(data));
  }, []);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[1000px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Album Uploads</p>
      </div>

      {/* <div className="grid grid-cols-5 text-center py-2">
        <p>Song Name</p>
        <p>User Email</p>
        <p>Status</p>
        <p></p>
        <p>Action</p>
      </div> */}
      {albums.map((item) => (
        <AlbumCard album={item} />
      ))}
      {/* {songs.map((item, key) => (
        <SongsItem item={item} key={key} />
      ))} */}
    </div>
  );
};

export default Albums;
