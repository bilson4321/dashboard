import { describe, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useRocketData from "../hooks/useRocketData";

describe("useRocketData", () => {
  it("returns correctly", async ({ expect }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useRocketData(), { wrapper });
    waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data?.rockets?.length).toBeGreaterThan(0);
    });
  });
});
