import React from "react";
import { Mutation } from "@tanstack/react-query";
import DataExplorer from "./Explorer";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import MutationDetails from "./MutationDetails";

interface Props {
  selectedMutation: Mutation<any, any, any, any> | undefined;
}

export default function MutationInformation({ selectedMutation }: Props) {
  return (
    <ScrollView
      style={styles.flex1}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.section}>
        <MutationDetails selectedMutation={selectedMutation} />
      </View>
      <View style={styles.section}>
        <Text style={styles.textHeader}>Variables Details</Text>
        <View style={styles.padding}>
          <DataExplorer
            label="Variables"
            value={selectedMutation?.state.variables}
            defaultExpanded={["Variables"]}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.textHeader}>Context Details</Text>
        <View style={styles.padding}>
          <DataExplorer
            label="Context"
            value={selectedMutation?.state.context}
            defaultExpanded={["Context"]}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.textHeader}>Data Explorer</Text>
        <View style={styles.padding}>
          <DataExplorer
            label="Data"
            defaultExpanded={["Data"]}
            value={selectedMutation?.state.data}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.textHeader}>Mutations Explorer</Text>
        <View style={styles.padding}>
          <DataExplorer
            label="Mutation"
            defaultExpanded={["Mutation"]}
            value={selectedMutation}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  textHeader: {
    textAlign: "left",
    backgroundColor: "#EAECF0",
    padding: 8,
    width: "100%",
    fontSize: 12,
    fontWeight: "500",
  },
  padding: {
    padding: 8,
    backgroundColor: "#FAFAFA",
  },
});
