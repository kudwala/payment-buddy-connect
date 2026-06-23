import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router"; // Добавили импорт
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Создаем историю на основе хешей для совместимости с GitHub Pages
  const hashHistory = createHashHistory();

  const router = createRouter({
    routeTree,
    history: hashHistory, // Указываем роутеру использовать хеш-историю
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
