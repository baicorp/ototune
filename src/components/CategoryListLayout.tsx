interface CategoryWrapperProps {
  category: string;
  children: React.ReactNode;
}

export default function CategoryListLayout({
  category,
  children,
}: CategoryWrapperProps) {
  const isHorizontalList = ["playlist", "album", "artist"].some((data) =>
    category.toLowerCase().includes(data),
  );
  return (
    <div
      className={`flex ${isHorizontalList ? "flex-row" : "flex-col"} overflow-x-auto gap-3`}
    >
      {children}
    </div>
  );
}
