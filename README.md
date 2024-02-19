# React Query Dev Tools (React Native)

![rn-dev-tools-hq](https://github.com/LovesWorking/react-query-external-dash/assets/111514077/cba61dd3-bd3f-47a7-9573-1efa088084a0)

## Introduction

**React Query Dev Tools** The same tool you know and love! Now available for React Native!

## Example 
- Find a basic example using the lates expo release with this tool here https://github.com/LovesWorking/RN-Dev-Tools-Example

### Installation

To integrate React Query Dev Tools into your React Native project, follow these simple installation steps. Open your terminal, navigate to your project directory, and execute:

```bash
npm install react-native-react-query-devtools
```
This command adds the react-native-react-query-devtools package to your project dependencies, making the Dev Tools available for use.

## Usage
Incorporating React Query Dev Tools into your application is straightforward. Begin by importing the DevToolsBubble component.
```javascript
import DevToolsBubble from 'react-native-react-query-devtools';
```

Next, integrate the DevToolsBubble component into your app. A common practice is to render it at the root of your layout to ensure it's accessible throughout your app. However, you have the flexibility to place it wherever.
  
```javascript
import React from 'react';
import { View } from 'react-native';
import DevToolsBubble from 'react-native-react-query-devtools';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Other components */}
      <DevToolsBubble />
    </View>
  );
};

export default App;
```
