import { render } from "@testing-library/react";
import Spinner from "../components/spinner";
import { describe, it } from "vitest";

describe("Spinner component", () => {
  it("renders without crashing", ({ expect }) => {
    render(<Spinner />);
    expect(document.querySelector(".animate-spin")).toBeDefined();
  });
});
