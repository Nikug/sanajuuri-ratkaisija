import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/recommended";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended, // replaces eslint:recommended
  solid,
  prettier,
];
