import { QueryKey, Query } from "@tanstack/react-query";
type QueryStatus = "fetching" | "inactive" | "paused" | "stale" | "fresh";

export function getQueryStatusLabel(
  query: Query<unknown, Error, unknown, QueryKey>
): QueryStatus {
  return query.state.fetchStatus === "fetching"
    ? "fetching"
    : !query.getObserversCount()
    ? "inactive"
    : query.state.fetchStatus === "paused"
    ? "paused"
    : query.isStale()
    ? "stale"
    : "fresh";
}
