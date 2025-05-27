import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Query } from "@tanstack/react-query";
import { getQueryStatusLabel } from "../_util/getQueryStatusLabel";
import { displayValue } from "./displayValue";

interface QueryRowProps {
  query: Query<any, any, any, any>;
  isSelected: boolean;
  onSelect: (query: Query<any, any, any, any>) => void;
}

const QueryRow: React.FC<QueryRowProps> = ({ query, isSelected, onSelect }) => {
  // Map status to color names
  const getStatusColor = (
    status: string
  ): "green" | "yellow" | "gray" | "blue" | "purple" | "red" => {
    switch (status) {
      case "fresh":
        return "green";
      case "stale":
      case "inactive":
        return "yellow";
      case "fetching":
        return "blue";
      case "paused":
        return "purple";
      default:
        return "gray";
    }
  };

  // Map color names to actual color values
  const getColorValue = (
    colorName: "green" | "yellow" | "gray" | "blue" | "purple" | "red",
    shade: "200" | "300" | "700" | "800" | "900"
  ): string => {
    const colors: Record<
      "green" | "yellow" | "gray" | "blue" | "purple" | "red",
      Record<"200" | "300" | "700" | "800" | "900", string>
    > = {
      green: {
        "200": "#bbf7d0",
        "300": "#86efac",
        "700": "#15803d",
        "800": "#166534",
        "900": "#14532d",
      },
      yellow: {
        "200": "#fef08a",
        "300": "#fde047",
        "700": "#a16207",
        "800": "#854d0e",
        "900": "#713f12",
      },
      gray: {
        "200": "#e5e7eb",
        "300": "#d1d5db",
        "700": "#374151",
        "800": "#1f2937",
        "900": "#111827",
      },
      blue: {
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a",
      },
      purple: {
        "200": "#e9d5ff",
        "300": "#d8b4fe",
        "700": "#7e22ce",
        "800": "#6b21a8",
        "900": "#581c87",
      },
      red: {
        "200": "#fecaca",
        "300": "#fca5a5",
        "700": "#b91c1c",
        "800": "#991b1b",
        "900": "#7f1d1d",
      },
    };

    return colors[colorName][shade];
  };

  const status = getQueryStatusLabel(query);
  const statusColor = getStatusColor(status);
  const observerCount = query.getObserversCount();
  const isDisabled = query.isDisabled();
  const queryHash = displayValue(query.queryKey, false);

  // Get background and text colors for observer count based on status
  const getObserverCountStyles = () => {
    if (statusColor === "gray") {
      return {
        backgroundColor: getColorValue(statusColor, "200"),
        color: getColorValue(statusColor, "700"),
      };
    }

    return {
      backgroundColor: getColorValue(statusColor, "200"),
      color: getColorValue(statusColor, "800"),
    };
  };

  return (
    <TouchableOpacity
      style={[styles.queryRow, isSelected && styles.selectedQueryRow]}
      onPress={() => onSelect(query)}
      activeOpacity={0.7}
      accessibilityLabel={`Query key ${queryHash}`}
    >
      {/* Observer count badge */}
      <View style={[styles.observerCount, getObserverCountStyles()]}>
        <Text
          style={[
            styles.observerCountText,
            { color: getObserverCountStyles().color },
          ]}
        >
          {observerCount}
        </Text>
      </View>

      {/* Query hash/key */}
      <Text style={styles.queryHash} numberOfLines={1} ellipsizeMode="middle">
        {queryHash}
      </Text>

      {/* Disabled indicator */}
      {isDisabled && (
        <View style={styles.disabledIndicator}>
          <Text style={styles.disabledText}>disabled</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  queryRow: {
    flexDirection: "row",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  selectedQueryRow: {
    backgroundColor: "#f3f4f6",
  },
  observerCount: {
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  observerCountText: {
    fontSize: 12,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  queryHash: {
    flex: 1,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#1f2937",
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlignVertical: "center",
  },
  disabledIndicator: {
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    alignSelf: "center",
  },
  disabledText: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default QueryRow;
