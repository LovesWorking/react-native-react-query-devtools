import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Mutation } from "@tanstack/react-query";
import MutationButton from "./MutationButton";
import MutationInformation from "./MutationInformation";
import useAllMutations from "../_hooks/useAllMutations";

export default function MutationsList() {
  const [selectedMutation, setSelectedMutation] = useState<Mutation>();
  const { mutations: allmutations } = useAllMutations();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {allmutations.map((mutation, inex) => {
          return (
            <MutationButton
              selected={selectedMutation}
              setSelected={setSelectedMutation}
              mutation={mutation}
              key={inex}
            />
          );
        })}
      </ScrollView>
      {selectedMutation && (
        <View style={styles.mutationInfo}>
          <MutationInformation selectedMutation={selectedMutation} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    height: "25%",
  },
  mutationInfo: {
    height: "75%",
  },
});
