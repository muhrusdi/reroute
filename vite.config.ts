import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/api/jsonplaceholder": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
      },
      "/api/themoviedb": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
      },
    },
  },
});
