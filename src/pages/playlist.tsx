import { useParams } from "react-router";

export default function Playlist() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-4xl">Playlist page id: {id}</h1>
    </div>
  );
}
