import { Query, QueryKey } from "@tanstack/react-query";
import React from "react";
import QueryDetailsChip from "./QueryDetailsChip";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { displayValue } from "./displayValue";

interface Props {
  query: Query<unknown, Error, unknown, QueryKey> | undefined;
}
export default function QueryDetails({ query }: Props) {
  if (query === undefined) {
    return null;
  }
  // Convert the timestamp to a Date object and format it
  const lastUpdated = new Date(query.state.dataUpdatedAt).toLocaleTimeString();

  return (
    <View style={styles.minWidth}>
      <Text style={styles.headerText}>Query Details</Text>
      <View style={styles.row}>
        <ScrollView horizontal style={styles.flexOne}>
          <Text style={styles.queryKeyText}>
            {displayValue(query.queryKey, true)}
          </Text>
        </ScrollView>
        <QueryDetailsChip query={query} />
      </View>
      <View style={styles.row}>
        <Text> Observers:</Text>
        <Text>{`${query.getObserversCount()}`}</Text>
      </View>
      <View style={styles.row}>
        <Text> Last Updated:</Text>
        <Text>{`${lastUpdated}`}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  minWidth: {
    minWidth: 200,
    fontSize: 12,
  },
  headerText: {
    textAlign: "left",
    backgroundColor: "#EAECF0",
    padding: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  flexOne: {
    flex: 1,
  },
  queryKeyText: {
    flexWrap: "wrap",
    alignItems: "center",
  },
});
