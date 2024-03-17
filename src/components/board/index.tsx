import { useEffect, useRef } from "react";
import "./style.css";

import Highcharts from "highcharts";
import Dashboards, { Board } from "@highcharts/dashboards";
import DataGrid from "@highcharts/dashboards/datagrid";
import LayoutModule from "@highcharts/dashboards/modules/layout";
import {
  HIGH_CHART_LAYOUT_KEY,
  dashboardConfig,
} from "../../constants/dashboard";
import { AllRocketsQuery } from "../../gql/graphql";

LayoutModule(Dashboards);

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

interface HighChartDashboardProps {
  data?: AllRocketsQuery;
}
const HighChartDashboard = (props: HighChartDashboardProps) => {
  const { data } = props;
  const boardRef = useRef<Board | null>(null);
  useEffect(() => {
    const boardOption = localStorage.getItem(HIGH_CHART_LAYOUT_KEY);
    const board = Dashboards.board(
      "container",
      boardOption ? JSON.parse(boardOption) : dashboardConfig
    );
    board.importLayoutLocal(HIGH_CHART_LAYOUT_KEY);
    boardRef.current = board;
  }, []);

  useEffect(() => {
    if (boardRef.current && data?.rockets) {
      boardRef.current.dataPool?.setConnectorOptions({
        id: "rocket-data",
        type: "JSON",
        options: {
          firstRowAsNames: false,
          columnNames: ["Name", "Cost", "Payload"],
          data: data?.rockets?.map((rocket) => [
            rocket?.name ?? "",
            rocket?.cost_per_launch ?? 0,
            rocket?.payload_weights?.reduce((acc, payload) => {
              const kg = payload?.kg ?? 0;
              return acc + kg;
            }, 0) ?? 0,
          ]),
        },
      });

      boardRef.current.setComponents([
        {
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          cell: HIGH_CHART_LAYOUT_KEY,
          id: "rocket-data",
          type: "DataGrid",
          connector: {
            id: "rocket-data",
          },
        },
      ]);

      boardRef.current.setComponents([
        {
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          connector: {
            id: "rocket-data",
          },
          cell: HIGH_CHART_LAYOUT_KEY,
          type: "Highcharts",
          columnAssignment: {
            Name: "x",
            Cost: "value",
          },
          chartOptions: {
            xAxis: {
              type: "category",
              accessibility: {
                description: "Rockets",
              },
            },
            yAxis: {
              title: {
                text: "USD",
              },
            },
          },
        },
      ]);
    }
  }, [data]);

  const setToggle = () => {
    if (boardRef.current) {
      const isEditMode = boardRef.current.editMode?.isActive();

      if (isEditMode) {
        boardRef.current.editMode?.deactivate();
        const boardOption = boardRef.current?.getOptions();
        localStorage.setItem(
          HIGH_CHART_LAYOUT_KEY,
          JSON.stringify(boardOption)
        );
        boardRef.current.exportLocal();
      } else {
        boardRef.current.editMode?.activate();
      }
    }
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={setToggle}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Toggle Edit
        </button>
      </div>
      <div id="container" />
    </>
  );
};

export default HighChartDashboard;
