import { Doughnut } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({
  name_1,
  name_2,
  name_3,
  title,
  title_2,
  title_3,
  day,
  month,
  sales,
  bg_1,
  bg_2,
  bg_3,
}) => {
  const options = {
    responsive:true,
    plugins: {
      legend: {
        display: true,
        position: "top", 
        labels: {
          font: {
            size: 14, 
          },
        },
      },
    },
  };
  const data = {
    labels: [name_1, name_2, name_3],
    datasets: [
      {
        label: title,
        data: [day, month, sales],
        backgroundColor: [`${bg_1}`, `${bg_2}`, `${bg_3}`],
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default Chart;
