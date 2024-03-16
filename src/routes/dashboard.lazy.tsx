import { createFileRoute } from "@tanstack/react-router";
import HighChartDashboard from "../components/board";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <HighChartDashboard />
    </>
  );
}
