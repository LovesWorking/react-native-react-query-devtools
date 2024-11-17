# React Query Dev Tools (React Native)

  # Please use the latest version with expo or if using react-native-cli please use 1.1.0.
  ![rn-dev-tools-hq](https://github.com/LovesWorking/LovesWorking/assets/111514077/3c6a2d9f-1320-48cc-92f3-affe02f877ea)

## Introduction

**React Query Dev Tools** The same tool you know and love! Now available for React Native!

## Example 
- Find a basic example using the lates expo release with this tool here https://github.com/LovesWorking/RN-Dev-Tools-Example

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
import { DevToolsBubble } from 'react-native-react-query-devtools';
```

Next, integrate the DevToolsBubble component into your app. A common practice is to render it at the root of your layout to ensure it's accessible throughout your app. However, you have the flexibility to place it wherever.
  
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
