export function TextItemLoad({
  width,
  variant,
}: {
  width?: string;
  variant?: "headerTitle";
}) {
  return (
    <div
      className={`${width} ${variant === "headerTitle" ? "h-5" : "h-2.5"} rounded-full bg-themed-border animate-pulse`}
    ></div>
  );
}
