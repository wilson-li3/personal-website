// vite.config.js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import Icons from "unplugin-icons/vite"

export default defineConfig({
  plugins: [
    react(),
    Icons({ compiler: "jsx", jsx: "react" }),
  ],
  base: "/", // for custom domain
})
