import { createRoute } from "honox/factory";
import ThemeSwitcher from "../islands/theme-switcher.tsx";

export default createRoute((c) => {
  return c.render(
    <div class="flex flex-col items-center justify-center h-screen space-y-4">
      <header>Deno + HonoX</header>
      <h1 class="font-bold text-3xl">Hello, World!</h1>
      <ThemeSwitcher />
    </div>,
    { title: "Deno + HonoX" },
  );
});
