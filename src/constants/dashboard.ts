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
        rows: [
          {
            id: HIGH_CHART_LAYOUT_KEY + 0,
            cells: [
              {
                id: HIGH_CHART_LAYOUT_KEY + 0 + 0,
              },
              {
                id: HIGH_CHART_LAYOUT_KEY + 0 + 1,
              },
            ],
          },
          {
            id: HIGH_CHART_LAYOUT_KEY + 1,
            cells: [
              {
                id: HIGH_CHART_LAYOUT_KEY + 1 + 0,
              },
            ],
          },
        ],
      },
    ],
  },
  components: [],
};
