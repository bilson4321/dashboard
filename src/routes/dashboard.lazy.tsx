import { createFileRoute } from "@tanstack/react-router";
import HighChartDashboard from "../components/board";
import useRocketData from "../hooks/useRocketData";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data } = useRocketData();
  return (
    <>
      <HighChartDashboard data={data} />
    </>
  );
}
