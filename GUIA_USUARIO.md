# Guía de Usuario - MacroMetal Industries

## Análisis de Escenarios de Producción

Esta aplicación te permite explorar diferentes escenarios de producción utilizando funciones matemáticas simbólicas. Podrás analizar cómo el costo, el ingreso y la utilidad varían según los niveles de producción.

## Instrucciones de Uso

### 1. Ingreso de Fórmulas

- **Función de Costo Marginal**: Ingresa la fórmula matemática que representa el costo marginal.
  - Ejemplo: `2*x + 50` (donde x es la cantidad producida)
- **Función de Ingreso Marginal**: Ingresa la fórmula matemática que representa el ingreso marginal.
  - Ejemplo: `100*e^(-0.01*x)` (donde x es la cantidad producida)

### 2. Notación Matemática

- Usa `x` como la variable independiente (cantidad producida)
- Para multiplicación, usa el asterisco `*`
- Para la función exponencial, usa `e^()`
- Para potencias, usa `^`
- Ejemplos:
  - Función lineal: `2*x + 50`
  - Función cuadrática: `0.01*x^2 + 10`
  - Función exponencial: `100*e^(-0.01*x)`

### 3. Configuración de Análisis

- **Rango de Producción**: Ajusta el slider para seleccionar el intervalo de producción a analizar.
- **Costos Fijos**: Ingresa el valor de los costos fijos (constante de integración).

### 4. Interpretación de Resultados

- **Costo Total**: Muestra el costo total acumulado en el rango seleccionado.
- **Ingreso Total**: Muestra el ingreso total acumulado en el rango seleccionado.
- **Utilidad**: Diferencia entre el ingreso total y el costo total.
- **Punto Óptimo**: Indica el nivel de producción donde la utilidad marginal es cero.

### 5. Gráficos

Los gráficos muestran:

- Curva de costo total (rojo)
- Curva de ingreso total (verde)
- Curva de utilidad (azul)

### 6. Exportación de Datos

- Haz clic en el botón "Exportar a Excel" para descargar un archivo con los datos calculados.
- El archivo Excel incluirá columnas para:
  - Cantidad producida
  - Costo total
  - Ingreso total
  - Utilidad
  - Costo marginal
  - Ingreso marginal

## Ejemplos de Funciones

### Costo Marginal

- **Lineal**: `2*x + 50`
- **Creciente**: `0.01*x^2 + 10`
- **Exponencial**: `30*e^(0.005*x)`

### Ingreso Marginal

- **Lineal decreciente**: `200 - 0.1*x`
- **Exponencial decreciente**: `100*e^(-0.01*x)`
- **Logarítmica**: `1000/x + 10`

## Soporte Técnico

Para consultas sobre el uso de esta aplicación, contacta al departamento de Sistemas de MacroMetal Industries.

---

© 2025 MacroMetal Industries - Todos los derechos reservados
