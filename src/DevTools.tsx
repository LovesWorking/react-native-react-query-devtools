import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponderInstance,
} from "react-native";
import {
  Query,
  Mutation,
  onlineManager,
  useQueryClient,
} from "@tanstack/react-query";
import QueriesList from "./_components/devtools/QueriesList";
import Svg, { Path } from "react-native-svg";
import MutationsList from "./_components/devtools/MutationsList";
import DevToolsHeader from "./_components/devtools/DevToolsHeader";

interface Props {
  setShowDevTools: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectionChange?: (hasSelection: boolean) => void;
  panResponder?: PanResponderInstance;
}

export default function DevTools({
  setShowDevTools,
  onSelectionChange,
  panResponder,
}: Props) {
  const queryClient = useQueryClient();
  const [showQueries, setShowQueries] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<
    Query<any, any, any, any> | undefined
  >(undefined);
  const [selectedMutation, setSelectedMutation] = useState<
    Mutation<any, any, any, any> | undefined
  >(undefined);
  const [isOffline, setIsOffline] = useState(!onlineManager.isOnline());

  // Clear selections when switching tabs
  const handleTabChange = (newShowQueries: boolean) => {
    if (newShowQueries !== showQueries) {
      setSelectedQuery(undefined);
      setSelectedMutation(undefined);
    }
    setShowQueries(newShowQueries);
  };

  // Handle network toggle
  const handleToggleNetwork = () => {
    const newOfflineState = !isOffline;
    setIsOffline(newOfflineState);
    onlineManager.setOnline(!newOfflineState);
  };

  // Handle cache clearing
  const handleClearCache = () => {
    if (showQueries) {
      queryClient.getQueryCache().clear();
      setSelectedQuery(undefined);
    } else {
      queryClient.getMutationCache().clear();
      setSelectedMutation(undefined);
    }
  };

  // Notify parent when selection state changes
  React.useEffect(() => {
    const hasSelection =
      selectedQuery !== undefined || selectedMutation !== undefined;
    onSelectionChange?.(hasSelection);
  }, [selectedQuery, selectedMutation, onSelectionChange]);

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
        <DevToolsHeader
          showQueries={showQueries}
          setShowQueries={setShowQueries}
          setShowDevTools={setShowDevTools}
          onTabChange={handleTabChange}
          panResponder={panResponder}
          isOffline={isOffline}
          onToggleNetwork={handleToggleNetwork}
          onClearCache={handleClearCache}
        />
        {showQueries ? (
          <QueriesList
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
          />
        ) : (
          <MutationsList
            selectedMutation={selectedMutation}
            setSelectedMutation={setSelectedMutation}
          />
        )}
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
  comingSoonText: {
    margin: 3,
  },
});
