import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import codegen from "vite-plugin-graphql-codegen";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dashboard/",
  plugins: [react(), TanStackRouterVite(), codegen()],
});
