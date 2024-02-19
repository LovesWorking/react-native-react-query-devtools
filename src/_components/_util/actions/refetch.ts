import { Query } from "@tanstack/react-query";

interface Props {
  query: Query;
}
export default function refetch({ query }: Props) {
  query.fetch();
}
