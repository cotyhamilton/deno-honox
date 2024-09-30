export default function ThemeSwitcher() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
      class="rounded ps-4 pe-3 py-2 bg-primary text-primary-foreground font-bold"
    >
      click ✨
    </button>
  );
}
