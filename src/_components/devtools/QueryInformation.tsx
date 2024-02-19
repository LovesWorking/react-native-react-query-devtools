import React from "react";
import { Query } from "@tanstack/react-query";
import QueryDetails from "./QueryDetails";
import QueryActions from "./QueryActions";
import DataExplorer from "./Explorer";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Props {
  setSelectedQuery: React.Dispatch<React.SetStateAction<Query | undefined>>;
  selectedQuery: Query | undefined;
}
export default function QueryInformation({
  selectedQuery,
  setSelectedQuery,
}: Props) {
  return (
    <ScrollView style={styles.flexOne}>
      <QueryDetails query={selectedQuery} />
      <QueryActions query={selectedQuery} setSelectedQuery={setSelectedQuery} />
      <Text style={styles.headerText}>Data Explorer</Text>
      <View style={styles.contentView}>
        <DataExplorer
          editable={true}
          label="Data"
          value={selectedQuery?.state.data}
          defaultExpanded={["Data"]}
          activeQuery={selectedQuery}
        />
      </View>
      <Text style={styles.headerText}>Query Explorer</Text>
      <View style={styles.contentView}>
        <DataExplorer
          label="Query"
          value={selectedQuery}
          defaultExpanded={["Query", "queryKey"]}
          activeQuery={selectedQuery}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  headerText: {
    textAlign: "left",
    backgroundColor: "#EAECF0",
    padding: 6,
    width: "100%",
    fontSize: 12,
  },
  contentView: {
    padding: 2,
  },
});
