import tailwind from "eslint-plugin-tailwindcss";
import parser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tailwind.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
