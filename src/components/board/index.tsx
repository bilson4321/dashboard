import { useEffect, useRef, useState } from "react";
import "./style.css";

import Highcharts from "highcharts";
import Dashboards, { Board } from "@highcharts/dashboards";
import DataGrid from "@highcharts/dashboards/datagrid";
import LayoutModule from "@highcharts/dashboards/modules/layout";
import {
  HIGH_CHART_LAYOUT_KEY,
  dashboardConfig,
} from "../../constants/dashboard";
import { DataPoolConnectorOptions } from "@highcharts/dashboards/es-modules/Data/DataPoolOptions";
import { ToggleSwitch } from "flowbite-react";
import { getDataGridConfig } from "../../constants/highchart";

LayoutModule(Dashboards);

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

interface HighChartDashboardProps {
  dataPoolOptions: DataPoolConnectorOptions[];
}
const HighChartDashboard = (props: HighChartDashboardProps) => {
  const { dataPoolOptions } = props;
  const boardRef = useRef<Board | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const boardOption = localStorage.getItem(HIGH_CHART_LAYOUT_KEY);
    const board = Dashboards.board(
      "container",
      boardOption ? JSON.parse(boardOption) : dashboardConfig
    );
    boardRef.current = board;
  }, []);

  useEffect(() => {
    if (boardRef.current && dataPoolOptions) {
      dataPoolOptions.forEach((dataPoolOption) => {
        boardRef.current?.dataPool.setConnectorOptions(dataPoolOption);
      });
    }
  }, [dataPoolOptions]);

  useEffect(() => {
    const boardComponents = boardRef.current?.mountedComponents ?? [];
    const dataPoolConnectors =
      boardRef.current?.dataPool.getConnectorIds() ?? [];
    if (boardComponents.length === 0 && dataPoolConnectors.length > 0) {
      boardRef.current?.setComponents([
        {
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          connector: {
            id: "rocket-data",
          },
          cell: HIGH_CHART_LAYOUT_KEY + 0 + 0,
          type: "Highcharts",
          columnAssignment: {
            Name: "x",
            Cost: "value",
          },
          chartOptions: {
            title: {
              text: "Rocket Cost",
            },
            subtitle: {
              text: "Rocket cost per launch with payload weight",
            },
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
        getDataGridConfig(HIGH_CHART_LAYOUT_KEY + 0 + 1, "rocket-data"),
        getDataGridConfig(HIGH_CHART_LAYOUT_KEY + 1 + 0, "dragon-data"),
      ]);
    }
  }, []);

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
        setIsEditMode(false);
      } else {
        boardRef.current.editMode?.activate();
        setIsEditMode(true);
      }
    }
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <ToggleSwitch
          checked={isEditMode}
          id="toggle"
          label="Edit Mode"
          onChange={setToggle}
        />
      </div>
      <div id="container" />
    </>
  );
};

export default HighChartDashboard;
