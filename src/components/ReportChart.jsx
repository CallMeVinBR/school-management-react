import { React, useMemo } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const degreeColors = {
  "Ensino Fundamental": "#800000",
  "1° ano do ensino médio": "#228B22",
  "2° ano ensino médio": "#FF8C00",
  "3° ano do ensino médio": "#4169E1",
  Cursinho: "#FFD700",
  "4º ano do ensino fundamental": "#8B008B",
  "5º ano do ensino fundamental": "#FF69B4",
  "6º ano do ensino fundamental": "#00CED1",
  "7º ano do ensino fundamental": "#708090",
  "8º ano do ensino fundamental": "#4B0082",
  "9º ano do ensino fundamental": "#008080",
  "Estudo em casa": "#FF4500",
  Outros: "#A9A9A9",
};

export default function ReportChart({ target, entities }) {
  const chartData = useMemo(() => {
    const labels = ["A", "B", "C", "D", "E", "F"];

    const degreeNames = Object.keys(degreeColors);

    const datasets = degreeNames.map((degreeName) => {
      const dataPerClass = labels.map((className) => {
        if (target === "students") {
          return entities.filter(
            (s) => s.degreeName == degreeName && s.className == className,
          ).length;
        } else {
          return entities.reduce((accumulator, teacher) => {
            const hasMatch = teacher.relationship?.some((relationship) =>
              relationship.degrees.some(
                (degree) =>
                  degree.degreeName === degreeName &&
                  degree.classes.some((c) => c.className === className),
              ),
            );

            return hasMatch ? accumulator + 1 : accumulator;
          }, 0);
        }
      });

      return {
        label: degreeName,
        data: dataPerClass,
        backgroundColor: degreeColors[degreeName],
        stack: "Stack 0",
      };
    });

    const filteredMatchDatasets = datasets.filter((d) =>
      d.data.some((count) => count > 0),
    );

    return { labels, datasets: filteredMatchDatasets };
  }, [target, entities]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 20, 
          boxWidth: 15, 
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `Gráfico de ${target === "students" ? "Alunos" : "Professores"}`,
      },
    },
  };

  return (
    <div className="w-full h-[50dvh] p-4 bg-white rounded-lg shadow-md border border-neutral-200">
      <Bar options={options} data={chartData} />
    </div>
  );
}
