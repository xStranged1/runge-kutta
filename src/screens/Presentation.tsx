import { useState } from "react";
import { ChevronLeft, ChevronRight, Calculator } from "lucide-react";
import Latex from "react-latex-next";
import { Link } from "wouter";

const sections = [
  {
    title: "Introducción a EDO y PVI",
    content: (
      <div className="space-y-4">
        <p className="text-gray-800 max-w-3xl mx-auto">
          Una <strong>EDO (Ecuación Diferencial Ordinaria)</strong> relaciona una función con sus derivadas:
        </p>
        <Latex>{`\\( y' = f(x, y(x)) = \\frac{dy}{dx} \\)`}</Latex>
        <p className="text-gray-700 max-w-3xl mx-auto">
          <strong>EDO de 2do orden:</strong> existen, pero no se profundiza aquí.  
          <br />
          <strong>PVI (Problema de Valor Inicial):</strong> consiste en encontrar <Latex>{`y(x)`}</Latex> que pase por un punto inicial:
        </p>
        <Latex>{`\\( y(x_0) = y_0 \\)`}</Latex>
      </div>
    ),
  },
  {
    title: "Ordenada Genérica",
    content: (
      <div className="space-y-4">
        <p className="text-gray-800 max-w-3xl mx-auto">
          Para métodos numéricos como RK2, definimos la <strong>ordenada genérica</strong> <Latex>{`y_{n+1}`}</Latex>:
        </p>
        <div className="bg-white border border-indigo-200 p-4 rounded shadow-sm max-w-3xl mx-auto">
          <div className="font-mono text-sm space-y-2 text-gray-700">
            <div>k₁ = h · f(x<sub>n</sub>, y<sub>n</sub>)</div>
            <div>y<sub>n+1</sub> = y<sub>n</sub> + h · f(x<sub>n</sub> + h/2, y<sub>n</sub> + k₁/2)</div>
          </div>
        </div>
        <p className="text-gray-700 max-w-3xl mx-auto mt-2">
          Donde <Latex>{`k_1`}</Latex> es la pendiente inicial y se evalúa un punto intermedio para mejorar la aproximación.
        </p>
      </div>
    ),
  },
  {
    title: "Método Runge-Kutta 2do Orden",
    content: (
      <div className="space-y-4">
        <p className="text-gray-800 max-w-3xl mx-auto">
          RK2 aproxima soluciones de EDOs de primer orden con PVI.
        </p>
        <div className="bg-white border border-indigo-200 p-4 rounded shadow-sm max-w-3xl mx-auto">
          <h4 className="text-indigo-700 font-semibold mb-2">Condiciones Iniciales</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>Función <Latex>{`f(x, y)`}</Latex> continua.</li>
            <li>Valor inicial <Latex>{`y_0, x_0`}</Latex>.</li>
            <li>Tamaño de paso <Latex>{`h`}</Latex>.</li>
          </ul>
        </div>
        <p className="text-gray-700 max-w-3xl mx-auto">
          <strong>Objetivo:</strong> Mejorar la precisión usando pendiente inicial e intermedia.
        </p>
      </div>
    ),
  },
  {
    title: "Fórmulas RK2",
    content: (
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="bg-white border border-indigo-200 p-4 rounded shadow-sm">
          <Latex>{`\\( k_1 = h \\cdot f(x_n, y_n) \\)`}</Latex>
          <Latex>{`\\( y_{n+1} = y_n + h \\cdot f\\Big(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\Big) \\)`}</Latex>
        </div>
        <div className="text-gray-700 space-y-1">
          <p><Latex>{`y_n`}</Latex>: valor conocido en <Latex>{`x_n`}</Latex></p>
          <p><Latex>{`h`}</Latex>: tamaño del paso</p>
          <p><Latex>{`k_1`}</Latex>: pendiente inicial</p>
          <p><Latex>{`y_n + k_1/2`}</Latex>: estimación en punto intermedio</p>
          <p><Latex>{`f(x_n + h/2, y_n + k_1/2)`}</Latex>: pendiente corregida</p>
        </div>
      </div>
    ),
  },
  {
    title: "Pasos del Método",
    content: (
      <div className="space-y-4 max-w-3xl mx-auto text-gray-800">
        <ol className="list-decimal list-inside space-y-2">
          <li>Evaluar pendiente inicial <Latex>{`k_1`}</Latex></li>
          <li>Calcular pendiente corregida en punto intermedio</li>
          <li>Calcular <Latex>{`y_{n+1}`}</Latex> combinando pendientes</li>
        </ol>
        <p className="text-gray-700">Más preciso que Euler porque ajusta la pendiente usando información intermedia.</p>
      </div>
    ),
  },
  {
    title: "Funcionamiento paso a paso",
    content: (
      <div className="space-y-4 max-w-3xl mx-auto text-gray-800">
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Punto inicial <Latex>{`(x_n, y_n)`}</Latex></li>
          <li>Pendiente inicial <Latex>{`k_1`}</Latex> (línea roja)</li>
          <li>Punto intermedio <Latex>{`(x_n + h/2, y_n + k_1/2)`}</Latex></li>
          <li>Pendiente corregida (línea azul)</li>
          <li>Nuevo valor <Latex>{`y_{n+1}`}</Latex></li>
        </ul>
        <p className="text-gray-800">
          RK2 corrige la pendiente inicial usando el punto intermedio, logrando mayor precisión.
        </p>
      </div>
    ),
  },
];

export default function PresentacionRK2() {
  const [index, setIndex] = useState(0);
  const section = sections[index];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="w-12 h-12 text-indigo-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{section.title}</h1>
            </div>
          </div>
          <div className="text-gray-800">{section.content}</div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 disabled:opacity-40 hover:bg-gray-300"
          >
            <ChevronLeft className="inline w-5 h-5 mr-1" />
            Anterior
          </button>
          <button
            onClick={() => setIndex(i => Math.min(i + 1, sections.length - 1))}
            disabled={index === sections.length - 1}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-700"
          >
            Siguiente
            <ChevronRight className="inline w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
