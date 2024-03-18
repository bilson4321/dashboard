import { RouterProvider, createRouter } from "@tanstack/react-router";

import { useAuth } from "./hooks/useAuth";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  basepath: "/dashboard",
  defaultPreload: "intent",
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
};

export default App;
