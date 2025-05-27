import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryStatusLabel } from "../_util/getQueryStatusLabel";

interface QueryStatusCounts {
  fresh: number;
  stale: number;
  fetching: number;
  paused: number;
  inactive: number;
}

function useQueryStatusCounts(): QueryStatusCounts {
  const queryClient = useQueryClient();
  const [counts, setCounts] = useState<QueryStatusCounts>({
    fresh: 0,
    stale: 0,
    fetching: 0,
    paused: 0,
    inactive: 0,
  });

  useEffect(() => {
    const updateCounts = () => {
      const allQueries = queryClient.getQueryCache().getAll();

      const newCounts = allQueries.reduce(
        (acc, query) => {
          const status = getQueryStatusLabel(query);
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        },
        { fresh: 0, stale: 0, fetching: 0, paused: 0, inactive: 0 }
      );

      setCounts(newCounts);
    };

    // Perform an initial update
    updateCounts();

    // Subscribe to the query cache to run updates on changes
    const unsubscribe = queryClient.getQueryCache().subscribe(updateCounts);

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [queryClient]);

  return counts;
}

export default useQueryStatusCounts;
