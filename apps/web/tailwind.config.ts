import tailwindConfig from "tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindConfig],
  content: [
    "./layouts/**/*.{vue,ts}",
    "./modules/**/*.{vue,ts}",
    "./pages/**/*.{vue,ts}",
  ],
  safelist: ["ml-2", "ml-4", "ml-6", "ml-8"],
  plugins: [require("@tailwindcss/forms")],
};

export default config;
