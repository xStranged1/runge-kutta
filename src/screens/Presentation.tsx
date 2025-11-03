import { useState } from "react";
import { ChevronLeft, ChevronRight, Calculator } from "lucide-react";
import Latex from "react-latex-next";
import { Link, useLocation } from "wouter";

const sections = [
  // Filmina 1: Introducción a EDO y PVI
  {
    title: "Introducción a EDO y PVI",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg font-semibold">
          Una <span className="text-indigo-700 font-bold">EDO (Ecuación Diferencial Ordinaria)</span> 
          relaciona una función con sus derivadas. Permite describir fenómenos donde el cambio de una variable depende de otra.
        </p>
        <div className="text-2xl my-4">
          <Latex>{`\\( y' = f(x, y(x)) = \\frac{dy}{dx} \\)`}</Latex>
        </div>
        <p className="text-lg font-semibold">
          <span className="text-indigo-700 font-bold">EDO de 2do orden:</span> existen, pero no se profundiza aquí. <br />
          <span className="text-indigo-700 font-bold">PVI (Problema de Valor Inicial):</span> consiste en encontrar 
          <Latex>{` y(x)`}</Latex> que pase por un punto inicial:
        </p>
        <div className="text-2xl my-4">
          <Latex>{`\\( y(x_0) = y_0 \\)`}</Latex>
        </div>
        <p className="text-lg">
          Ejemplo simple: si <Latex>{`y' = x + y`}</Latex> y <Latex>{`y(0) = 1`}</Latex>, queremos encontrar 
          <Latex>{`y(x)`}</Latex> para valores próximos de <Latex>{`x`}</Latex>.
        </p>
      </div>
    ),
  },
  // Filmina 2: Condiciones iniciales
  {
    title: "Condiciones Iniciales para RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg font-semibold">
          Antes de aplicar RK2, necesitamos cumplir ciertas condiciones:
        </p>
        <div className="bg-white border-l-4 border-indigo-600 p-6 rounded shadow-sm space-y-3">
          <ul className="list-disc list-inside text-gray-700 text-lg font-medium">
            <li>La función <Latex>{`f(x, y)`}</Latex> debe ser continua en el intervalo.</li>
            <li>Debemos conocer el valor inicial <Latex>{`y_0`}</Latex> en <Latex>{`x_0`}</Latex>.</li>
            <li>Elegir un tamaño de paso <Latex>{`h`}</Latex> adecuado para la aproximación.</li>
          </ul>
        </div>
        <p className="text-lg font-semibold">
          Estas condiciones aseguran que la aproximación numérica sea confiable.
        </p>
      </div>
    ),
  },
  // Filmina 3: Ordenada Genérica
  {
    title: "Ordenada Genérica",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg font-semibold">
          Para métodos numéricos como RK2, definimos la <span className="text-indigo-700 font-bold">ordenada genérica</span> 
          <Latex>{`y_{n+1}`}</Latex>:
        </p>
        <div className="bg-white border-l-4 border-indigo-400 p-6 rounded shadow-sm space-y-3">
          <div className="font-mono text-xl text-gray-700">
            <div>k₁ = h · f(x<sub>n</sub>, y<sub>n</sub>)</div>
            <div>y<sub>n+1</sub> = y<sub>n</sub> + h · f(x<sub>n</sub> + h/2, y<sub>n</sub> + k₁/2)</div>
          </div>
        </div>
        <p className="text-lg mt-2">
          <Latex>{`k_1`}</Latex> es la pendiente inicial y se evalúa un punto intermedio para mejorar la aproximación.
        </p>
      </div>
    ),
  },
  // Filmina 4: Comparación Euler vs RK2
  {
    title: "Comparación: Euler vs RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg font-semibold">
          Observemos la diferencia entre <span className="text-red-600 font-bold">Euler</span> y <span className="text-indigo-700 font-bold">RK2</span>:
        </p>
        <div className="bg-white border-l-4 border-red-400 p-6 rounded shadow-sm space-y-4">
          <p className="font-mono text-xl">
            Euler: <Latex>{`y_{n+1} = y_n + h \\cdot f(x_n, y_n)`}</Latex>
          </p>
        </div>
        <div className="bg-white border-l-4 border-indigo-600 p-6 rounded shadow-sm space-y-4">
          <p className="font-mono text-xl">
            RK2: <Latex>{`y_{n+1} = y_n + h \\cdot f(x_n + h/2, y_n + k_1/2)`}</Latex>
          </p>
        </div>
        <p className="text-lg mt-2">
          Euler usa solo la pendiente inicial, mientras que RK2 ajusta la pendiente usando el punto intermedio.
        </p>
      </div>
    ),
  },
  // Filmina 5: Fórmulas RK2
  {
    title: "Fórmulas RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="bg-white border-l-4 border-indigo-600 p-6 rounded shadow-sm space-y-4">
          <div className="text-2xl">
            <Latex>{`k_1 = h \\cdot f(x_n, y_n)`}</Latex>
          </div>
          <div className="text-2xl">
            <Latex>{`y_{n+1} = y_n + h \\cdot f\\Big(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\Big)`}</Latex>
          </div>
        </div>
        <div className="text-lg space-y-1">
          <p><Latex>{`y_n`}</Latex>: valor conocido en <Latex>{`x_n`}</Latex></p>
          <p><Latex>{`h`}</Latex>: tamaño del paso</p>
          <p><Latex>{`k_1`}</Latex>: pendiente inicial</p>
          <p><Latex>{`y_n + k_1/2`}</Latex>: estimación en punto intermedio</p>
          <p><Latex>{`f(x_n + h/2, y_n + k_1/2)`}</Latex>: pendiente corregida</p>
        </div>
      </div>
    ),
  },
  // Filmina 6: Pasos del Método
  {
    title: "Pasos del Método",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <ol className="list-decimal list-inside text-lg space-y-2 font-semibold">
          <li>Evaluar pendiente inicial <Latex>{`k_1`}</Latex></li>
          <li>Calcular pendiente corregida en punto intermedio</li>
          <li>Calcular <Latex>{`y_{n+1}`}</Latex> combinando pendientes</li>
        </ol>
        <p className="text-lg font-semibold">
          Más preciso que Euler porque ajusta la pendiente usando información intermedia.
        </p>
      </div>
    ),
  },
  // Filmina 7: Funcionamiento paso a paso
  {
    title: "Funcionamiento Paso a Paso",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <ul className="list-disc list-inside text-lg space-y-2 font-semibold text-gray-700">
          <li>Punto inicial <Latex>{`(x_n, y_n)`}</Latex></li>
          <li>Pendiente inicial <Latex>{`k_1`}</Latex> (línea roja)</li>
          <li>Punto intermedio <Latex>{`(x_n + h/2, y_n + k_1/2)`}</Latex></li>
          <li>Pendiente corregida (línea azul)</li>
          <li>Nuevo valor <Latex>{`y_{n+1}`}</Latex></li>
        </ul>
        <p className="text-lg font-semibold">
          RK2 corrige la pendiente inicial usando el punto intermedio, logrando mayor precisión.
        </p>
      </div>
    ),
  },
  // Filmina 8: Ejemplo práctico
  {
    title: "Ejemplo Práctico",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg font-semibold">
          Consideremos <Latex>{`y' = -3x^2 y`}</Latex> con <Latex>{`y(0) = 3`}</Latex>, paso <Latex>{`h = 0.1`}</Latex>.
        </p>
        <div className="bg-white border-l-4 border-indigo-600 p-6 rounded shadow-sm text-lg font-mono">
          <p>k₁ = h * f(x₀, y₀) = 0.1 * (-3 * 0² * 3) = 0</p>
          <p>y₁ = y₀ + h * f(x₀ + h/2, y₀ + k₁/2)</p>
        </div>
      </div>
    ),
  },
  // Filmina 9: Iteraciones
  {
    title: "Iteraciones",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg font-semibold">Calculamos paso a paso:</p>
        <div className="bg-white border-l-4 border-indigo-400 p-6 rounded shadow-sm font-mono text-lg space-y-2">
          <p>Iteración 1: x₀=0, y₀=3, k₁=0 → y₁ = 3</p>
          <p>Iteración 2: x₁=0.1, y₁=3 → calcular k₁, y₂...</p>
          <p>… y así sucesivamente hasta x_f = 0.5</p>
        </div>
      </div>
    ),
  },
  // Filmina 10: Resultado final
  {
    title: "Resultado Final",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded shadow-sm text-xl font-mono">
          <p><span className="font-bold text-green-800">y(0.5) ≈ 2.5278</span></p>
        </div>
        <p className="text-lg font-semibold mt-2">
          Este valor se obtiene tras calcular todas las iteraciones paso a paso usando RK2.
        </p>
      </div>
    ),
  },
];

export default function PresentacionRK2() {
  const [index, setIndex] = useState(0);
  const section = sections[index];
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Calculator className="w-14 h-14 text-indigo-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{section.title}</h1>
            </div>
          </div>
          <div className="text-gray-800 text-lg">{section.content}</div>
        </div>

        <div className="fixed bottom-20 left-0 right-0 flex justify-between px-8 max-w-5xl mx-auto">
          {/* Botón Anterior */}
          <button
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="flex items-center px-6 py-3 rounded-xl bg-gray-200 text-gray-800 disabled:opacity-40 hover:bg-gray-300 transition"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>

          {/* Botón Siguiente / Finalizar */}
          <button
            onClick={() => {
              if (index === sections.length - 1) {
                setLocation("/runge-kutta");
              } else {
                setIndex(i => Math.min(i + 1, sections.length - 1));
              }
            }}
            className="flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {index === sections.length - 1 ? "Finalizar" : "Siguiente"}
            {index !== sections.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
}
