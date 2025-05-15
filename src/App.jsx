import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
} from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";
import * as math from "mathjs";

// Import components
import FormulaInput from "./components/FormulaInput";
import RangeSelector from "./components/RangeSelector";
import ConstantsPanel from "./components/ConstantsPanel";
import ChartsPanel from "./components/ChartsPanel";
import ExportButton from "./components/ExportButton";
import MacroMetalLogo from "./components/MacroMetalLogo";

// MathJax configuration
const mathJaxConfig = {
  loader: {
    load: ["input/asciimath", "output/chtml", "[tex]/require", "[tex]/ams"],
  },
  tex: {
    packages: { "[+]": ["require", "ams"] },
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
};

function App() {
  // State for user inputs
  const [marginalCostFormula, setMarginalCostFormula] = useState("2*x + 50");
  const [marginalRevenueFormula, setMarginalRevenueFormula] =
    useState("100*e^(-0.01*x)");
  const [costFormula, setCostFormula] = useState("");
  const [revenueFormula, setRevenueFormula] = useState("");
  const [range, setRange] = useState([100, 1000]);
  const [fixedCosts, setFixedCosts] = useState(5000);

  // State for errors
  const [costError, setCostError] = useState("");
  const [revenueError, setRevenueError] = useState("");

  // State for calculated data
  const [costData, setCostData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [profitData, setProfitData] = useState(null);
  const [exportData, setExportData] = useState([]);
  const [costTotal, setCostTotal] = useState(null);
  const [revenueTotal, setRevenueTotal] = useState(null);
  const [profit, setProfit] = useState(null);
  const [optimumPoint, setOptimumPoint] = useState(null);

  // Find the optimal production point where marginal profit is zero
  const findOptimumPoint = useCallback(() => {
    try {
      if (!costFormula || !revenueFormula) return;

      // Create the marginal profit function (MR - MC)
      const marginalProfitFormula = `(${marginalRevenueFormula}) - (${marginalCostFormula})`;

      // Use a numerical approach to find where marginal profit is zero
      let left = range[0];
      let right = range[1];
      const epsilon = 0.001;

      // Binary search to find the root
      while (right - left > epsilon) {
        const mid = (left + right) / 2;
        const marginalProfit = math.evaluate(marginalProfitFormula, { x: mid });

        if (Math.abs(marginalProfit) < epsilon) {
          // Found the optimum point
          const optX = mid;
          const optCost = math.evaluate(costFormula, { x: optX, fixedCosts });
          const optRevenue = math.evaluate(revenueFormula, { x: optX });
          const optProfit = optRevenue - optCost;

          setOptimumPoint({
            x: optX,
            y: optProfit,
            costY: optCost,
            revenueY: optRevenue,
          });
          return;
        }

        // Check values at left and mid
        const leftValue = math.evaluate(marginalProfitFormula, { x: left });
        if (leftValue * marginalProfit < 0) {
          right = mid;
        } else {
          left = mid;
        }
      }

      // If we exit the loop, use the midpoint
      const optX = (left + right) / 2;
      const optCost = math.evaluate(costFormula, { x: optX, fixedCosts });
      const optRevenue = math.evaluate(revenueFormula, { x: optX });
      const optProfit = optRevenue - optCost;

      setOptimumPoint({
        x: optX,
        y: optProfit,
        costY: optCost,
        revenueY: optRevenue,
      });
    } catch (error) {
      console.error("Optimum point calculation error:", error);
      setOptimumPoint(null);
    }
  }, [
    costFormula,
    revenueFormula,
    marginalCostFormula,
    marginalRevenueFormula,
    range,
    fixedCosts,
  ]);

  // Calculate data points for the charts and export
  const calculateDataPoints = useCallback(() => {
    if (!costFormula || !revenueFormula) {
      setCostData(null);
      setRevenueData(null);
      setProfitData(null);
      setExportData([]);
      setCostTotal(null);
      setRevenueTotal(null);
      setProfit(null);
      setOptimumPoint(null);
      return;
    }

    try {
      const costPoints = [];
      const revenuePoints = [];
      const profitPoints = [];
      const exportPoints = [];

      // Create a scope with the fixed cost value
      const scope = {
        fixedCosts: fixedCosts,
      };

      // Number of points to calculate
      const numPoints = 100;
      const step = (range[1] - range[0]) / numPoints;

      // Calculate points
      for (let i = 0; i <= numPoints; i++) {
        const x = range[0] + i * step;
        scope.x = x;

        // Evaluate cost function at point x
        const costY = math.evaluate(costFormula, scope);
        costPoints.push({ x, y: costY });

        // Evaluate revenue function at point x
        const revenueY = math.evaluate(revenueFormula, scope);
        revenuePoints.push({ x, y: revenueY });

        // Calculate profit
        const profitY = revenueY - costY;
        profitPoints.push({ x, y: profitY });

        // Prepare export data
        const costMarginal = math.evaluate(marginalCostFormula, scope);
        const revenueMarginal = math.evaluate(marginalRevenueFormula, scope);

        exportPoints.push({
          x,
          costY,
          revenueY,
          profitY,
          costMarginal,
          revenueMarginal,
        });
      }

      // Set data for charts and export
      setCostData(costPoints);
      setRevenueData(revenuePoints);
      setProfitData(profitPoints);
      setExportData(exportPoints);

      // Calculate total values for the selected range
      const startIndex = 0;
      const endIndex = costPoints.length - 1;

      setCostTotal(costPoints[endIndex].y - costPoints[startIndex].y);
      setRevenueTotal(revenuePoints[endIndex].y - revenuePoints[startIndex].y);
      setProfit(revenuePoints[endIndex].y - costPoints[endIndex].y);

      // Find optimal production point (where marginal revenue = marginal cost)
      findOptimumPoint();
    } catch (error) {
      console.error("Calculation error:", error);
      setCostData(null);
      setRevenueData(null);
      setProfitData(null);
      setExportData([]);
    }
  }, [
    costFormula,
    revenueFormula,
    marginalCostFormula,
    marginalRevenueFormula,
    range,
    fixedCosts,
    findOptimumPoint,
  ]);

  // Calculate the antiderivatives of the marginal cost and revenue functions
  const calculateAntiderivatives = useCallback(() => {
    try {
      // Validate formulas first
      if (!marginalCostFormula || !marginalRevenueFormula) {
        return;
      }

      // Try to parse formulas with mathjs
      math.parse(marginalCostFormula);
      math.parse(marginalRevenueFormula);

      // Calculate antiderivative (integral) of marginal cost function
      try {
        // For simplicity, we'll use a workaround since mathjs doesn't directly support symbolic integration
        // This is simplified and works for basic polynomial functions
        let costIntegral;

        // Handle basic forms manually
        if (marginalCostFormula.includes("x^2")) {
          costIntegral = marginalCostFormula.replace("x^2", "x^3/3");
        } else if (marginalCostFormula.includes("x")) {
          costIntegral = marginalCostFormula.replace(
            /(\d*)[*]?x/g,
            function (match, p1) {
              const coeff = p1 === "" ? 1 : p1 === "*" ? 1 : Number(p1);
              return `${coeff / 2}*x^2`;
            }
          );
        } else {
          costIntegral = `${marginalCostFormula}*x`;
        }

        // For exponential forms like e^(-0.01*x)
        if (marginalCostFormula.includes("e^(")) {
          const match = marginalCostFormula.match(
            /(\d*)\*?e\^\((-?\d*\.?\d*)\*x\)/
          );
          if (match) {
            const coeff = match[1] === "" ? 1 : Number(match[1]);
            const expCoeff = Number(match[2]);
            costIntegral = `${coeff / expCoeff}*e^(${expCoeff}*x)`;
          }
        }

        setCostFormula(`${costIntegral} + ${fixedCosts}`);
      } catch (error) {
        console.error("Cost integration error:", error);
        setCostError(
          "Error al calcular la antiderivada. Verifique la fórmula."
        );
        setCostFormula(null);
      }

      // Calculate antiderivative (integral) of marginal revenue function
      try {
        // Same simplified approach for revenue
        let revenueIntegral;

        // Handle basic forms manually
        if (marginalRevenueFormula.includes("x^2")) {
          revenueIntegral = marginalRevenueFormula.replace("x^2", "x^3/3");
        } else if (marginalRevenueFormula.includes("x")) {
          revenueIntegral = marginalRevenueFormula.replace(
            /(\d*)[*]?x/g,
            function (match, p1) {
              const coeff = p1 === "" ? 1 : p1 === "*" ? 1 : Number(p1);
              return `${coeff / 2}*x^2`;
            }
          );
        } else {
          revenueIntegral = `${marginalRevenueFormula}*x`;
        }

        // For exponential forms like e^(-0.01*x)
        if (marginalRevenueFormula.includes("e^(")) {
          const match = marginalRevenueFormula.match(
            /(\d*)\*?e\^\((-?\d*\.?\d*)\*x\)/
          );
          if (match) {
            const coeff = match[1] === "" ? 1 : Number(match[1]);
            const expCoeff = Number(match[2]);
            revenueIntegral = `${coeff / expCoeff}*e^(${expCoeff}*x)`;
          }
        }

        setRevenueFormula(revenueIntegral);
      } catch (error) {
        console.error("Revenue integration error:", error);
        setRevenueError(
          "Error al calcular la antiderivada. Verifique la fórmula."
        );
        setRevenueFormula(null);
      }
    } catch (error) {
      console.error("Formula validation error:", error);
    }
  }, [marginalCostFormula, marginalRevenueFormula, fixedCosts]);

  // Calculate total cost and revenue functions (antiderivatives)
  useEffect(() => {
    calculateAntiderivatives();
  }, [calculateAntiderivatives]);

  // Calculate data points based on range and formulas
  useEffect(() => {
    calculateDataPoints();
  }, [calculateDataPoints]);

  return (
    <MathJaxContext config={mathJaxConfig}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: "#8884d8" }}>
        <Toolbar>
          <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
            <MacroMetalLogo />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MacroMetal Industries - Análisis de Producción
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "#f5f8fa", minHeight: "100vh", py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, color: "#424242" }}>
            Análisis de Escenarios de Producción
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormulaInput
                label="Función de Costo Marginal"
                formula={marginalCostFormula}
                setFormula={setMarginalCostFormula}
                setAntiderivative={setCostFormula}
                error={costError}
                setError={setCostError}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormulaInput
                label="Función de Ingreso Marginal"
                formula={marginalRevenueFormula}
                setFormula={setMarginalRevenueFormula}
                setAntiderivative={setRevenueFormula}
                error={revenueError}
                setError={setRevenueError}
              />
            </Grid>

            <Grid item xs={12}>
              <RangeSelector range={range} setRange={setRange} />
            </Grid>

            <Grid item xs={12}>
              <ConstantsPanel
                fixedCosts={fixedCosts}
                setFixedCosts={setFixedCosts}
                error={costError || revenueError}
                costTotal={costTotal}
                revenueTotal={revenueTotal}
                profit={profit}
                optimumPoint={optimumPoint}
              />
            </Grid>

            <Grid item xs={12}>
              <ChartsPanel
                costData={costData}
                revenueData={revenueData}
                profitData={profitData}
                range={range}
                optimumPoint={optimumPoint}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ExportButton data={exportData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MathJaxContext>
  );
}

export default App;
