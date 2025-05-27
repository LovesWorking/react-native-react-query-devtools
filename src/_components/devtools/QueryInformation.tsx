import React from "react";
import { Query } from "@tanstack/react-query";
import QueryDetails from "./QueryDetails";
import QueryActions from "./QueryActions";
import DataExplorer from "./Explorer";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Props {
  setSelectedQuery: React.Dispatch<
    React.SetStateAction<Query<any, any, any, any> | undefined>
  >;
  selectedQuery: Query<any, any, any, any> | undefined;
}
export default function QueryInformation({
  selectedQuery,
  setSelectedQuery,
}: Props) {
  return (
    <ScrollView
      style={styles.flexOne}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.section}>
        <QueryDetails query={selectedQuery} />
      </View>
      <View style={styles.section}>
        <QueryActions
          query={selectedQuery}
          setSelectedQuery={setSelectedQuery}
        />
      </View>
      <View style={styles.section}>
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
      </View>
      <View style={styles.section}>
        <Text style={styles.headerText}>Query Explorer</Text>
        <View style={styles.contentView}>
          <DataExplorer
            label="Query"
            value={selectedQuery}
            defaultExpanded={["Query", "queryKey"]}
            activeQuery={selectedQuery}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  headerText: {
    textAlign: "left",
    backgroundColor: "#EAECF0",
    padding: 8,
    width: "100%",
    fontSize: 12,
    fontWeight: "500",
  },
  contentView: {
    padding: 8,
    backgroundColor: "#FAFAFA",
  },
});
