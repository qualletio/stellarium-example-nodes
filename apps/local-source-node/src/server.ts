import Fastify from "fastify";
import { StellariumNode } from "stellarium-ts";

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3201;

/** `local-example-node` is this node's starting peer. */
const startingPeer = process.env.STARTING_PEER ?? "http://127.0.0.1:3200";

await waitForStartingPeer(startingPeer);

const node = new StellariumNode();
const fastify = Fastify({ logger: true });
await node.start(fastify, {
  port,
  host: "127.0.0.1",
  startingPeer,
});

async function waitForStartingPeer(origin: string): Promise<void> {
  const deadline = Date.now() + 30_000;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/v1/`);
      if (response.ok) {
        return;
      }
      lastError = new Error(`starting peer responded ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`starting peer ${origin} did not become ready`, {
    cause: lastError,
  });
}
