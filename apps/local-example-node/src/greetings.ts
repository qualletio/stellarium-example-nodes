import type { StellariumResource } from "stellarium-ts";

export function greet(baseUrl: string): StellariumResource {
  return {
    id: 1,
    baseUrl,
    metadata: {},
    path: "sh.stellarium",
    name: "Greetings",
    functions: [
      {
        name: "greet",
        parameters: [{ name: "name", type: "string" }],
        returnType: "string",
        exec: async (args) => {
          const name = args.find((arg) => arg.name === "name")?.value;
          return `Hello, ${name}!`;
        },
      },
    ],
  };
}
