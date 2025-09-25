import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrazione dei componenti Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart = ({ data }) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Andamento crypto utlimi 7 giorni",
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 7, // massimo 7 date mostrate
                }
            }
        }
    };

    return <Line data={data} options={options} />
};

export default LineChart;