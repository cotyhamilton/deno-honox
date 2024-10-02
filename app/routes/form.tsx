import { Hono } from "hono";

/**
 * THIS IS A TEST
 */

const app = new Hono();

app.post("/", async (c) => {
  const form = await c.req.formData();
  const name = form.get("name");
  return c.render(<p>your name: {name}</p>);
});

app.get("/", (c) => {
  return c.render(
    <form method="post" class="container mt-8">
      <input class="mr-2 rounded border p-2 text-lg" type="text" name="name" />
      <input
        class="rounded bg-primary p-2 text-lg text-primary-foreground"
        type="submit"
      />
    </form>,
  );
});

export default app;
