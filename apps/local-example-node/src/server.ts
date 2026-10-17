import Fastify from "fastify";
import { StellariumNode } from "stellarium-ts";
import { greet } from "./greetings.js";

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3200;
const baseUrl = process.env.BASE_URL ?? `http://127.0.0.1:${port}`;

const node = new StellariumNode();
await node.register(greet(baseUrl));

const fastify = Fastify({ logger: true });
await node.start(fastify, { port, host: "127.0.0.1" });
