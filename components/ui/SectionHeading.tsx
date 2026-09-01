export function SectionHeading({
  children,
  lead,
  className = '',
}: {
  children: React.ReactNode;
  lead?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <h2 className="text-display-2 font-display u-measure text-navy">{children}</h2>
      {lead ? <p className="text-lead u-measure-lead mt-5 text-slate">{lead}</p> : null}
    </header>
  );
}
