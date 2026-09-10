import { notFound } from 'next/navigation';

/** Renders the localized not-found page for any unknown path within a locale. */
export default function CatchAllPage() {
  notFound();
}
