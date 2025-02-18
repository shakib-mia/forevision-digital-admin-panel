import React, { useContext } from "react";
import SongUpdateRequest from "../../components/SongUpdateRequest/SongUpdateRequest";
import TakedownRequests from "../../components/TakedownRequests/TakedownRequests";
import Songs from "../../components/Songs/Songs";
import SearchSongByISRC from "../../components/SearchSongByISRC/SearchSongByISRC";
import { AppContext } from "../../contexts/AppContext";
import Albums from "../../components/Albums/Albums";
import RoyaltySplitRequest from "../../components/RoyaltySplitRequest/RoyaltySplitRequest";
import LiveAlbums from "../../components/LiveAlbums/LiveAlbums";

const SongsPage = () => {
  const { store } = useContext(AppContext);
  const { role } = store;
  if (role === "admin" || role === "Content Manager") {
    return (
      <div className="container grid grid-cols-1 gap-4">
        <SearchSongByISRC />
        <SongUpdateRequest />
        <TakedownRequests />
        <Songs />
        <Albums />
        <LiveAlbums />
        <RoyaltySplitRequest />
      </div>
    );
  }
};

export default SongsPage;
