import React from "react";
import PromotionalTools from "../../components/PromotionalTools/PromotionalTools";
import FbInstaProfile from "../../components/FbInstaProfile/FbInstaProfile";
import YouTubeOAC from "../../components/YoutubeOAC/YoutubeOAC";
import YouTubeClaimRelease from "../../components/YouTubeClaimRelease/YouTubeClaimRelease";
import FbInstaWhitelisting from "../../components/FbInstaWhitelisting/FbInstaWhitelisting";
import YoutubeVideoTakedown from "../../components/YoutubeVideoTakedown/YoutubeVideoTakedown";

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
      </div>
    </div>
  );
};

export default Forms;
