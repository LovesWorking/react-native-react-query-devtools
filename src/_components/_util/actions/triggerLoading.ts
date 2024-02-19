import { Query } from "@tanstack/react-query";

interface Props {
  query: Query;
}
export default function triggerLoading({ query }: Props) {
  if (query.state.data === undefined) {
    // --Undefined - We previously triggered 'trigger loading' actiion--
    // Retrieve the original query options stored in fetchMeta
    const previousQueryOptions = (query.state.fetchMeta as any)
      .__previousQueryOptions;
    if (previousQueryOptions) {
      // Refetch the query with the original options
      query.fetch(previousQueryOptions, {
        cancelRefetch: true, // This option will cancel the ongoing fetch (if any)
      });
    }
  } else {
    // --Else set query as loading with no data--
    const __previousQueryOptions = query.options;

    // Modify the query to a never-resolving promise to simulate loading
    query.fetch({
      ...__previousQueryOptions,
      queryFn: () => new Promise(() => {}),
      gcTime: -1,
    });

    // Set the state to pending and remove data
    query.setState({
      data: undefined,
      status: "pending",
      fetchMeta: {
        ...query.state.fetchMeta,
        __previousQueryOptions,
      } as any,
    });
  }
}
