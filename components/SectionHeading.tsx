export default function SectionHeading({
  tag,
  title,
}: {
  tag: string;
  title: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium text-brand-400">{tag}</p>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
        {title}
      </h2>
    </div>
  );
}
