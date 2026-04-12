// Returns the site's base URL using the current browser location.
// This means share links always match whatever domain the site is hosted on.
export function getSiteUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}
