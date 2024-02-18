import { Text } from "react-native";
interface Props {
  title: string;
}
export function Test({ title }: Props) {
  return <Text>{title}</Text>;
}
