import React from "react";
import { View, StyleSheet } from "react-native";
import QueryStatus from "./QueryStatus";
import useQueryStatusCounts from "../_hooks/useQueryStatusCounts";

const QueryStatusCount: React.FC = () => {
  const { fresh, stale, fetching, paused, inactive } = useQueryStatusCounts();

  return (
    <View style={styles.queryStatusContainer}>
      <QueryStatus label="Fresh" color="green" count={fresh} />
      <QueryStatus label="Loading" color="blue" count={fetching} />
      <QueryStatus label="Paused" color="purple" count={paused} />
      <QueryStatus label="Stale" color="yellow" count={stale} />
      <QueryStatus label="Idle" color="gray" count={inactive} />
    </View>
  );
};

const styles = StyleSheet.create({
  queryStatusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});

export default QueryStatusCount;
