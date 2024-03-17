import type { Board } from "@highcharts/dashboards";

export const HIGH_CHART_LAYOUT_KEY = "highcharts-dashboard-layout";

export const dashboardConfig: Board.Options = {
  dataPool: {
    connectors: [],
  },
  editMode: {
    enabled: true,
  },
  gui: {
    layouts: [
      {
        id: HIGH_CHART_LAYOUT_KEY,
      },
    ],
  },
  components: [],
};
