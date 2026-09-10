# @buoy-gg/agent-core

The brain behind **Ask Buoy** — headless on purpose: no React, no react-native, no Node built-ins.

This package owns everything about the agent that isn't a pixel:

- **The tool catalog** — 192 actions across 24 Buoy tools, generated from one source file. JSON-Schema params validated *before* dispatch, per-action effect classes (read / write / destructive), and per-action release-build truth: the 24 actions that cannot work once `__DEV__` is false are refused with an explanation, never allowed to fake success. Each action's parameter *names* are printed to the model, which is what stopped it inventing field names (17.6% of param-carrying calls → 0.0%, measured on this repo's bank).
- **The turn loop** — provider streaming (Anthropic and OpenAI wire shapes, with prompt caching where the provider offers it), tool dispatch with independent reads overlapped, result redaction (credential field names *and* value shapes), self-traffic stripping, loop detection, history compression before rounds are dropped, and step and time caps.
- **The grounding digest** — a compact, values-free picture of the running app built from the tools themselves: route paths, storage and store key names, mounted-first query keys, and the item **shape** of every non-empty list in a store, with empty lists named as unknown rather than left to a guess. Bounded in depth, width and total characters, so a store keyed by a few hundred records can't turn a "compact" sketch into the largest thing in the prompt.
- **The effect ledger** — what the agent changed and how to put it back. Storage writes and query-cache edits are pre-read so undo restores exact prior values; whatever can't be undone is reported as permanent rather than hidden.
- **Policy** — approval gates (destructive waits for a human tap by default), allow/deny rules, per-call approval, read-only mode, and a SecureStore-values gate that is off by default.
- **Blocks** — the closed, declarative UI catalog (`buoy_ui`) the model authors rich responses with, plus engine-made receipts projected from tool results.

The only thing it needs from a host is a `dispatch(toolId, action, params)` function — which is why the same core runs on a device (via `@buoy-gg/ask-buoy`) and can run in Buoy Desktop over the broker without a rewrite.

## Use it

You almost certainly want [`@buoy-gg/ask-buoy`](https://www.npmjs.com/package/@buoy-gg/ask-buoy), the React Native chat sheet built on this. Install that; it brings this along.

Direct use is for custom hosts:

```ts
import { createAskBuoySession } from "@buoy-gg/agent-core";

const session = createAskBuoySession({
  endpoint, protocol: "anthropic", model,
  dispatch: myDispatch,           // (toolId, action, params) => Promise<unknown>
  availableActions,               // what this host can actually reach
  isRelease: false,
});

for await (const event of session.send("what did the last network call return?")) {
  // text deltas, reasoning, tool starts/ends, blocks, approvals, token usage
}
```

The catalog is generated: edit `src/catalog/catalog.source.json` and run `pnpm agent-catalog` (`pnpm agent-catalog:check` gates drift). An action missing from it does not exist to Ask Buoy, and a param without a real name and description is a param the model will guess at.

## Docs

**[buoy.gg/docs/tools/ask-buoy](https://buoy.gg/buoy/latest/docs/tools/ask-buoy)**

## License

See [buoy.gg](https://buoy.gg) for licensing.
