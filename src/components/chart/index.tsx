import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options: Highcharts.Options = {
  title: {
    text: "My chart",
  },
  series: [
    {
      type: "line",
      data: [1, 2, 3],
    },
  ],
};

const Chart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
