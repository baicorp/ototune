import { useParams } from "react-router";

export default function Album() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-4xl">Album page id: {id}</h1>
    </div>
  );
}
