export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block w-full text-center justify-center">{children}</div>
    </section>
  );
}
