import { useEffect, useRef, useState } from "react";
import { Mutation, useQueryClient } from "@tanstack/react-query";
import isEqual from "fast-deep-equal";

function useAllMutations() {
  const queryClient = useQueryClient();
  const [mutations, setMutations] = useState<Mutation[]>([]);
  const mutationsRef = useRef<any[]>([]);
  useEffect(() => {
    const updateMutations = () => {
      // Only update state if the new mutations array is different
      setTimeout(() => {
        const newMutations = [...queryClient.getMutationCache().getAll()];
        const newStates = newMutations.map((mutation) => mutation.state);
        if (!isEqual(mutationsRef.current, newStates)) {
          mutationsRef.current = newStates; // Update the ref
          setMutations(newMutations); // Update state
        }
      }, 1);
    };
    // Perform an initial update
    updateMutations();
    // Subscribe to the query cache to run updates on changes
    const unsubscribe = queryClient
      .getMutationCache()
      .subscribe(updateMutations);
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [queryClient]);

  return { mutations };
}

export default useAllMutations;
