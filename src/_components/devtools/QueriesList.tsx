import React, { useState, useRef } from "react";
import { Query } from "@tanstack/react-query";
import { ScrollView, View, StyleSheet, SafeAreaView, LayoutChangeEvent } from "react-native";
import QueryButton from "./QueryButton";
import useAllQueries from "../_hooks/useAllQueries";
import QueryInformation from "./QueryInformation";
export default function QueriesList() {
  const [selectedQuery, setSelectedQuery] = useState<Query | undefined>(undefined);
  const [itemPositions, setItemPositions] = useState<{ [key: number]: { y: number, height: number } }>({});
  // Holds all queries
  const allQueries = useAllQueries();
  const scrollViewRef = useRef<ScrollView>(null);
  // Function to handle layout and capture each item's position
  const handleItemLayout = (event: LayoutChangeEvent, index: number) => {
    const { y, height } = event.nativeEvent.layout;
    setItemPositions(prevPositions => ({
      ...prevPositions,
      [index]: { y, height }
    }));
  };
  // Function to scroll to the selected query
  const handleQuerySelect = (query: Query, index: number) => {
    // If deselecting (i.e., clicking the same query), just update the state without scrolling
    if (query === selectedQuery) {
      setSelectedQuery(undefined);
      return;
    }
    setSelectedQuery(query); // Update the selected query
    // Scroll the ScrollView to the selected item's position
    if (scrollViewRef.current && itemPositions[index]) {
      const itemY = itemPositions[index].y;
      scrollViewRef.current.scrollTo({
        y: itemY,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        {allQueries.map((query, index) => (
          <View key={index} onLayout={(event) => handleItemLayout(event, index)}>
            <QueryButton
              selected={selectedQuery}
              setSelected={() => handleQuerySelect(query, index)}
              query={query}
            />
          </View>
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
    </SafeAreaView>
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
