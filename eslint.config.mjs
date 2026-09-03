import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Generated Prisma artifacts
    "src/prisma/contract.d.ts",
    "migrations/**",

    // Prisma agent skill installations
    ".agents/**",
    ".claude/**",
    ".cursor/**",
    ".devin/**",
  ]),
]);

export default eslintConfig;
