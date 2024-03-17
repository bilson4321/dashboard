import ComponentType from "@highcharts/dashboards/es-modules/Dashboards/Components/ComponentType";

export const getDataGridConfig = (cell: string, connector: string) => {
  const config: Partial<ComponentType["options"]> = {
    connector: {
      id: connector,
    },
    cell: cell,
    type: "DataGrid",
    dataGridOptions: {
      editable: false,
    },
    sync: {
      visibility: true,
      highlight: true,
      extremes: true,
    },
  };

  return config;
};
