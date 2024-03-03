import React from "react";
import { Mutation } from "@tanstack/react-query";
import DataExplorer from "./Explorer";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import MutationDetails from "./MutationDetails";

interface Props {
  selectedMutation: Mutation<unknown, Error, void, unknown> | undefined;
}

export default function MutationInformation({ selectedMutation }: Props) {
  return (
    <ScrollView style={styles.flex1}>
      <MutationDetails selectedMutation={selectedMutation} />
      <Text style={styles.textHeader}>Variables Details</Text>
      <View style={styles.padding}>
        <DataExplorer
          label="Variables"
          value={selectedMutation?.state.variables}
          defaultExpanded={["Variables"]}
        />
      </View>
      <Text style={styles.textHeader}>Context Details</Text>
      <View style={styles.padding}>
        <DataExplorer
          label="Context"
          value={selectedMutation?.state.context}
          defaultExpanded={["Context"]}
        />
      </View>

      <Text style={styles.textHeader}>Data Explorer</Text>
      <View style={styles.padding}>
        <DataExplorer
          label="Data"
          defaultExpanded={["Data"]}
          value={selectedMutation?.state.data}
        />
      </View>
      <Text style={styles.textHeader}>Mutations Explorer</Text>
      <View style={styles.padding}>
        <DataExplorer
          label="Mutation"
          defaultExpanded={["Mutation"]}
          value={selectedMutation}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  textHeader: {
    textAlign: "left",
    backgroundColor: "#EAECF0",
    padding: 4,
    width: "100%",
    fontSize: 12,
  },
  padding: {
    padding: 8,
  },
});
