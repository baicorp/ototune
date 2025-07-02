import { useState } from "react";

export default function CollapsibleText({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <p
      className={`text-neutral-400 ${isExpand ? "" : "line-clamp-4"}`}
      onClick={() => setIsExpand((prev) => !prev)}
    >
      {children}
    </p>
  );
}
