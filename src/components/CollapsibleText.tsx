import { useState } from "react";

export default function CollapsibleText({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <p
      className={`text-themed-text-muted leading-snug ${isExpand ? "" : "line-clamp-3"}`}
      onClick={() => setIsExpand((prev) => !prev)}
    >
      {children}
    </p>
  );
}
