import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [react(), dts(), svgr()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "react-components",
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
		},
	},
});
