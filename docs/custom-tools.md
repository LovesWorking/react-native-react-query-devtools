---
title: Custom Tools
seoTitle: "Build Custom React Native DevTools — your own Buoy tool"
id: custom-tools
description: "Extend React Buoy with your own debugging tools — register any React component in your React Native app's floating devtools menu in just a few lines."
---

React Buoy is fully extensible. You can add any React component as a custom debugging tool.

## The component toolkit

Custom tools don't start from a blank screen — `@buoy-gg/core` ships the same
UI kit our first-party tools are built from: theme tokens, badges, buttons,
list rows, JSON viewers, diff viewers and more. Everything below is the **real
component rendered live** (via react-native-web) — search or filter to find
the pieces your tool needs, then import them straight from `@buoy-gg/core`.

<!-- ::toolkit-live-demo -->

## Basic Custom Tool

```tsx
import { FloatingDevTools } from "@buoy-gg/core";
import { View, Text, Button } from "react-native";

const CacheDebugger = () => {
  const clearCache = () => {
    // Your cache clearing logic
  };

  return (
    <View>
      <Text>Cache Status: 42 items</Text>
      <Button title="Clear Cache" onPress={clearCache} />
    </View>
  );
};

function App() {
  return (
    <FloatingDevTools
      environment="local"
      apps={[
        {
          id: "cache",
          name: "Cache",
          component: CacheDebugger,
          icon: "🗑️",
        },
      ]}
    />
  );
}
```

## Custom Tool Schema

Custom tools go in the `apps` prop, as `InstalledApp` objects:

```typescript
interface InstalledApp {
  /** Unique id — used for persistence, settings, and the `custom:<id>` sync namespace */
  id: string;

  /** Display name in the menu */
  name: string;

  /**
   * Menu icon. A plain string ("AUTH", "🗑️") renders as an auto-fitting text
   * icon; a ReactNode or a ({ slot, size }) => node component also work.
   */
  icon: React.ReactNode | ((ctx: FloatingMenuRenderCtx) => React.ReactNode);

  /** The React component to render */
  component: React.ComponentType<any>;

  /** Optional description shown in settings */
  description?: string;

  /** Optional accent color */
  color?: string;

  /** Sync to Buoy Desktop and make it drivable over MCP — see below */
  sync?: ToolSyncAdapter;
}
```

## Multiple Custom Tools

```tsx
<FloatingDevTools
  environment="local"
  apps={[
    {
      id: "auth",
      name: "Auth",
      component: AuthDebugger,
      icon: "🔐",
      description: "View auth state",
    },
    {
      id: "feature-flags",
      name: "Feature Flags",
      component: FeatureFlagViewer,
      icon: "🚩",
      description: "Toggle features",
    },
    {
      id: "analytics",
      name: "Analytics",
      component: AnalyticsDebugger,
      icon: "📊",
      description: "Event tracking",
    },
  ]}
/>
```

## Accessing App State

Your custom tools can use any React hooks or context:

```tsx
import { useAuth } from "./hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const AuthDebugger = () => {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const forceLogout = () => {
    logout();
    queryClient.clear();
  };

  return (
    <View>
      <Text>User: {user?.email ?? "Not logged in"}</Text>
      <Text>Role: {user?.role}</Text>
      <Button title="Force Logout" onPress={forceLogout} />
    </View>
  );
};
```

## Let the desktop, your AI, and Ask Buoy drive it

A custom tool doesn't have to stop at its own modal. Give it a `sync` adapter and it mirrors to [Buoy Desktop](./desktop) and becomes drivable over [MCP](./mcp) as `custom:<id>` — whether or not its modal is open.

```tsx
apps={[
  {
    id: "feature-flags",   // the agent and MCP reach it as `custom:feature-flags`
    name: "Feature Flags",
    component: FeatureFlagViewer,
    icon: "🚩",
    sync: {
      version: 1,
      getSnapshot: () => flagStore.getState(),          // JSON-serializable, keep it small
      subscribe: (onChange) => flagStore.subscribe(onChange),  // returns an unsubscribe
      actions: {
        setFlag: ({ name, on }) => flagStore.set(name, on),
      },
    },
  },
]}
```

Your tool is registered under `custom:<id>`, a namespace first-party tools can never shadow.

### And by Ask Buoy

[Ask Buoy](./tools/ask-buoy) is the one exception: it only offers what's in its catalog, so a synced custom tool is fully drivable from MCP while staying **invisible to the chat** until you describe it. Hand it a descriptor and the agent can use it:

```tsx
<FloatingDevTools
  apps={[/* … as above … */]}
  askBuoy={{
    endpoint, model,
    tools: [{
      toolId: "custom:feature-flags",   // must match the registered id
      title: "Feature flags",
      summary: "Read and set this app's feature flags.",
      actions: [{
        action: "setFlag",
        summary: "Turn one feature flag on or off.",
        params: {
          type: "object",
          properties: { name: { type: "string" }, on: { type: "boolean" } },
          required: ["name", "on"],
        },
        effect: "write",     // read | write | destructive — drives the approval gate
        release: "works",    // works | noop | empty | throws | unknown — anything else is refused in a release build
      }],
    }],
  }}
/>
```

Descriptors get the same treatment as the built-ins: params validated against the schema before dispatch, `effect` deciding whether the call needs a human tap, and `release` refusing a call that couldn't really work in this build instead of letting the agent report a success that never happened. Write real param names and a real `summary` — a parameter the model is never shown the name of is a parameter it will guess at.

## Next Steps

- [FloatingDevTools](./floating-devtools) — Core component reference
- [Buoy Desktop](./desktop) — The full desktop dashboard
- [Ask Buoy](./tools/ask-buoy) — The in-app chat that drives every tool
- [AI / MCP Server](./mcp) — Drive your app from your AI editor
- [Quick Start](./quick-start) — Full setup walkthrough
