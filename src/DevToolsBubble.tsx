import { useState } from "react";
import { View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DevTools from "./DevTools";
import { TanstackLogo } from "./_components/devtools/svgs";
export function DevToolsBubble() {
  const [showDevTools, setShowDevTools] = useState(false);
  return (
    <View>
      {showDevTools ? (
        <View style={styles.devTools}>
          <DevTools setShowDevTools={setShowDevTools} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setShowDevTools(true);
          }}
          style={[
            styles.touchableOpacityBase,
            Platform.OS === "ios"
              ? styles.touchableOpacityIOS
              : styles.touchableOpacityAndroid,
          ]}
        >
          <TanstackLogo />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  devTools: {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 50,
    width: "100%",
    height: 350,
  },
  touchableOpacityBase: {
    position: "absolute",
    right: 1,
    zIndex: 50,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#A4C200",
  },
  touchableOpacityIOS: {
    bottom: 96,
  },
  touchableOpacityAndroid: {
    bottom: 64,
  },
  text: {
    zIndex: 10,
    color: "white",
    fontSize: 40,
    padding: 24,
  },
});
