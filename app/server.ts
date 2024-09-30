import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import { serveStatic } from "hono/deno";

const app = createApp();

// @ts-ignore - injected by vite dev server
// if (import.meta.env.DEV) {
//   console.log("here ??");
//   app.use("/test/*", serveStatic({ root: "./" }));
// }

app.use("*", async (c, next) => {
  console.log(c), await next();
});

showRoutes(app);

export default app;
