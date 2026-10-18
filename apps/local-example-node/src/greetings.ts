import type { StellariumResource } from "stellarium-ts";

export function greet(baseUrl: string): StellariumResource {
  return {
    id: 1,
    baseUrl,
    metadata: {},
    path: "sh.stellarium",
    name: "Greetings",
    description: "A simple greeting resource",
    website: "https://github.com/qualletio/stellarium-example-nodes",
    functions: [
      {
        name: "greet",
        parameters: [{ 
          name: "name", 
          type: "string",
          description: "The name of the person to greet"
        }],
        description: "Send a greeting message",
        returnType: "string",
        exec: async (args) => {
          const name = args.find((arg) => arg.name === "name")?.value;
          return `Hello, ${name}!`;
        },
      },
    ],
  };
}
