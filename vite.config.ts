import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

export default defineConfig({
	plugins: [react(), dts()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
		},
		rollupOptions: {
			external: [
				...Object.keys(pkg.dependencies),
				...Object.keys(pkg.peerDependencies),
				"react/jsx-runtime",
			],
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		},
	},
});
