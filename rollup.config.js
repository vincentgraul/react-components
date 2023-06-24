const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "build/cjs",
        format: "cjs",
        preserveModules: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ outDir: "build/cjs", declarationDir: "build/cjs/src" }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [
      {
        dir: "build/esm",
        format: "esm",
        exports: "named",
        preserveModules: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ outDir: "build/esm", declarationDir: "build/esm/src" }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
];
