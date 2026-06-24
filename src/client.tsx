import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";

startTransition(() => {
  const hasSsrBootstrap = Boolean((window as { $_TSR?: unknown }).$_TSR);

  if (hasSsrBootstrap) {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
    return;
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const router = getRouter();
  router.routeTree.options.shellComponent = ({ children }) => <>{children}</>;

  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});