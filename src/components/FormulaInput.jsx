import React, { useState, useEffect } from "react";
import { TextField, Paper, Typography, Box } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import * as math from "mathjs";

const FormulaInput = ({
  label,
  formula,
  setFormula,
  setAntiderivative,
  error,
  setError,
}) => {
  const [displayFormula, setDisplayFormula] = useState("");

  // Process formula for display in MathJax
  useEffect(() => {
    try {
      if (!formula) {
        setDisplayFormula("");
        return;
      }

      // First, check if the formula is valid by parsing it with mathjs
      math.parse(formula);

      // Format the formula for LaTeX display
      let latexFormula = formula;
      latexFormula = latexFormula.replace(/\*/g, " \\cdot ");
      latexFormula = latexFormula.replace(/e\^/g, "e^{");
      latexFormula = latexFormula.replace(/\^(-?[0-9.]+)/g, "^{$1}");

      // Add closing brackets where needed
      const openBrackets = (latexFormula.match(/e\^{/g) || []).length;
      const closeBrackets = (latexFormula.match(/}/g) || []).length;
      if (openBrackets > closeBrackets) {
        latexFormula = latexFormula + "}".repeat(openBrackets - closeBrackets);
      }

      setDisplayFormula(latexFormula);
      setError("");
      // Calculate antiderivative
      try {
        const node = math.parse(formula);
        const variableNodes = node.filter(
          (node) => node.isSymbolNode && node.name === "x"
        );

        if (variableNodes.length > 0) {
          // For demonstration purposes, we'll just set a placeholder
          // The actual calculation is done in App.jsx
          setAntiderivative(formula);
        } else {
          setAntiderivative(`${formula}*x`);
        }
      } catch (integralError) {
        console.error("Integration error:", integralError);
        setAntiderivative(null);
      }
    } catch (parseError) {
      setError(`Error: ${parseError.message}`);
      setDisplayFormula(formula);
      setAntiderivative(null);
    }
  }, [formula, setAntiderivative, setError]);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ej: 2*x + 50 o 100*e^(-0.01*x)"
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />
      {displayFormula && (
        <Box sx={{ p: 1, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <MathJax>{"\\(" + displayFormula + "\\)"}</MathJax>
        </Box>
      )}
    </Paper>
  );
};

export default FormulaInput;
