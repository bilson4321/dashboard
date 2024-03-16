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

LayoutModule(Dashboards);

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const HighChartDashboard = () => {
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
      <button onClick={() => setToggle()}>Toggle Edit Mode</button>
      <div id="container" />
    </>
  );
};

export default HighChartDashboard;
