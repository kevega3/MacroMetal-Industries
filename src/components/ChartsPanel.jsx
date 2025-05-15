import React from "react";
import { Paper, Typography, Box } from "@mui/material";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const ChartsPanel = ({
  costData,
  revenueData,
  profitData,
  range,
  optimumPoint,
}) => {
  if (!costData || !revenueData || !profitData) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Ingrese fórmulas válidas para visualizar los gráficos
        </Typography>
      </Paper>
    );
  }

  // Prepare data for Chart.js
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Análisis de Producción",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Valor ($)",
        },
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
              notation: "compact",
              compactDisplay: "short",
            }).format(value);
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Cantidad Producida (toneladas)",
        },
      },
    },
  };

  // Create labels for the chart based on the data range
  const labels = [];
  const step = Math.ceil((range[1] - range[0]) / 20); // Create about 20 points
  for (let i = range[0]; i <= range[1]; i += step) {
    labels.push(i);
  }
  if (labels[labels.length - 1] !== range[1]) {
    labels.push(range[1]);
  }

  // Get data points for the chart
  const costPoints = labels.map((x) => {
    const idx = costData.findIndex((point) => point.x >= x);
    if (idx === -1) return costData[costData.length - 1]?.y || 0;
    if (idx === 0) return costData[0]?.y || 0;

    // Linear interpolation
    const x1 = costData[idx - 1].x;
    const y1 = costData[idx - 1].y;
    const x2 = costData[idx].x;
    const y2 = costData[idx].y;

    return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  });

  const revenuePoints = labels.map((x) => {
    const idx = revenueData.findIndex((point) => point.x >= x);
    if (idx === -1) return revenueData[revenueData.length - 1]?.y || 0;
    if (idx === 0) return revenueData[0]?.y || 0;

    // Linear interpolation
    const x1 = revenueData[idx - 1].x;
    const y1 = revenueData[idx - 1].y;
    const x2 = revenueData[idx].x;
    const y2 = revenueData[idx].y;

    return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  });

  const profitPoints = labels.map((x) => {
    const idx = profitData.findIndex((point) => point.x >= x);
    if (idx === -1) return profitData[profitData.length - 1]?.y || 0;
    if (idx === 0) return profitData[0]?.y || 0;

    // Linear interpolation
    const x1 = profitData[idx - 1].x;
    const y1 = profitData[idx - 1].y;
    const x2 = profitData[idx].x;
    const y2 = profitData[idx].y;

    return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Costo Total",
        data: costPoints,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Ingreso Total",
        data: revenuePoints,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Utilidad",
        data: profitPoints,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  // Add annotation for optimum point if available
  if (
    optimumPoint &&
    optimumPoint.x >= range[0] &&
    optimumPoint.x <= range[1]
  ) {
    const annotation = {
      type: "point",
      xValue: optimumPoint.x,
      yValue: optimumPoint.y,
      backgroundColor: "rgba(255, 99, 132, 1)",
      borderColor: "red",
      borderWidth: 2,
      radius: 5,
      label: {
        content: [
          "Punto Óptimo",
          `(${optimumPoint.x.toFixed(2)}, ${optimumPoint.y.toFixed(2)})`,
        ],
        enabled: true,
        position: "top",
      },
    };

    chartOptions.plugins.annotation = {
      annotations: {
        optimumAnnotation: annotation,
      },
    };
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Gráficos de Análisis
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <Line options={chartOptions} data={chartData} />
      </Box>
    </Paper>
  );
};

export default ChartsPanel;
