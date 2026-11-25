import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O proxy manda /api para o back-end (evita problema de CORS em desenvolvimento)
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { "/api": "http://localhost:8080" } },
});
