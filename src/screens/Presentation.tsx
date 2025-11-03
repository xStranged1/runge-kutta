import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Latex from "react-latex-next";
import { Link } from "wouter";

const sections = [
  {
    title: "Introducción a EDO y PVI",
    content: (
      <>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          Una <strong>EDO (Ecuación Diferencial Ordinaria)</strong> relaciona
          una función con sus derivadas:
        </p>
        <Latex>{`\\( y' = f(x, y(x)) = \\frac{dy}{dx} \\)`}</Latex>
        <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
          <strong>EDO de 2do orden:</strong> existen, pero no se profundiza aquí.  
          <br />
          <strong>PVI (Problema de Valor Inicial):</strong> consiste en encontrar
          <Latex>{`y(x)`}</Latex> que pase por un punto inicial conocido:
        </p>
        <Latex>{`\\( y(x_0) = y_0 \\)`}</Latex>
      </>
    ),
  },
  {
    title: "Ordenada Genérica",
    content: (
      <>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          Para métodos numéricos como RK2, definimos la <strong>ordenada genérica</strong> 
          <Latex>{`y_{n+1}`}</Latex> como aproximación del siguiente valor:
        </p>
        <Latex>{`\\( k_1 = h \\cdot f(x_n, y_n) \\)`}</Latex>
        <Latex>{`\\( y_{n+1} = y_n + h \\cdot f\\Big(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\Big) \\)`}</Latex>
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
          Donde <Latex>{`k_1`}</Latex> es la pendiente inicial y se usa un punto intermedio para mejorar la aproximación.
        </p>
      </>
    ),
  },
  {
    title: "Método Runge-Kutta de 2do Orden",
    content: (
      <>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          RK2 es un método numérico para aproximar soluciones de EDOs de primer orden con PVI.
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          <strong>Condiciones iniciales:</strong>
          <ul className="list-disc list-inside">
            <li>Función <Latex>{`f(x, y)`}</Latex> continua.</li>
            <li>Valor inicial <Latex>{`y_0, x_0`}</Latex>.</li>
            <li>Tamaño de paso <Latex>{`h`}</Latex>.</li>
          </ul>
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto">
          <strong>Objetivo:</strong> Mejorar la precisión sobre el método de Euler usando pendiente inicial e intermedia.
        </p>
      </>
    ),
  },
  {
    title: "Fórmulas y Términos RK2",
    content: (
      <>
        <Latex>{`\\( k_1 = h \\cdot f(x_n, y_n) \\)`}</Latex>
        <Latex>{`\\( y_{n+1} = y_n + h \\cdot f\\Big(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\Big) \\)`}</Latex>
        <p className="text-gray-400 max-w-3xl mx-auto mt-2">
          Explicación de términos:
          <ul className="list-disc list-inside">
            <li><Latex>{`y_n`}</Latex>: valor conocido en <Latex>{`x_n`}</Latex></li>
            <li><Latex>{`h`}</Latex>: tamaño de paso</li>
            <li><Latex>{`k_1`}</Latex>: pendiente inicial</li>
            <li><Latex>{`y_n + k_1/2`}</Latex>: estimación en punto intermedio</li>
            <li><Latex>{`f(x_n + h/2, y_n + k_1/2)`}</Latex>: pendiente corregida</li>
          </ul>
        </p>
      </>
    ),
  },
  {
    title: "Pasos del Método RK2",
    content: (
      <>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          <strong>Paso 1:</strong> Evaluar pendiente inicial <Latex>{`k_1`}</Latex>
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          <strong>Paso 2:</strong> Calcular pendiente corregida en el punto intermedio
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          <strong>Paso 3:</strong> Calcular <Latex>{`y_{n+1}`}</Latex> combinando pendiente inicial y corregida
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Método más preciso que Euler, porque ajusta la pendiente usando información intermedia.
        </p>
      </>
    ),
  },
  {
    title: "RK2 aplicado a EDOs",
    content: (
      <>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          RK2 se aplica a EDOs de la forma <Latex>{`y' = f(x, y)`}</Latex> y se puede iterar
          múltiples pasos para aproximar <Latex>{`y(x)`}</Latex> en un intervalo.
        </p>
      </>
    ),
  },
  {
    title: "Funcionamiento paso a paso",
    content: (
      <>
        <p className="text-gray-300 max-w-3xl mx-auto mb-4">
          Visualización del método:
        </p>
        <ul className="text-gray-400 list-disc list-inside max-w-3xl mx-auto">
          <li>Punto inicial (<Latex>{`x_n, y_n`}</Latex>)</li>
          <li>Pendiente inicial <Latex>{`k_1`}</Latex> (línea roja)</li>
          <li>Punto intermedio (<Latex>{`x_n + h/2, y_n + k_1/2`}</Latex>)</li>
          <li>Pendiente corregida (línea azul)</li>
          <li>Nuevo valor <Latex>{`y_{n+1}`}</Latex></li>
        </ul>
        <p className="text-gray-300 max-w-3xl mx-auto mt-2">
          RK2 “corrige” la pendiente inicial usando el punto intermedio, logrando mayor precisión sin derivadas de orden superior.
        </p>
      </>
    ),
  },
];

export default function Presentations() {
  const [index, setIndex] = useState(0);
  const section = sections[index];

  return (
    <section className="flex flex-col items-center justify-center text-center h-screen p-10 transition-all duration-700">
      <h2 className="text-4xl font-semibold mb-6">{section.title}</h2>
      <div className="text-lg">{section.content}</div>

      <div className="flex justify-between w-full max-w-3xl mt-10">
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="px-6 py-3 rounded-xl bg-gray-800 text-white disabled:opacity-30 hover:bg-gray-700"
        >
          <ChevronLeft className="inline w-5 h-5 mr-1" />
          Anterior
        </button>

        <button
          onClick={() => setIndex((i) => Math.min(i + 1, sections.length - 1))}
          disabled={index === sections.length - 1}
          className="px-6 py-3 rounded-xl bg-green-600 text-white disabled:opacity-30 hover:bg-green-500"
        >
          Siguiente
          <ChevronRight className="inline w-5 h-5 ml-1" />
        </button>
      </div>
    </section>
  );
}
