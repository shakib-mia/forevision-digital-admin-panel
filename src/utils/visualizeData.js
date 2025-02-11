import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const visualizeData = (data) => {
  if (!data || !data.success) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Invalid data provided.",
      background: "#f8f9fa",
      confirmButtonColor: "#007bff",
    });
    return;
  }

  const { duration, timestamps, data: parts, orderId } = data.data;

  // Function to colorize the score based on its value (Red for high, Green for low)
  const colorizeScore = (score) => {
    if (score === "N/A" || score === null || score === undefined) {
      return { color: "#000", backgroundColor: "#f0f0f0" }; // Default gray for no score
    }

    if (score >= 0 && score <= 40) {
      return { color: "#fff", backgroundColor: "green" }; // Green for low score
    } else if (score > 40 && score <= 60) {
      return { color: "#000", backgroundColor: "orange" }; // Yellow for medium score
    } else {
      return { color: "#fff", backgroundColor: "red" }; // Red for high score
    }
  };

  const formatSongDetails = (part, title) => {
    if (!part) return "";
    const scoreStyle = colorizeScore(part.score);

    return `
      <div class="song-detail">
        <h3 class="section-title">${title}</h3>
        <p><strong>Title:</strong> ${part.title || "N/A"}</p>
        <p><strong>Type:</strong> ${part.type || "N/A"}</p>
        <p><strong>Artist:</strong> ${
          part.artists?.map((a) => a.name).join(", ") || "N/A"
        }</p>
        <p><strong>Album:</strong> ${part.album?.name || "N/A"}</p>
        <p><strong>Label:</strong> ${part.label || "N/A"}</p>
        <p><strong>Release Date:</strong> ${part.release_date || "N/A"}</p>
        <p><strong>Score:</strong> <span style="background-color: ${
          scoreStyle.backgroundColor
        }; color: ${scoreStyle.color}; padding: 5px; border-radius: 5px;">${
      part.score || "N/A"
    }</span></p>
        <p><strong>Duration (ms):</strong> ${part.duration_ms || "N/A"}</p>
        <p><strong>Play Offset (ms):</strong> ${
          part.play_offset_ms || "N/A"
        }</p>
        <p><strong>Sample End Time (ms):</strong> ${
          part.sample_end_time_ms || "N/A"
        }</p>
        <p><strong>Sample Begin Time (ms):</strong> ${
          part.sample_begin_time_ms || "N/A"
        }</p>
        <p><strong>Genres:</strong> ${
          Array.isArray(part.genres) && part.genres.length > 0
            ? part.genres.map((item) => item.name).join(", ")
            : "N/A"
        }</p>        
        <p><strong>Language:</strong> ${part.language || "N/A"}</p>
        
        <!-- Social Links Section -->
        <p><strong>Social Links:</strong></p>
        ${
          part.external_metadata?.deezer?.track
            ? `<p><strong>Deezer Track:</strong> <a href="https://www.deezer.com/track/${part.external_metadata.deezer.track.id}" target="_blank" class="link">Listen on Deezer</a></p>`
            : ""
        }
        ${
          part.external_metadata?.spotify?.track
            ? `<p><strong>Spotify Track:</strong> <a href="https://open.spotify.com/track/${part.external_metadata.spotify.track.id}" target="_blank" class="link">Listen on Spotify</a></p>`
            : ""
        }
        ${
          part.external_metadata?.youtube?.vid
            ? `<p><strong>YouTube Video:</strong> <a href="https://www.youtube.com/watch?v=${part.external_metadata.youtube.vid}" target="_blank" class="link">Watch on YouTube</a></p>`
            : ""
        }
      </div>
    `;
  };

  Swal.fire({
    icon: "info",
    title: "Music Metadata Details",
    width: 900,
    html: `
      <div id="visualizeDataModal" class="modal-content">
        <div class="order-details">
          <h3 class="section-title">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId || "N/A"}</p>
          <p><strong>Total Duration:</strong> ${
            duration ? duration.toFixed(2) + " sec" : "N/A"
          }</p>
        </div>
        ${formatSongDetails(parts.firstPart, "First Part Details")}
        ${formatSongDetails(parts.middlePart, "Middle Part Details")}
        ${formatSongDetails(parts.lastPart, "Last Part Details")}
      </div>
    `,
    confirmButtonText: "Close",
    background: "#f8f9fa",
    customClass: {
      confirmButton: "btn btn-primary",
    },
  });
};

export default visualizeData;
