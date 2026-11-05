import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Dev routes → [module, exported handler]; production runs the same handlers as Vercel Functions in api/.
const apiRoutes = {
  "/api/ask": ["/server/ask.ts", "handleAsk"],
  "/api/visits": ["/server/visits.ts", "handleVisits"],
} as const;

/** Serves /api/* during `npm run dev` with the same handlers Vercel runs in production. */
function apiDev(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      for (const [route, [file, name]] of Object.entries(apiRoutes)) {
        server.middlewares.use(route, async (req, res) => {
          const handler = (await server.ssrLoadModule(file))[name];
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const request = new Request(`http://localhost${req.url ?? ""}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
          });
          const response: Response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          if (!response.body) return res.end();
          const reader = response.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
          res.end();
        });
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Make server-only keys from .env available to the dev API routes (they are never sent to the browser).
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["ANTHROPIC_API_KEY", "KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"])
    if (env[key]) process.env[key] ??= env[key];

  return {
    plugins: [react(), apiDev()],
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "framer-motion": ["framer-motion"],
            icons: ["lucide-react", "react-icons/fa", "react-icons/fa6", "react-icons/si"],
          },
        },
      },
    },
  };
});
