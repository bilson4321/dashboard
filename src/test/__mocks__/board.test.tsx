import { getDataGridConfig } from "../../constants/highchart";

test("Configuration of Highchart", () => {
  expect(getDataGridConfig("cell", "connector")).toEqual({
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
