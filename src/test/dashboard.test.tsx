import { getDataGridConfig } from "../constants/highchart";
import { describe, it } from "vitest";

describe("Configuration of Highchart", () => {
  it("returns correctly", ({ expect }) => {
    const config = getDataGridConfig("cell", "connector");

    expect(config).toEqual({
      connector: {
        id: "connector",
      },
      cell: "cell",
      type: "DataGrid",
      dataGridOptions: {
        editable: false,
      },
      sync: {
        visibility: true,
        highlight: true,
        extremes: true,
      },
    });
  });
});
