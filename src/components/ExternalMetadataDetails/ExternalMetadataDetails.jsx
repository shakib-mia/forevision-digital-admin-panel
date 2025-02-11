import React from "react";

const ExternalMetadataDetails = ({ externalMetadata }) => {
  if (!externalMetadata) return null;

  const getPlatformLink = (platform, id) => {
    const platformLinks = {
      deezer: `https://www.deezer.com/track/${id}`,
      spotify: `https://open.spotify.com/track/${id}`,
      apple: `https://music.apple.com/us/album/${id}`,
      youtube: `https://www.youtube.com/watch?v=${id}`,
      soundcloud: `https://soundcloud.com/${id}`,
    };

    return platformLinks[platform.toLowerCase()] || "#";
  };

  const getArtistLink = (platform, artist) => {
    const platformArtistLinks = {
      spotify: `https://open.spotify.com/artist/${artist.id}`,
      deezer: `https://www.deezer.com/artist/${artist.id}`,
      apple: `https://music.apple.com/us/artist/${artist.id}`,
      youtube: `https://www.youtube.com/channel/${artist.id}`,
      soundcloud: `https://soundcloud.com/${artist.id}`,
    };

    return platformArtistLinks[platform.toLowerCase()] || "#";
  };

  const getAlbumLink = (platform, albumId) => {
    const platformAlbumLinks = {
      spotify: `https://open.spotify.com/album/${albumId}`,
      deezer: `https://www.deezer.com/album/${albumId}`,
      apple: `https://music.apple.com/us/album/${albumId}`,
      youtube: `https://www.youtube.com/playlist?list=${albumId}`,
      soundcloud: `https://soundcloud.com/albums/${albumId}`,
    };

    return platformAlbumLinks[platform.toLowerCase()] || "#";
  };

  return (
    <div className="space-y-4">
      {Object.entries(externalMetadata).map(([platform, metadata]) => (
        <div key={platform} className="mb-4 p-4 border rounded-lg">
          <div className="mb-2">
            <span className="font-semibold text-gray-700">
              {platform.charAt(0).toUpperCase() + platform.slice(1)} Track:
            </span>{" "}
            <a
              href={getPlatformLink(platform, metadata?.track?.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {metadata?.track?.name || "N/A"}
            </a>
          </div>

          <div className="mb-2">
            <span className="font-semibold text-gray-700">
              {platform.charAt(0).toUpperCase() + platform.slice(1)} Artists:
            </span>{" "}
            {metadata?.artists?.map((artist, index) => (
              <React.Fragment key={artist.id}>
                <a
                  href={getArtistLink(platform, artist)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {artist.name}
                </a>
                {index < metadata.artists.length - 1 ? ", " : ""}
              </React.Fragment>
            )) || "N/A"}
          </div>

          <div>
            <span className="font-semibold text-gray-700">
              {platform.charAt(0).toUpperCase() + platform.slice(1)} Album:
            </span>{" "}
            <a
              href={getAlbumLink(platform, metadata?.album?.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {metadata?.album?.name || "N/A"}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExternalMetadataDetails;
