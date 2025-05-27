import React, { useState, useRef } from "react";
import { Query } from "@tanstack/react-query";
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import QueryRow from "./QueryRow";
import useAllQueries from "../_hooks/useAllQueries";
import QueryInformation from "./QueryInformation";

interface Props {
  selectedQuery: Query<any, any, any, any> | undefined;
  setSelectedQuery: React.Dispatch<
    React.SetStateAction<Query<any, any, any, any> | undefined>
  >;
}

export default function QueriesList({
  selectedQuery,
  setSelectedQuery,
}: Props) {
  // Holds all queries
  const allQueries = useAllQueries();

  // Height management for resizable query information panel
  const screenHeight = Dimensions.get("window").height;
  const defaultInfoHeight = screenHeight * 0.4; // 40% of screen height
  const minInfoHeight = 150;
  const maxInfoHeight = screenHeight * 0.7; // 70% of screen height

  const infoHeightAnim = useRef(new Animated.Value(defaultInfoHeight)).current;
  const [currentInfoHeight, setCurrentInfoHeight] = useState(defaultInfoHeight);
  const currentInfoHeightRef = useRef(defaultInfoHeight);

  // Pan responder for dragging the query information panel
  const infoPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 10
        );
      },
      onPanResponderGrant: () => {
        infoHeightAnim.stopAnimation((value) => {
          setCurrentInfoHeight(value);
          currentInfoHeightRef.current = value;
          infoHeightAnim.setValue(value);
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        // Use the ref value which is always current
        const newHeight = currentInfoHeightRef.current - gestureState.dy;
        const clampedHeight = Math.max(
          minInfoHeight,
          Math.min(maxInfoHeight, newHeight)
        );
        infoHeightAnim.setValue(clampedHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const finalHeight = Math.max(
          minInfoHeight,
          Math.min(
            maxInfoHeight,
            currentInfoHeightRef.current - gestureState.dy
          )
        );
        setCurrentInfoHeight(finalHeight);
        currentInfoHeightRef.current = finalHeight;

        Animated.timing(infoHeightAnim, {
          toValue: finalHeight,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          // Ensure the animated value and state are perfectly synced after animation
          infoHeightAnim.setValue(finalHeight);
          setCurrentInfoHeight(finalHeight);
          currentInfoHeightRef.current = finalHeight;
        });
      },
    })
  ).current;

  // Function to handle query selection
  const handleQuerySelect = (query: Query<any, any, any, any>) => {
    // If deselecting (i.e., clicking the same query), just update the state
    if (query === selectedQuery) {
      setSelectedQuery(undefined);
      return;
    }
    setSelectedQuery(query); // Update the selected query
  };

  const renderItem = ({ item }: { item: Query<any, any, any, any> }) => (
    <QueryRow
      query={item}
      isSelected={selectedQuery === item}
      onSelect={handleQuerySelect}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        {allQueries.length > 0 ? (
          <FlatList
            data={allQueries}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              `${JSON.stringify(item.queryKey)}-${index}`
            }
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No queries found</Text>
          </View>
        )}
      </View>
      {selectedQuery && (
        <Animated.View
          style={[styles.queryInformation, { height: infoHeightAnim }]}
        >
          {/* Drag handle for resizing */}
          <View style={styles.dragHandle} {...infoPanResponder.panHandlers}>
            <View style={styles.dragIndicator} />
          </View>
          <View style={styles.queryInfoContent}>
            <QueryInformation
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 16,
  },
  queryInformation: {
    borderTopWidth: 2,
    borderTopColor: "#d0d5dd",
    backgroundColor: "#ffffff",
  },
  dragHandle: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  dragIndicator: {
    width: 50,
    height: 4,
    backgroundColor: "#98a2b3",
    borderRadius: 2,
    opacity: 0.8,
  },
  queryInfoContent: {
    flex: 1,
  },
});
