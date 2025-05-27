import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponderInstance,
} from "react-native";
import QueryStatusCount from "./QueryStatusCount";
import NetworkToggleButton from "./NetworkToggleButton";
import ClearCacheButton from "./ClearCacheButton";

interface Props {
  showQueries: boolean;
  setShowQueries: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDevTools: React.Dispatch<React.SetStateAction<boolean>>;
  onTabChange?: (showQueries: boolean) => void;
  panResponder?: PanResponderInstance;
  isOffline: boolean;
  onToggleNetwork: () => void;
  onClearCache: () => void;
}

export default function DevToolsHeader({
  showQueries,
  setShowQueries,
  setShowDevTools,
  onTabChange,
  panResponder,
  isOffline,
  onToggleNetwork,
  onClearCache,
}: Props) {
  const handleTabChange = (newShowQueries: boolean) => {
    if (onTabChange) {
      onTabChange(newShowQueries);
    } else {
      setShowQueries(newShowQueries);
    }
  };

  return (
    <View style={styles.devToolsHeader} {...(panResponder?.panHandlers || {})}>
      {/* Drag indicator */}
      <View style={styles.dragIndicator} />

      <View style={styles.mainRow}>
        <TouchableOpacity
          style={styles.tanstackHeader}
          onPress={() => {
            setShowDevTools(false);
          }}
          accessibilityLabel="Close Tanstack query devtools"
        >
          <Text style={styles.tanstackText}>TANSTACK</Text>
          <Text style={styles.reactNativeText}>React Native</Text>
        </TouchableOpacity>

        <View style={styles.toggleButtonsContainer}>
          <TouchableOpacity
            onPress={() => {
              handleTabChange(true);
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
              handleTabChange(false);
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

        <ClearCacheButton
          type={showQueries ? "queries" : "mutations"}
          onClear={onClearCache}
        />

        <NetworkToggleButton isOffline={isOffline} onToggle={onToggleNetwork} />

        <QueryStatusCount />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  devToolsHeader: {
    padding: 4,
    paddingBottom: 4,
    paddingTop: 8,
    borderColor: "#d0d5dd",
    borderBottomWidth: 2,
    flexDirection: "column",
    gap: 4,
    minHeight: 60,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: "#98a2b3",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 6,
    opacity: 0.8,
  },
  mainRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  tanstackHeader: {
    flexDirection: "column",
    gap: 2,
    marginHorizontal: 2,
    paddingRight: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  tanstackText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 16,
    color: "#475467",
  },
  reactNativeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ea4037",
    marginTop: -4,
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
});
