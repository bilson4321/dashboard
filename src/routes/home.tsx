import { createFileRoute, redirect } from "@tanstack/react-router";
import { DataPoolConnectorOptions } from "@highcharts/dashboards/es-modules/Data/DataPoolOptions";

import Spinner from "../components/spinner";
import useRocketData from "../hooks/useRocketData";
import useDragonData from "../hooks/useDragonData";
import HighChartDashboard from "../components/board";

export const Route = createFileRoute("/home")({
  component: Home,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Home() {
  const { data, isLoading: isRocketDataLoading } = useRocketData();
  const { data: dragonData, isLoading: isDragonDataLoading } = useDragonData();

  const dataPoolConnectorOptions: DataPoolConnectorOptions[] = [
    {
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
    },
    {
      id: "dragon-data",
      type: "JSON",
      options: {
        firstRowAsNames: false,
        columnNames: [
          "Name",
          "Crew Capacity",
          "Dry Mass",
          "Orbit Duration",
          "First Flight",
        ],
        data: dragonData?.dragons?.map((dragon) => [
          dragon?.name ?? "",
          dragon?.crew_capacity ?? 0,
          dragon?.dry_mass_kg ?? 0,
          dragon?.orbit_duration_yr ?? 0,
          dragon?.first_flight ?? "",
        ]),
      },
    },
  ];

  if (isRocketDataLoading || isDragonDataLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }
  return <HighChartDashboard dataPoolOptions={dataPoolConnectorOptions} />;
}
