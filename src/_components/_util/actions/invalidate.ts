import { Query } from "@tanstack/react-query";

interface Props {
  query: Query;
}
export default function invalidate({ query }: Props) {
  query.invalidate();
}
