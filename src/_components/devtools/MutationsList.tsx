import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { Mutation } from "@tanstack/react-query";
import MutationButton from "./MutationButton";
import MutationInformation from "./MutationInformation";
import useAllMutations from "../_hooks/useAllMutations";

interface Props {
  selectedMutation: Mutation<any, any, any, any> | undefined;
  setSelectedMutation: React.Dispatch<
    React.SetStateAction<Mutation<any, any, any, any> | undefined>
  >;
}

export default function MutationsList({
  selectedMutation,
  setSelectedMutation,
}: Props) {
  const { mutations: allmutations } = useAllMutations();

  // Height management for resizable mutation information panel
  const screenHeight = Dimensions.get("window").height;
  const defaultInfoHeight = screenHeight * 0.4; // 40% of screen height
  const minInfoHeight = 150;
  const maxInfoHeight = screenHeight * 0.7; // 70% of screen height

  const infoHeightAnim = useRef(new Animated.Value(defaultInfoHeight)).current;
  const [currentInfoHeight, setCurrentInfoHeight] = useState(defaultInfoHeight);
  const currentInfoHeightRef = useRef(defaultInfoHeight);

  // Pan responder for dragging the mutation information panel
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {allmutations.map((mutation, inex) => {
          return (
            <MutationButton
              selected={selectedMutation}
              setSelectedMutation={setSelectedMutation}
              mutation={mutation}
              key={inex}
            />
          );
        })}
      </ScrollView>
      {selectedMutation && (
        <Animated.View
          style={[styles.mutationInfo, { height: infoHeightAnim }]}
        >
          {/* Drag handle for resizing */}
          <View style={styles.dragHandle} {...infoPanResponder.panHandlers}>
            <View style={styles.dragIndicator} />
          </View>
          <View style={styles.mutationInfoContent}>
            <MutationInformation selectedMutation={selectedMutation} />
          </View>
        </Animated.View>
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
  },
  mutationInfo: {
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
  mutationInfoContent: {
    flex: 1,
  },
});
