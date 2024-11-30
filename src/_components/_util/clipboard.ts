let ExpoClipboard: {
  setStringAsync?: (text: string, options?: object) => Promise<boolean>;
  getStringAsync?: (options?: object) => Promise<string>;
} | null = null;
let RNClipboard: {
  setString(content: string): void;
  getString(): Promise<string>;
} | null = null;
// Try to import expo-clipboard
try {
  ExpoClipboard = require("expo-clipboard");
} catch (error) {
  console.log("expo-clipboard is not installed:", error);
  // Try to import react-native-clipboard as fallback
  try {
    RNClipboard = require("@react-native-clipboard/clipboard");
  } catch (error) {
    console.log("@react-native-clipboard/clipboard is not installed:", error);
  }
}

type ClipboardType = {
  setString: (text: string) => Promise<void>;
  getString: () => Promise<string>;
};

const clipboard: ClipboardType = {
  setString: async (text: string) => {
    if (ExpoClipboard?.setStringAsync) {
      await ExpoClipboard.setStringAsync(text, {});
    } else if (RNClipboard) {
      RNClipboard.setString(text);
    } else {
      throw new Error(
        "Clipboard functionality is not available. Please install either expo-clipboard or @react-native-clipboard/clipboard"
      );
    }
  },
  getString: async () => {
    if (ExpoClipboard?.getStringAsync) {
      return await ExpoClipboard.getStringAsync({});
    } else if (RNClipboard) {
      return await RNClipboard.getString();
    } else {
      throw new Error(
        "Clipboard functionality is not available. Please install either expo-clipboard or @react-native-clipboard/clipboard"
      );
    }
  },
};

export { clipboard };
