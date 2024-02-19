import React, { useState } from "react";
import { Query } from "@tanstack/react-query";
import QueryButton from "./QueryButton";
import { ScrollView, View, StyleSheet } from "react-native";
import useAllQueries from "../_hooks/useAllQueries";
import QueryInformation from "./QueryInformation";
export default function QueriesList() {
  const [selectedQuery, setSelectedQuery] = useState<Query>();
  // Holds all queries
  const allQueries = useAllQueries();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {allQueries.map((query, index) => (
          <QueryButton
            selected={selectedQuery}
            setSelected={setSelectedQuery}
            query={query}
            key={index}
          />
        ))}
      </ScrollView>
      {selectedQuery && (
        <View style={styles.queryInformation}>
          <QueryInformation
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "25%",
  },
  queryInformation: {
    height: "75%",
  },
});
