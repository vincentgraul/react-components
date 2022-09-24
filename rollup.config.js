const typescript = require("@rollup/plugin-typescript");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "build/cjs",
        format: "cjs",
        preserveModules: true,
      },
    ],
    plugins: [typescript({ outDir: "build/cjs", declarationDir: "build/cjs" })],
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
    plugins: [typescript({ outDir: "build/esm", declarationDir: "build/esm" })],
  },
];
