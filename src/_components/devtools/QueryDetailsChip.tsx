import { Query } from "@tanstack/react-query";
import React from "react";
import { getQueryStatusLabel } from "../_util/getQueryStatusLabel";
import { Text, View, StyleSheet } from "react-native";
interface Props {
  query: Query;
}
const backgroundColors = {
  fresh: "#D1FADF", // Green
  stale: "#FEF0C7", // Yellow
  fetching: "#D1E9FF", // Blue
  paused: "#EBE9FE", // Indigo
  noObserver: "#F2F4F7", // Grey
};

const borderColors = {
  fresh: "#32D583", // Green
  stale: "#FDB022", // Yellow
  fetching: "#53B1FD", // Blue
  paused: "#9B8AFB", // Indigo
  noObserver: "#344054", // Grey
};

const textColors = {
  fresh: "#027A48", // Green
  stale: "#B54708", // Yellow
  fetching: "#175CD3", // Blue
  paused: "#5925DC", // Indigo
  noObserver: "#344054", // Grey
};
type QueryStatus = "fresh" | "stale" | "fetching" | "paused" | "noObserver";

export default function QueryDetailsChip({ query }: Props) {
  const status = getQueryStatusLabel(query) as QueryStatus;
  const backgroundColor = backgroundColors[status];
  const borderColor = borderColors[status];
  const textColor = textColors[status];

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{status}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    margin: 4,
  },
  text: {
    fontSize: 12,
  },
});
