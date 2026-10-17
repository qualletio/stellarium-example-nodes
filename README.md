# stellarium-example-nodes

A set of example nodes hosted by Quallet. The start of the network.

TypeScript Turborepo with two [`stellarium-ts`](https://docs.stellarium.sh) nodes:

| App                  | Port | Role                                                     |
| -------------------- | ---- | -------------------------------------------------------- |
| `local-example-node` | 3200 | Hosts one resource, `com.example.Weather`                |
| `local-source-node`  | 3201 | Hosts no resources. Bootstraps from `local-example-node` |

`local-source-node` passes `startingPeer: http://127.0.0.1:3200`, so it copies peers and resources from the example node after it is listening.

## Prerequisites

- Node.js 20+
- pnpm 10

## Run

```sh
pnpm install
pnpm dev
```

The first run writes a `.env` in each app (signing keys and an `API_KEY`). Those files stay on your machine.

`sh.stellarium.Greetings.greet` returns `Hello, ${name}!`. Call it through the source node, which forwards the request to the example node:

```sh
curl -X POST http://127.0.0.1:3201/v1/run \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $(awk -F= '/^API_KEY=/{print $2}' apps/local-source-node/.env)" \
  -d '{"source":"request Greet {\n  const greeting: sh.stellarium.Greetings \n  const msg = greeting.greet(name: \"John\")\n  return msg.value\n}"}'
```

```json
{ "returnValue": "Hello, John!" }
```
