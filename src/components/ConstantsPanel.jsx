import React from "react";
import { TextField, Paper, Typography, Grid } from "@mui/material";
import { MathJax } from "better-react-mathjax";

const ConstantsPanel = ({
  fixedCosts,
  setFixedCosts,
  error,
  costTotal,
  revenueTotal,
  profit,
  optimumPoint,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Constantes y Resultados
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Costos Fijos"
            type="number"
            variant="outlined"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value) || 0)}
            helperText="Constante de integración para costos"
            error={!!error}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Resultados del Intervalo Seleccionado:
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 1, backgroundColor: "#f8f9fa" }}>
                <Typography variant="subtitle2">Costo Total:</Typography>
                <Typography variant="body1">
                  {costTotal !== null
                    ? `$${costTotal.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "Calculando..."}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 1, backgroundColor: "#f8f9fa" }}>
                <Typography variant="subtitle2">Ingreso Total:</Typography>
                <Typography variant="body1">
                  {revenueTotal !== null
                    ? `$${revenueTotal.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "Calculando..."}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 1, backgroundColor: "#f8f9fa" }}>
                <Typography variant="subtitle2">Utilidad:</Typography>
                <Typography
                  variant="body1"
                  sx={{ color: profit >= 0 ? "success.main" : "error.main" }}
                >
                  {profit !== null
                    ? `$${profit.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "Calculando..."}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {optimumPoint && (
          <Grid item xs={12}>
            <Paper sx={{ p: 1, mt: 1, backgroundColor: "#e3f2fd" }}>
              <Typography variant="subtitle2">
                Punto Óptimo de Producción:
              </Typography>
              <MathJax>
                {`\\(x = ${optimumPoint.x.toFixed(2)}\\) toneladas`}
              </MathJax>
              <Typography variant="body2">
                En este punto, la utilidad marginal es cero (máxima utilidad).
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ConstantsPanel;
