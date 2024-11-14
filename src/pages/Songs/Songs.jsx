import React from "react";
import SongUpdateRequest from "../../components/SongUpdateRequest/SongUpdateRequest";
import TakedownRequests from "../../components/TakedownRequests/TakedownRequests";
import Songs from "../../components/Songs/Songs";
import SearchSongByISRC from "../../components/SearchSongByISRC/SearchSongByISRC";

const SongsPage = () => {
  return (
    <div className="container grid grid-cols-1 gap-4">
      <SearchSongByISRC />
      <SongUpdateRequest />
      <TakedownRequests />
      <Songs />
    </div>
  );
};

export default SongsPage;
