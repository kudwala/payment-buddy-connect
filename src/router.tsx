import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Hash history requires `window` and crashes during SSR/prerender.
  // On the server we let the router use its default memory history;
  // on the client we use hash history for GitHub Pages compatibility.
  const history =
    typeof window !== "undefined" ? createHashHistory() : undefined;

  const router = createRouter({
    routeTree,
    ...(history ? { history } : {}),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
