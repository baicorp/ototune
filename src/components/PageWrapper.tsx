export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 px-6 py-4 h-full overflow-auto">
      {children}
    </section>
  );
}
