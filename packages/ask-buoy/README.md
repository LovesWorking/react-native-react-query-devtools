# @buoy-gg/ask-buoy

**Ask Buoy** — an AI chat sheet inside your React Native app that drives every Buoy devtool, for the people on your team who don't read code.

Your QA tester types *"make the double burger out of stock at store 100 and put it in my cart"* and it happens. No ticket, no dev, no knowing what a cart-item object looks like. Behind the chat, an agent calls the same **192 tool actions across 24 tools** that Buoy Desktop and the MCP server drive — network overrides, storage writes, react-query cache pokes, impersonation, navigation — and reports back in plain English.

**The model is yours.** Buoy never holds an API key and never proxies a request. You point Ask Buoy at your own endpoint and hand it headers from your app's own session.

## Setup

```bash
npm install @buoy-gg/ask-buoy
```

```tsx
import { FloatingDevTools } from "@buoy-gg/core";

<FloatingDevTools
  askBuoy={{
    endpoint: "https://ai.acme.com/v1/messages",
    protocol: "anthropic",          // or "openai" — Azure, Gemini-compat, most gateways
    model: "claude-opus-5",
    maxTokens: 8192,                // raise it on a thinking model; reasoning bills against this

    // Called before every request, so short-lived tokens work.
    // This is the whole auth story: your credential, your gateway.
    headers: async () => ({
      Authorization: `Bearer ${await auth.getToken()}`,
    }),
  }}
/>
```

The tool appears in the dial as **ASK BUOY**. This package is the chat; the *hands* are the other Buoy tools you have installed — each tool package you add (network, storage, impersonate, …) becomes something the agent can do.

**Already running Buoy?** Upgrade every `@buoy-gg/*` package to the same version in one command — `@buoy-gg/license` is an exact peer, and `npm install` exits 0 on the invalid tree it otherwise leaves behind.

### Teach it your data

The one input that most determines whether it gets your app right. Buoy discovers routes, query keys, store names and storage keys by watching the app run, and reads the item shape of every non-empty list it can see — what it can't know is what any of that *means*, or the shape of a collection that is currently empty.

```tsx
context: {
  notes: ["Prices are integer cents everywhere. `/api/*` ids are prefixed — ord_, usr_, itm_."],
  types: { CartLine: "{ lineId: string; itemId: string; qty: number; unitPrice: number }" },
}
```

The docs carry a prompt you can paste into a coding agent to draft both from your repo.

## What keeps it trustworthy

- **A visible changes bar** the moment it modifies anything — "Changed this app · 2 undoable · 1 permanent" — with real undo: storage writes and query-cache edits are pre-read so Undo restores the exact prior value, and anything with no captured prior value is labelled permanent rather than folded into a count Undo can't deliver.
- **Destructive actions wait for a tap** by default; everything else auto-runs behind the bar. Tunable with `policy` — `requireApproval`, `requireApprovalFor`, `allow`, `deny`, `maxSteps`, down to `readOnly: true` for a look-but-don't-touch support seat. **Settings → Permissions** exposes **Read only** and **Skip approval prompts** on the device, without a rebuild.
- **Release-build honesty**: the 24 actions that can't work outside a dev build are refused before dispatch with an explanation, never silently "succeed".
- **Credential redaction** by field name and value shape before anything reaches your model; the agent's own traffic is invisible to it; SecureStore *values* need `policy.secureReads`; the saved transcript keeps what was said but never a tool result (`persistTranscript: false` turns saving off entirely).
- **Show your work**: **Settings → Chat → Show agent thinking** adds a collapsed strip to every answer — `2 steps · 1 thought · 3.2s · 6210 tokens` — that opens into the model's reasoning and each step's exact payload and result. A step whose status is `ok` and whose result is `{"ok": false}` looks like a working step until you can see it.

## Beyond the chat

- **It survives a reload, a restart or a crash** — transcript, agent memory and unanswered approvals all come back, so "undo that" still means something.
- **Rich answers, not walls of text** — tables, choices, diffs, image grids, receipts and approval cards, from a closed block catalog the model authors against.
- **Keep typing while it works** — messages you send mid-turn park above the composer and send one at a time.
- **Summarize for a ticket** — one card with steps, expected, observed, build and the evidence it actually saw. Nothing is run or changed to produce it.
- **Watch it from Buoy Desktop** — the desk gets a read-only mirror of the conversation, what the agent changed and what it spent, plus remote undo. There is no remote composer on purpose: the broker has no auth.
- **Your own tools too** — a custom tool with a sync adapter is dispatchable as `custom:<id>`; hand Ask Buoy a `ToolDescriptor` for it via `tools` and the agent can drive it with the same validation, policy gates and release-truth refusals as a built-in.
- **`onEvent`** streams every engine event — tool starts and results, blocks, approvals, errors, per-request token usage — so you can log agent activity to your own systems and meter cost per seat.

## Docs

Full guide — gateway templates, model guidance, the exact list of what's sent to the model, policy reference: **[buoy.gg/docs/tools/ask-buoy](https://buoy.gg/buoy/latest/docs/tools/ask-buoy)**

The headless engine (catalog, providers, turn loop, effect ledger, blocks) lives in [`@buoy-gg/agent-core`](https://www.npmjs.com/package/@buoy-gg/agent-core).

## License

Ask Buoy requires a [Buoy Pro licence](https://buoy.gg/pricing). See [buoy.gg](https://buoy.gg) for licensing.
