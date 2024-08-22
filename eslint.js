import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    {
        baseDirectory: __dirname,
    },
    eslintPluginPrettier
];