import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react",
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
    }),
  ],
  base: "/OralCheckr/",
  // Explicitly handle environment variables for production builds
  define: {
    "import.meta.env.VITE_GOOGLE_CLIENT_ID": JSON.stringify(
      process.env.VITE_GOOGLE_CLIENT_ID
    ),
    "import.meta.env.VITE_API_URL": JSON.stringify(
      process.env.VITE_API_URL || "https://oralcheckr-backend.onrender.com"
    ),
  },
});
