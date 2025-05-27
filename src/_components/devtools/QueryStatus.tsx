import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface QueryStatusProps {
  label: string;
  color: "green" | "yellow" | "gray" | "blue" | "purple" | "red";
  count: number;
  showLabel?: boolean;
}

type ColorName = "green" | "yellow" | "gray" | "blue" | "purple" | "red";
type ColorShade = "100" | "200" | "300" | "400" | "500" | "700" | "900";

const QueryStatus: React.FC<QueryStatusProps> = ({
  label,
  color,
  count,
  showLabel = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map color names to actual color values
  const getColorValue = (colorName: ColorName, shade: ColorShade): string => {
    const colors: Record<ColorName, Record<ColorShade, string>> = {
      green: {
        "100": "#dcfce7",
        "200": "#bbf7d0",
        "300": "#86efac",
        "400": "#4ade80",
        "500": "#22c55e",
        "700": "#15803d",
        "900": "#14532d",
      },
      yellow: {
        "100": "#fef9c3",
        "200": "#fef08a",
        "300": "#fde047",
        "400": "#facc15",
        "500": "#eab308",
        "700": "#a16207",
        "900": "#713f12",
      },
      gray: {
        "100": "#f3f4f6",
        "200": "#e5e7eb",
        "300": "#d1d5db",
        "400": "#9ca3af",
        "500": "#6b7280",
        "700": "#374151",
        "900": "#111827",
      },
      blue: {
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "700": "#1d4ed8",
        "900": "#1e3a8a",
      },
      purple: {
        "100": "#f3e8ff",
        "200": "#e9d5ff",
        "300": "#d8b4fe",
        "400": "#c084fc",
        "500": "#a855f7",
        "700": "#7e22ce",
        "900": "#581c87",
      },
      red: {
        "100": "#fee2e2",
        "200": "#fecaca",
        "300": "#fca5a5",
        "400": "#f87171",
        "500": "#ef4444",
        "700": "#b91c1c",
        "900": "#7f1d1d",
      },
    };

    return colors[colorName]?.[shade] || "#000000";
  };

  return (
    <TouchableOpacity
      style={[styles.queryStatusTag, !showLabel && styles.clickable]}
      disabled={showLabel}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      activeOpacity={0.7}
    >
      {!showLabel && isHovered && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{label}</Text>
        </View>
      )}

      <View
        style={[styles.dot, { backgroundColor: getColorValue(color, "500") }]}
      />

      {showLabel && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.countContainer,
          count > 0 &&
            color !== "gray" && {
              backgroundColor: getColorValue(color, "100"),
            },
        ]}
      >
        <Text
          style={[
            styles.count,
            count > 0 &&
              color !== "gray" && {
                color: getColorValue(color, "700"),
              },
          ]}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  queryStatusTag: {
    flexDirection: "row",
    gap: 6,
    height: 26,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
    padding: 4,
    paddingLeft: 6,
    alignItems: "center",
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    position: "relative",
  },
  clickable: {
    // cursor: 'pointer', // This doesn't exist in React Native
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
  },
  countContainer: {
    fontSize: 12,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    height: 18,
  },
  count: {
    fontSize: 12,
    color: "#6b7280",
    fontVariant: ["tabular-nums"],
  },
  tooltip: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#f9fafb",
    top: "100%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: 8 }],
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#9ca3af",
  },
  tooltipText: {
    fontSize: 12,
  },
});

export default QueryStatus;
