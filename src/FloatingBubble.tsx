import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from "react-native";
import DevTools from "./DevTools";
import { TanstackLogo } from "./_components/devtools/svgs";
export function FloatingBubble() {
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
          <Text style={styles.text}></Text>
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
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 24, // rounded-full
    borderWidth: 4,
    borderColor: "#A4C200",
  },
  touchableOpacityIOS: {
    bottom: 96, // bottom-24
  },
  touchableOpacityAndroid: {
    bottom: 64, // bottom-16
  },
  text: {
    zIndex: 10,
    color: "white",
    fontSize: 40, // text-5xl
    padding: 24, // p-6
  },
});
