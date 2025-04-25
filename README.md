# React Query Dev Tools (React Native)

I would use my new app package which works much better until I have more free time to fix some of the issues in this package.

https://github.com/LovesWorking/rn-better-dev-tools


## Introduction

**React Query Dev Tools** The same tool you know and love! Now available for React Native!

![rn-dev-tools-hq](https://github.com/LovesWorking/LovesWorking/assets/111514077/3c6a2d9f-1320-48cc-92f3-affe02f877ea)

## Example

- Find a basic example using the latest expo release with this tool here https://github.com/LovesWorking/RN-Dev-Tools-Example

### Prerequisites

- React native version 0.63.0 or above.
- React Query version 5.17.19 or above.
- react-native-svg 15.0.0 or above.

### Installation

To integrate React Query Dev Tools into your React Native project, follow these simple installation steps. Open your terminal, navigate to your project directory, and execute:

```bash
npm install react-native-react-query-devtools
```

This command adds the react-native-react-query-devtools package to your project dependencies, making the Dev Tools available for use.

## Usage

Incorporating React Query Dev Tools into your application is straightforward. Begin by importing the DevToolsBubble component.

```javascript
import { DevToolsBubble } from "react-native-react-query-devtools";
```

Next, integrate the DevToolsBubble component into your app. To enable object copying functionality, you must provide a custom copy function that works with your platform (Expo or React Native CLI).

```javascript
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  // Define your copy function based on your platform
  const onCopy = async (text: string) => {
    try {
      // For Expo:
      await Clipboard.setStringAsync(text);
      // OR for React Native CLI:
      // await Clipboard.setString(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
      <DevToolsBubble onCopy={onCopy} />
    </QueryClientProvider>
  );
}
```

### Copy Function

The `onCopy` prop is required to enable copying functionality in the dev tools. This function should:

- Accept a string parameter
- Return a Promise<boolean>
- Return true if the copy was successful, false otherwise

Example implementations:

For Expo:

```typescript
import * as Clipboard from "expo-clipboard";

const onCopy = async (text: string) => {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch {
    return false;
  }
};
```

For React Native CLI:

```typescript
import Clipboard from "@react-native-clipboard/clipboard";

const onCopy = async (text: string) => {
  try {
    await Clipboard.setString(text);
    return true;
  } catch {
    return false;
  }
};
```
