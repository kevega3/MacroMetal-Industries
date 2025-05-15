import React from "react";
import { Box, Slider, Typography, Paper } from "@mui/material";

const RangeSelector = ({ range, setRange, min = 0, max = 2000 }) => {
  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Rango de Producción (Toneladas)
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={range}
          onChange={handleChange}
          valueLabelDisplay="on"
          disableSwap
          min={min}
          max={max}
          sx={{
            "& .MuiSlider-thumb": {
              color: "#8884d8",
            },
            "& .MuiSlider-track": {
              color: "#8884d8",
            },
            "& .MuiSlider-rail": {
              color: "#d0cef0",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {range[0]} ton
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {range[1]} ton
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RangeSelector;
