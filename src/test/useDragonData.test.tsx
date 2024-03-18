import { describe, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useDragonData from "../hooks/useDragonData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("useDragonData", () => {
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

    const { result } = renderHook(() => useDragonData(), { wrapper });
    waitFor(() => {
      expect(result.current.isLoading).toBe(false);

      expect(result.current.data?.dragons?.length).toBeGreaterThan(0);
    });
  });
});
