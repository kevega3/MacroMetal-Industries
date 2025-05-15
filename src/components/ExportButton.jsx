import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";

const ExportButton = ({ data, fileName = "analisis-produccion.xlsx" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    try {
      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();

      // Format data for Excel
      const formattedData = data.map((point) => ({
        "Producción (Toneladas)": point.x,
        "Costo Total": point.costY,
        "Ingreso Total": point.revenueY,
        Utilidad: point.profitY,
        "Costo Marginal": point.costMarginal,
        "Ingreso Marginal": point.revenueMarginal,
      }));

      // Create worksheet from data
      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      // Add worksheets to workbook
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Análisis de Producción"
      );

      // Create file and trigger download
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error al exportar los datos. Por favor intente nuevamente.");
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<FileDownloadIcon />}
      onClick={handleExport}
      disabled={!data || data.length === 0}
      sx={{
        mb: 2,
        backgroundColor: "#8884d8",
        "&:hover": {
          backgroundColor: "#7773b7",
        },
        "&:disabled": {
          backgroundColor: "#e0e0e0",
        },
      }}
    >
      Exportar a Excel
    </Button>
  );
};

export default ExportButton;
