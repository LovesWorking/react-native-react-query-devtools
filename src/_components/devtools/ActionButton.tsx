import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

// Define the color mappings
const buttonColors = {
  btnRefetch: "#1570EF",
  btnInvalidate: "#DC6803",
  btnReset: "#475467",
  btnRemove: "#db2777",
  btnTriggerLoading: "#0891b2",
  btnTriggerLoadiError: "#ef4444",
};

const textColorMappings = {
  btnRefetch: "#1570EF",
  btnInvalidate: "#DC6803",
  btnReset: "#475467",
  btnRemove: "#db2777",
  btnTriggerLoading: "#0891b2",
  btnTriggerLoadiError: "#ef4444",
};

interface Props {
  onClick: () => void;
  text: string;
  bgColorClass: keyof typeof buttonColors;
  textColorClass: keyof typeof textColorMappings;
  disabled: boolean;
}

export default function ActionButton({
  onClick,
  text,
  textColorClass,
  bgColorClass,
  disabled,
}: Props) {
  // Map class names to actual color values
  const backgroundColor = buttonColors[bgColorClass];
  const textColor = textColorMappings[textColorClass] || "#FFFFFF"; // Default text color

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={[styles.button, { opacity: disabled ? 0.6 : 1 }]}
    >
      <View style={[styles.dot, { backgroundColor: textColor }]}></View>
      <Text
        style={[styles.text, { color: textColor, opacity: disabled ? 0.6 : 1 }]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    backgroundColor: "#f2f4f7",
    height: 30,
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
  },
});
