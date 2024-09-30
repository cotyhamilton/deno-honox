export default function ThemeSwitcher() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
      class="rounded bg-primary py-2 pe-3 ps-4 font-bold text-primary-foreground"
    >
      click ✨
    </button>
  );
}
