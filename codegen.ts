import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnv } from "vite";

process.env = { ...process.env, ...loadEnv("", process.cwd()) };

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_API_ENDPOINT!,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
