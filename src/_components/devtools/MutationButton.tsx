import React from "react";
import { Mutation } from "@tanstack/react-query";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { CheckCircle, LoadingCircle, PauseCircle, XCircle } from "./svgs";
import { getMutationStatusColors } from "../_util/mutationStatusToColorClass";
import { displayValue } from "./displayValue";
interface Props {
  mutation: Mutation<unknown, Error, void, unknown>;
  setSelected: React.Dispatch<React.SetStateAction<Mutation | undefined>>;
  selected: Mutation | undefined;
}
export default function MutationButton({
  mutation,
  setSelected,
  selected,
}: Props) {
  const mutationKey = mutation.options.mutationKey
    ? JSON.stringify(displayValue(mutation.options.mutationKey, false)) + " - "
    : "";
  const submittedAt = new Date(mutation.state.submittedAt).toLocaleString();
  const value = `${mutationKey}${submittedAt}`;

  const { backgroundColor, textColor } = getMutationStatusColors({
    isPaused: mutation.state.isPaused,
    status: mutation.state.status,
  });
  return (
    <TouchableOpacity
      onPress={() => setSelected(mutation === selected ? undefined : mutation)}
      style={[
        styles.button,
        selected?.mutationId === mutation.mutationId && styles.selected,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor }]}>
        {mutation.state.isPaused && <PauseCircle />}
        {mutation.state.status === "success" && <CheckCircle />}
        {mutation.state.status === "error" && <XCircle />}
        {mutation.state.status === "pending" && <LoadingCircle />}
      </View>
      <Text style={[styles.text]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#d0d5dd",
    backgroundColor: "white",
  },
  selected: {
    backgroundColor: "#eaecf0",
  },
  iconContainer: {
    padding: 8,
    paddingVertical: 6,
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
    minWidth: 18,
  },
});
