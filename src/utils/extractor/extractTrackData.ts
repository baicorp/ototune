import { Track } from "../../types";
import formatTime from "../formatTime";

export default function extractTrackData(trackData: any): Track {
  const track = trackData.videoDetails;
  return {
    id: track?.videoId,
    title: track?.title,
    artists: [{ name: track?.author, browseId: track?.channelId }],
    thumbnail: track?.thumbnail?.thumbnails[0]?.url,
    explicit: false,
    duration: formatTime(parseInt(track?.lengthSeconds || 0)),
    listId: null,
  };
}
