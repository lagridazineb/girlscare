// The actual list of valid codes now lives ONLY on the server, in
// netlify/functions/_accessCodesList.mjs — it is never shipped to the
// browser. This file just has small client-side helpers for formatting
// what the person types before it's sent to the server for the real check.
export function normalizeCode(input) {
  return (input || "").trim().toUpperCase().replace(/\s+/g, "");
}
