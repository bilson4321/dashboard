import { createFileRoute } from "@tanstack/react-router";
import HighChartDashboard from "../components/board";
import useRocketData from "../hooks/useRocketData";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  const { data } = useRocketData();
  return (
    <>
      <HighChartDashboard data={data} />
    </>
  );
}
