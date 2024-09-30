import { createRoute } from "honox/factory";
import ThemeSwitcher from "../islands/theme-switcher.tsx";

export default createRoute((c) => {
  return c.render(
    <div class="flex h-screen flex-col items-center justify-center space-y-4">
      <header>Deno + HonoX</header>
      <h1 class="text-3xl font-bold">Hello, World!</h1>
      <ThemeSwitcher />
    </div>,
    { title: "Deno + HonoX" },
  );
});
