import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import QueriesList from "./_components/devtools/QueriesList";
import Svg, { Path } from "react-native-svg";
import MutationsList from "./_components/devtools/MutationsList";

interface Props {
  setShowDevTools: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DevTools({ setShowDevTools }: Props) {
  const [showQueries, setShowQueries] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShowDevTools(false);
        }}
        style={styles.closeButton}
      >
        <Svg width={8} height={8} viewBox="0 0 10 6" fill="none">
          <Path
            d="M1 1l4 4 4-4"
            stroke="#475467"
            strokeWidth={1.66667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
      <View style={styles.devToolsPanel}>
        <View style={styles.devToolsHeader}>
          <View style={styles.tanstackHeader}>
            <Text style={styles.tanstackText}>TANSTACK</Text>
            <View style={styles.reactQueryVersion}>
              <Text style={styles.reactQueryVersionText}>React Query v5</Text>
            </View>
          </View>
          <View style={styles.toggleButtonsContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowQueries(true);
              }}
              style={[
                styles.toggleButton,
                showQueries === true
                  ? styles.toggleButtonActive
                  : styles.toggleButtonInactive,
                {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  showQueries === true
                    ? styles.toggleButtonTextActive
                    : styles.toggleButtonTextInactive,
                ]}
              >
                Queries
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowQueries(false);
              }}
              style={[
                styles.toggleButton,
                showQueries === false
                  ? styles.toggleButtonActive
                  : styles.toggleButtonInactive,
                {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  showQueries === false
                    ? styles.toggleButtonTextActive
                    : styles.toggleButtonTextInactive,
                ]}
              >
                Mutations
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showQueries ? <QueriesList /> : <MutationsList />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    right: -2,
    top: -17,
    zIndex: 50,
    width: 22,
    height: 15,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "white",
    padding: 3,
    margin: 3,
    borderColor: "#98a2b3",
    borderWidth: 1,
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  devToolsPanel: {
    backgroundColor: "white",
    minWidth: 300,
    flex: 1,
    borderTopColor: "#98a2b3",
    borderTopWidth: 1,
  },
  devToolsHeader: {
    padding: 8,
    paddingBottom: 6,
    paddingTop: 6,
    borderColor: "#d0d5dd",
    borderBottomWidth: 2,
    paddingVertical: 1,
    flexDirection: "row",
  },
  tanstackHeader: {
    marginHorizontal: 2,
    paddingRight: 8,
  },
  tanstackText: {
    color: "#475467",
    fontWeight: "bold",
  },
  reactQueryVersion: {},
  reactQueryVersionText: {
    marginTop: -4,
    color: "#F97F1E",
  },
  toggleButtonsContainer: {
    flexDirection: "row",
    marginLeft: 1,
    alignItems: "center",
  },
  toggleButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    paddingHorizontal: 2,
    maxWidth: 100,
    borderRadius: 4,
  },
  toggleButtonActive: {
    backgroundColor: "#F2F4F7",
  },
  toggleButtonInactive: {
    backgroundColor: "#EAECF0",
  },
  toggleButtonText: {
    paddingRight: 4,
    paddingLeft: 4,
    fontSize: 12,
  },
  toggleButtonTextActive: {
    color: "#344054",
  },
  toggleButtonTextInactive: {
    color: "#909193",
  },
  comingSoonText: {
    margin: 3,
  },
});
