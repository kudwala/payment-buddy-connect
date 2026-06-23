import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Настройка сервера для SSR (если используется)
    server: { entry: "server" },
  },
  vite: {
    // ВАЖНО: прописываем базовый путь для GitHub Pages
    // Это добавит /payment-buddy-connect/ перед всеми ссылками на скрипты и стили
    base: "/payment-buddy-connect/",
  },
});
