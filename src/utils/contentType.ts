export function contentType(id: string) {
  if (!id) return null;
  if (id?.startsWith("MPREb_")) {
    return "album";
  } else if (id?.startsWith("VLRDCLAK5uy_") || id?.startsWith("VLPL")) {
    return "playlist";
  } else if (id?.startsWith("UC") && id?.length === 24) {
    return "artist";
  } else {
    return "song";
  }
}
