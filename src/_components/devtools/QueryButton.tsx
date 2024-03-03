import { getQueryStatusLabel } from "../_util/getQueryStatusLabel";
import { getStatusBgColorStyle } from "../_util/statusTobgColorClass";
import { Query } from "@tanstack/react-query";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import React from "react";
import { displayValue } from "./displayValue";
interface Props {
  query: Query;
  setSelected: React.Dispatch<React.SetStateAction<Query | undefined>>;
  selected: Query | undefined;
}
export default function QueryButton({ query, setSelected, selected }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(query === selected ? undefined : query);
      }}
      style={[
        styles.touchableOpacityBase,
        selected?.queryKey === query.queryKey &&
          styles.touchableOpacitySelected,
      ]}
    >
      <Text
        style={[
          styles.textBase,
          getStatusBgColorStyle(getQueryStatusLabel(query)),
        ]}
      >
        {`${query.getObserversCount()}`}
      </Text>
      <Text style={styles.queryKeyText}>{`${displayValue(
        query.queryKey,
        false
      )}`}</Text>
      {query.isDisabled() && <Text style={styles.disabledText}>disabled</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacityBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#d0d5dd",
  },
  touchableOpacitySelected: {
    backgroundColor: "#eaecf0",
  },
  textBase: {
    textAlign: "center",
    minWidth: 30,
    maxWidth: 30,
    paddingVertical: 6,
    fontSize: 12,
  },
  queryKeyText: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 1,
    paddingHorizontal: 2,
    fontSize: 12,
    paddingLeft: 5,
  },
  disabledText: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 2,
    color: "#1d2939",
    backgroundColor: "#d0d5dd",
    borderBottomWidth: 1,
    borderBottomColor: "#d0d5dd",
  },
});
