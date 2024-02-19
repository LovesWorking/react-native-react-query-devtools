import { Query, QueryKey, useQueryClient } from "@tanstack/react-query";
interface Props {
  queryClient: ReturnType<typeof useQueryClient>;
  query: Query;
}
type DevToolsErrorType = {
  name: string;
  initializer: (query: Query<unknown, Error, unknown, QueryKey>) => Error;
};
export default function triggerError({ query, queryClient }: Props) {
  const triggerError = () => {
    if (!query) return;
    const errorTypes: DevToolsErrorType[] = [
      {
        name: "Network Error",
        initializer: () => new Error("Network error occurred"),
      },
    ];
    const error =
      errorTypes[0]?.initializer(query) ??
      new Error("Unknown error from devtools");
    const __previousQueryOptions = query.options;
    query.setState({
      ...query.state,
      status: "error",
      error: error,
      fetchMeta: {
        ...query.state.fetchMeta,
        __previousQueryOptions,
      } as any,
    });
  };
  if (query.state.status !== "error") {
    triggerError();
  } else {
    queryClient.resetQueries(query);
  }
}
