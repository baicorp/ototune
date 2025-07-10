export default function formatLyric(lyric: string) {
  if (lyric.includes("\r\n")) {
    return lyric.split("\r\n").map((text) => (text.length == 0 ? "###" : text));
  } else if (lyric.includes("\n")) {
    return lyric.split("\n").map((text) => (text.length == 0 ? "###" : text));
  } else {
    return [lyric];
  }
}
