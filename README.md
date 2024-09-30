# deno + honox

## how to

[Deno 2](https://deno.com/blog/v2.0-release-candidate) is required

```bash
deno upgrade
deno upgrade rc
```

Create [honox project](https://github.com/honojs/honox)

```bash
mkdir deno-honox
cd deno-honox
deno run -A npm:create-hono
# ? Target directory .
# ? Which template do you want to use? x-basic
# ? Do you want to install project dependencies? no
```

Cleanup

```bash
rm package.json tsconfig.json wrangler.toml
deno fmt
```

Install dependencies

```bash
deno add \
    npm:hono \
    npm:honox \
    npm:@hono/vite-build \
    npm:@hono/vite-dev-server \
    npm:vite
```

Update `deno.json`

```diff
{
+   "tasks": {
+     "dev": "vite",
+     "build": "vite build --mode client && vite build",
+     "preview": "(cd dist && deno serve -R index.js)"
+   },
  "imports": {
    "@hono/vite-build": "npm:@hono/vite-build@^1.1.0",
    "@hono/vite-dev-server": "npm:@hono/vite-dev-server@^0.16.0",
    "hono": "npm:hono@^4.6.3",
    "honox": "npm:honox@^0.1.25",
    "vite": "npm:vite@^5.4.8"
-   }
+   },
+   "exclude": [
+     "dist"
+   ],
+   "nodeModulesDir": "auto",
+   "compilerOptions": {
+     "lib": [
+       "esnext",
+       "dom",
+       "deno.ns",
+       "deno.unstable"
+     ],
+     "jsx": "react-jsx",
+     "jsxImportSource": "hono/jsx"
+   }
}
```

Update `vite.config.ts`

```diff
- import build from "@hono/vite-build/cloudflare-pages";
+ import build from "@hono/vite-build/deno";
- import adapter from "@hono/vite-dev-server/cloudflare";
+ import adapter from "@hono/vite-dev-server/node";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
+   cacheDir: "node_modules/.vite",
+   esbuild: {
+     jsx: "automatic",
+     jsxImportSource: "hono/jsx",
+   },
  plugins: [honox({ devServer: { adapter } }), build()],
});
```

Update demo (`app/routes/index.tsx`)

```diff
import { css } from "hono/css";
import { createRoute } from "honox/factory";
- import Counter from "../islands/counter";
+ import Counter from "../islands/counter.tsx";
```

### optional

Add tailwindcss

```bash
deno add \
  npm:tailwindcss \
  npm:postcss \
  npm:autoprefixer
deno run -A npm:tailwindcss init -p --esm --ts
```

Update `tailwind.config.ts`

```diff
import type { Config } from "tailwindcss";

export default {
-  content: [],
+  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

Add `app/app.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Update `app/client.ts`

```diff
import { createClient } from "honox/client";
+ import "./app.css"

createClient();
```

Update `app/routes/index.tsx`

```diff
- import { css } from "hono/css";
import { createRoute } from "honox/factory";
import Counter from "../islands/counter.tsx";

- const className = css`
-   font-family: sans-serif;
- `;

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
-     <div class={className}>
+     <div>
-       <h1>Hello, {name}!</h1>
+       <h1 class="text-2xl font-bold">Hello, {name}!</h1>
      <Counter />
    </div>,
    { title: name },
  );
});
```

Update `app/routes/_renderer.tsx`

```diff
- import { Link } from "honox/server";
+ import { Link, Script } from "honox/server";
...
<link rel="icon" href="/favicon.ico" />
+ <Link href="/app/app.css" rel="stylesheet" />
<Script src="/app/client.ts" async />
```

Update `vite.config.ts`

```diff
- plugins: [honox({ devServer: { adapter } }), build()],
+ plugins: [
+   honox({
+     client: {
+       input: ["/app/app.css"],
+     },
+     devServer: { adapter },
+   }),
+   build(),
+ ],
```

## dev

Install dependencies

```bash
deno install
```

Dev

```bash
deno task dev
```

Build

```bash
deno task build
```

Preview

```bash
deno task preview
```
