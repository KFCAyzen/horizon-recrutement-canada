import { notFound } from "next/navigation";

// Any unknown path under /en or /fr renders the localized, layout-wrapped 404.
export function generateStaticParams() {
  return [{ rest: ["not-found"] }];
}

export default function CatchAll() {
  notFound();
}
