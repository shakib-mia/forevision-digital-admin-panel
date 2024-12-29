import React from "react";
import PromotionalTools from "../../components/PromotionalTools/PromotionalTools";
import FbInstaProfile from "../../components/FbInstaProfile/FbInstaProfile";
import YouTubeOAC from "../../components/YoutubeOAC/YoutubeOAC";
import YouTubeClaimRelease from "../../components/YouTubeClaimRelease/YouTubeClaimRelease";
import FbInstaWhitelisting from "../../components/FbInstaWhitelisting/FbInstaWhitelisting";
import YoutubeVideoTakedown from "../../components/YoutubeVideoTakedown/YoutubeVideoTakedown";
import SpotifyProfileRelocate from "../../components/SpotifyProfileRelocate/SpotifyProfileRelocate";
import JioSaavnProfileRelocate from "../../components/JioSaavnProfileRelocate/JioSaavnProfileRelocate";
import AppleMusicProfileRelocate from "../../components/AppleMusicProfileRelocate/AppleMusicProfileRelocate";
import GaanaProfileRelocate from "../../components/GaanaProfileRelocate/GaanaProfileRelocate";
import PitchForEditorialPlaylist from "../../components/PitchForEditorialPlaylist/PitchForEditorialPlaylist";

const Forms = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PromotionalTools />
        <FbInstaProfile />
        <YouTubeOAC />
        <YouTubeClaimRelease />
        <FbInstaWhitelisting />
        <YoutubeVideoTakedown />
        <SpotifyProfileRelocate />
        <JioSaavnProfileRelocate />
        <AppleMusicProfileRelocate />
        <GaanaProfileRelocate />
        <PitchForEditorialPlaylist />
      </div>
    </div>
  );
};

export default Forms;
