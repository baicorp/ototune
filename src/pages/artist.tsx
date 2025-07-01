import { useParams } from "react-router";

export default function Artist() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-4xl">Artist page id: {id}</h1>
    </div>
  );
}
