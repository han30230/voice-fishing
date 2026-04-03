import Link from "next/link";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="text-[13px] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, idx) => (
          <li key={c.href} className="flex items-center gap-2">
            {idx > 0 ? <span aria-hidden>/</span> : null}
            {idx === items.length - 1 ? (
              <span className="text-foreground">{c.label}</span>
            ) : (
              <Link className="hover:text-foreground" href={c.href}>
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
