# React Query Dev Tools (React Native)

![rn-dev-tools-hq](https://github.com/LovesWorking/LovesWorking/assets/111514077/3c6a2d9f-1320-48cc-92f3-affe02f877ea)

## Introduction

**React Query Dev Tools** The same tool you know and love! Now available for React Native! A lightweight, easy-to-use development toolset for debugging and inspecting React Query states in your React Native applications. Works seamlessly with both Expo and React Native CLI projects.

## Features

- 🔍 Real-time query inspection
- 📱 Native mobile-friendly interface
- 🚀 Zero configuration required
- ⚡️ Zero impact on your app's performance
- 💻 Works with both Expo and React Native CLI

## Example

Check out our [example project](https://github.com/LovesWorking/RN-Dev-Tools-Example) to see the Dev Tools in action.

### Prerequisites

- React Native version 0.63.0 or above
- React Query version 5.17.19 or above
- react-native-svg 15.0.0 or above

### Installation

```bash
# npm
npm install react-native-react-query-devtools

# For Expo projects, also install:
npx expo install expo-clipboard

# For React Native CLI projects, also install:
npm install @react-native-clipboard/clipboard
```

# yarn

yarn add react-native-react-query-devtools

# For Expo projects, also install:

yarn add expo-clipboard

# For React Native CLI projects, also install:

yarn add @react-native-clipboard/clipboard

````

## Usage

1. Import the DevToolsBubble component:

```javascript
import { DevToolsBubble } from "react-native-react-query-devtools";
````

2. Add it to your app's root component:

```javascript
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
      <DevToolsBubble />
    </QueryClientProvider>
  );
}
```

## Props

| Prop          | Type                                                         | Default        | Description                                  |
| ------------- | ------------------------------------------------------------ | -------------- | -------------------------------------------- |
| initialIsOpen | boolean                                                      | false          | Whether the DevTools should be open on mount |
| position      | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'bottom-right' | Position of the DevTools bubble              |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

If you're having issues or have questions, please [file an issue](https://github.com/YourUsername/react-native-react-query-devtools/issues).

## Acknowledgments

- Thanks to the [TanStack Query](https://tanstack.com/query/latest) team for the original React Query DevTools
