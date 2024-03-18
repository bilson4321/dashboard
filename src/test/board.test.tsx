import HighChartDashboard from "../components/board";
import { DataPoolConnectorOptions } from "@highcharts/dashboards/es-modules/Data/DataPoolOptions";
import { render, screen } from "@testing-library/react";

import { describe, it } from "vitest";

describe("Highchart render", () => {
  it("renders correctly", ({ expect }) => {
    const dataPoolConnectorOptions: DataPoolConnectorOptions[] = [
      {
        id: "rocket-data",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          columnNames: ["Name", "Cost", "Payload"],
          data: [
            ["Parmanu", 1000000, 1000],
            ["Bajra", 2000000, 2000],
            ["Kalki", 3000000, 3000],
          ],
        },
      },
      {
        id: "dragon-data",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          columnNames: ["Name", "Crew Capacity", "Dry Mass"],
          data: [
            ["Dragon1", 4, 1000],
            ["Dragon2", 5, 2000],
            ["Dragon3", 6, 3000],
          ],
        },
      },
    ];
    render(<HighChartDashboard dataPoolOptions={dataPoolConnectorOptions} />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.findAllByText("Parmanu")).toBeDefined();
    expect(screen.findAllByText("Bajra")).toBeDefined();
    expect(screen.findAllByText("Kalki")).toBeDefined();
    expect(screen.findAllByText("Dragon1")).toBeDefined();
    expect(screen.findAllByText("Dragon2")).toBeDefined();
    expect(screen.findAllByText("Dragon3")).toBeDefined();
  });
});
