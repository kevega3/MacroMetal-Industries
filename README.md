# MacroMetal Industries - Análisis de Producción

Aplicación web para la exploración de escenarios de producción utilizando funciones matemáticas simbólicas.

## Características

- Ingreso de fórmulas de costo marginal e ingreso marginal
- Cálculo automático de antiderivadas (funciones de costo total e ingreso total)
- Visualización en tiempo real de fórmulas matemáticas usando MathJax
- Selección de intervalo de producción usando slider
- Cálculo de costos totales, ingresos totales y utilidad
- Determinación del punto óptimo de producción
- Gráficos interactivos de costo, ingreso y utilidad
- Exportación de datos a Excel

## Uso

1. Ingresa una función de costo marginal (ej: `2*x + 50`)
2. Ingresa una función de ingreso marginal (ej: `100*e^(-0.01*x)`)
3. Ajusta el rango de producción con el slider
4. Establece los costos fijos
5. Visualiza los resultados y gráficos
6. Exporta los datos si los necesitas

## Ejemplos de funciones

**Costo Marginal:**

- Lineal: `2*x + 50`
- Exponencial: `30*e^(0.005*x)`
- Cuadrática: `0.01*x^2 + 10`

**Ingreso Marginal:**

- Lineal decreciente: `200 - 0.1*x`
- Exponencial decreciente: `100*e^(-0.01*x)`
- Logarítmica: `1000/x + 10`

## Tecnologías utilizadas

- React.js
- Material UI (MUI)
- MathJax
- Math.js
- Chart.js
- SheetJS (xlsx)

---

Creado para MacroMetal Industries © 2025

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
