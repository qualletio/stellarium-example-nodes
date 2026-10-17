import { generateKeyPairSync, randomBytes } from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    port: { type: "string" },
    "starting-peer": { type: "string" },
  },
});

if (!values.port) {
  console.error("ensure-env: pass --port");
  process.exit(1);
}

if (existsSync(".env")) {
  process.exit(0);
}

const { publicKey, privateKey } = generateKeyPairSync("ed25519", {
  publicKeyEncoding: { type: "spki", format: "der" },
  privateKeyEncoding: { type: "pkcs8", format: "der" },
});

const lines = [
  `BASE_URL=http://127.0.0.1:${values.port}`,
  `PORT=${values.port}`,
  `SIGNING_PUBLIC_KEY=${publicKey.toString("base64url")}`,
  `SIGNING_PRIVATE_KEY=${privateKey.toString("base64url")}`,
  `API_KEY=${randomBytes(24).toString("base64url")}`,
];

if (values["starting-peer"]) {
  lines.push(`STARTING_PEER=${values["starting-peer"]}`);
}

writeFileSync(".env", `${lines.join("\n")}\n`, { mode: 0o600 });
console.log(`Wrote .env for port ${values.port}.`);
