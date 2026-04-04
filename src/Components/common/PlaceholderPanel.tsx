interface PlaceholderPanelProps {
  title: string;
  description: string;
}

export default function PlaceholderPanel({ title, description }: PlaceholderPanelProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-mg-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-mg-dark-textSecondary md:text-base">
        {description}
      </p>
    </section>
  );
}



