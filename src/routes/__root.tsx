import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { AuthContext } from "../context/auth";

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});
