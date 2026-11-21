import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Arrow";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "text";
  className?: string;
};

/** Primary/ghost button or inline text link, always with the trailing arrow. */
export function ButtonLink({ href, children, variant = "primary", className = "" }: Props) {
  const base = variant === "text" ? "text-link" : `btn btn--${variant}`;
  return (
    <Link href={href} className={`${base} ${className}`.trim()}>
      {children} <Arrow />
    </Link>
  );
}
