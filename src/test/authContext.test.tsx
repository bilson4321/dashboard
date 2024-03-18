import { render, screen } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../context/auth";
import { useContext, useEffect } from "react";
import { describe, it } from "vitest";

// Mock component that consumes the context
const MockComponent = () => {
  const auth = useContext(AuthContext);
  const { user, setUser } = auth || {};

  useEffect(() => {
    if (setUser) {
      setUser("TEST");
    }
  }, [setUser]);

  return user ? <div>{user}</div> : null;
};

describe("AuthProvider", () => {
  it("provides the auth context", ({ expect }) => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(screen.getAllByText("TEST")).toBeDefined();
  });
});
