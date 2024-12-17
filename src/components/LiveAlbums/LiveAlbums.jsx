import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { AppContext } from "../../contexts/AppContext";
import AlbumCard from "../AlbumCard/AlbumCard";

const LiveAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const { store } = useContext(AppContext);

  // console.log(albums);

  useEffect(() => {
    axios
      .get(backendUrl + "recent-uploads/admin/album/live", {
        headers: { token: store.token },
      })
      .then(({ data }) => setAlbums(data));
  }, []);

  return (
    <div className="bg-white rounded-[20px] custom-shadow text-interactive-dark-hover h-[1000px] overflow-auto">
      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light">
        <p className="text-heading-6-bold">Live Albums</p>
      </div>

      {albums.length > 0
        ? albums.map((album) =>
            album.songs?.every((song) => song.status === "streaming") ? (
              <>
                {albums.map((item) => (
                  <AlbumCard album={item} />
                ))}
              </>
            ) : (
              "has problem"
            )
          )
        : "has no songs"}
    </div>
  );
};

export default LiveAlbums;
