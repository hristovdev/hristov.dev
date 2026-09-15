/** Joins the truthy class names, so callers can pass conditionals inline. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
