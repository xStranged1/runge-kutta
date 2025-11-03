import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calculator, Home, BarChart3, PlayCircle } from "lucide-react";
import Latex from "react-latex-next";
import { Link, useLocation } from "wouter";

// Componente de barra de progreso
const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
    <div
      className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
      style={{ width: `${((current + 1) / total) * 100}%` }}
    ></div>
  </div>
);

// Componente para fórmulas destacadas
const FormulaBox = ({ title, formula, color = "indigo", children }) => {
  const colorClasses = {
    indigo: "border-indigo-600",
    green: "border-green-600",
    red: "border-red-600",
    blue: "border-blue-600",
    purple: "border-purple-600"
  };

  return (
    <div className={`bg-white border-l-4 ${colorClasses[color]} p-8 rounded-xl shadow-md space-y-4 mb-6`}>
      {title && <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h3>}
      <div className="text-3xl md:text-4xl font-mono text-center py-4 bg-gray-50 rounded">
        <Latex>{formula}</Latex>
      </div>
      {children}
    </div>
  );
};

// Componente para pasos numerados
const StepItem = ({ number, title, description }) => (
  <div className="flex items-start space-x-6 p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 text-xl">{title}</h4>
      <p className="text-gray-600 mt-2 text-lg">{description}</p>
    </div>
  </div>
);

const sections = [
  // Filmina 1: Introducción (MODIFICADA - agregada explicación sobre aproximaciones)
  {
    title: "Introducción a EDO y PVI",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">Método de Runge-Kutta de 2do Orden</h2>
          <p className="text-2xl md:text-3xl text-gray-600">Una forma de obtener soluciones aproximadas para ecuaciones diferenciales</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FormulaBox
            title="EDO de Primer Orden"
            formula={`\\( y' = f(x, y(x)) = \\frac{dy}{dx} \\)`}
            color="indigo"
          >
            <p className="text-gray-700 text-lg">Relación que describe cómo cambia una función respecto a su variable independiente.</p>
          </FormulaBox>

          <FormulaBox
            title="Problema de Valor Inicial (PVI)"
            formula={`\\( y(x_0) = y_0 \\)`}
            color="green"
          >
            <p className="text-gray-700 text-lg">Nos da un punto de partida conocido para calcular la solución de la EDO.</p>
          </FormulaBox>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <p className="font-semibold text-yellow-800 text-lg">Objetivo: Encontrar <Latex>{`$y(x)$`}</Latex> para valores cercanos a <Latex>{`$x_0$`}</Latex> usando información de la pendiente.</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 text-lg">¿Por qué usar aproximaciones?</h4>
          <p className="text-gray-700 text-lg">
            Muchas ecuaciones diferenciales no tienen <strong>solución analítica</strong> cerrada. Los métodos numéricos como RK2 nos permiten obtener <strong>soluciones aproximadas</strong> cuando no es posible llegar a una solución exacta mediante métodos algebraicos.
          </p>
        </div>
      </div>
    ),
  },
  // Filmina 2: Condiciones para aplicar el método (SIN CAMBIOS)
  {
    title: "Condiciones para Aplicar RK2",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <p className="text-xl text-center text-gray-600 mb-8">
          Para aplicar RK2 correctamente necesitamos cumplir ciertas condiciones
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border-t-4 border-blue-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg">Dominio Definido</h3>
            <p className="text-gray-600 text-lg">El dominio de <Latex>{`$x$`}</Latex> debe estar claramente definido y acotado</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md border-t-4 border-green-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg">Continuidad</h3>
            <p className="text-gray-600 text-lg"><Latex>{`$f(x, y)$`}</Latex> debe ser continua en el dominio</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md border-t-4 border-purple-500">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg">Valor Inicial</h3>
            <p className="text-gray-600 text-lg">Debemos conocer <Latex>{`$y_0$`}</Latex> en <Latex>{`$x_0$`}</Latex></p>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
          <p className="font-semibold text-green-800 text-lg">El dominio de <Latex>{`$x$`}</Latex> debe estar acotado para garantizar convergencia y estabilidad numérica</p>
        </div>
      </div>
    ),
  },

  // Filmina 3: Ordenada Genérica (SIN CAMBIOS)
  {
    title: "Ordenada Genérica en RK2",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <FormulaBox
          title="¿Qué es la Ordenada Genérica?"
          formula={`\\( y_{n+1} = y_n + \\phi(x_n, y_n, h) \\)`}
          color="blue"
        >
          <div className="space-y-4 text-lg text-gray-700">
            <p><strong>Ordenada genérica</strong> es la función <Latex>{`$\\phi(x_n, y_n, h)$`}</Latex> que representa el <strong>incremento promedio</strong> de la solución en cada paso.</p>
            <p>En RK2, esta función combina información de múltiples pendientes para mejorar la precisión.</p>
          </div>
        </FormulaBox>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-3 text-lg">En el Método de Euler</h4>
            <p className="text-gray-700"><Latex>{`$\\phi(x_n, y_n, h) = h \\cdot f(x_n, y_n)$`}</Latex></p>
            <p className="text-gray-600 mt-2">Usa solo la pendiente inicial</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3 text-lg">En RK2</h4>
            <p className="text-gray-700"><Latex>{`$\\phi(x_n, y_n, h) = \\frac{1}{2}(k_1 + k_2)$`}</Latex></p>
            <p className="text-gray-600 mt-2">Combina dos pendientes para mejor aproximación</p>
          </div>
        </div>
      </div>
    ),
  },

  // Filmina 4 y 5 UNIDAS: Métodos de Paso Simple vs Múltiple (NUEVA)
  {
    title: "Métodos de Paso Simple vs Múltiple",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Clasificación de Métodos Numéricos</h3>
          <p className="text-xl text-gray-600">Diferencias fundamentales entre métodos de un solo paso y múltiples pasos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Métodos de Un Solo Paso</h3>
            <div className="space-y-4">
              <FormulaBox
                title="Método de Euler"
                formula={`\\( y_{n+1} = y_n + h f(x_n, y_n) \\)`}
                color="red"
              >
                <p className="text-red-600 font-semibold">• Error: <Latex>{`$O(h)$`}</Latex></p>
              </FormulaBox>

              <FormulaBox
                title="Runge-Kutta de 2do Orden"
                formula={`\\( y_{n+1} = y_n + \\frac{1}{2}(k_1 + k_2) \\)`}
                color="green"
              >
                <p className="text-green-600 font-semibold">• Error: <Latex>{`$O(h^2)$`}</Latex></p>
              </FormulaBox>

              <FormulaBox
                title="Runge-Kutta de 4to Orden"
                formula={`\\( y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4) \\)`}
                color="purple"
              >
                <p className="text-purple-600 font-semibold">• Error: <Latex>{`$O(h^4)$`}</Latex></p>
              </FormulaBox>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Métodos de Múltiples Pasos</h3>
            <div className="space-y-4">
              <FormulaBox
                title="Adams-Bashforth"
                formula={`\\( y_{n+1} = y_n + h \\sum_{i=0}^{k} \\beta_i f_{n-i} \\)`}
                color="orange"
              >
                <p className="text-orange-600 font-semibold">• Métodos explícitos</p>
              </FormulaBox>

              <FormulaBox
                title="Adams-Moulton"
                formula={`\\( y_{n+1} = y_n + h \\sum_{i=-1}^{k} \\beta_i f_{n-i} \\)`}
                color="indigo"
              >
                <p className="text-indigo-600 font-semibold">• Métodos implícitos</p>
              </FormulaBox>

              <FormulaBox
                title="Métodos de Predictor-Corrector"
                formula={`\\( P: \\text{Adams-Bashforth} \\)`}
                color="blue"
              >
                <p className="text-blue-600 font-semibold">• Combina ambos enfoques</p>
              </FormulaBox>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2 text-lg">Comparación entre Métodos</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-purple-700 mb-2">Un Solo Paso (RK2)</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Auto-iniciable</li>
                <li>Fácil cambio de tamaño de paso</li>
                <li>Menos eficiente computacionalmente</li>
                <li>Implementación sencilla</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-purple-700 mb-2">Múltiples Pasos</h5>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Requiere métodos de arranque</li>
                <li>Más eficiente computacionalmente</li>
                <li>Mayor precisión para el mismo orden</li>
                <li>Complejidad en cambio de paso</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // Filmina 6: Fórmula RK2 - Ordenada Genérica (SIN CAMBIOS)
  {
    title: "Fórmula RK2 - Ordenada Genérica",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <FormulaBox
          title="Fórmula Principal RK2"
          formula={`\\( y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}) \\)`}
        >
          <div className="space-y-3 text-lg text-gray-700">
            <p><Latex>{`$k_1 = h \\cdot f(x_n, y_n)$`}</Latex> - Pendiente inicial calculada en el punto actual</p>
            <p><Latex>{`$x_n + \\frac{h}{2}$`}</Latex> - Punto intermedio en x donde evaluamos la pendiente corregida</p>
            <p><Latex>{`$y_n + \\frac{k_1}{2}$`}</Latex> - Valor intermedio en y para mejorar la precisión</p>
          </div>
        </FormulaBox>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 text-lg">Ordenada Genérica en RK2</h4>
          <p className="text-gray-700 text-lg">La ordenada genérica <Latex>{`$\\phi(x_n, y_n, h)$`}</Latex> en RK2 combina inteligentemente información de diferentes puntos para obtener una mejor aproximación del incremento.</p>
        </div>
      </div>
    ),
  },

  // Filmina 7: Comparación Euler vs RK2 (MODIFICADA - agregada explicación de errores)
  {
    title: "Comparación: Euler vs RK2",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <p className="text-xl text-center text-gray-600 mb-8">
          Observamos cómo RK2 mejora a Euler en precisión y estabilidad
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <FormulaBox
            title="Método de Euler"
            formula={`\\( y_{n+1} = y_n + h \\cdot f(x_n, y_n) \\)`}
            color="red"
          >
            <p className="text-red-600 text-lg font-semibold">Usa solo la pendiente inicial</p>
            <p className="text-red-600 text-lg font-semibold">Error de truncamiento local: <Latex>{`$O(h^2)$`}</Latex></p>
            <p className="text-red-600 text-lg font-semibold">Error global: <Latex>{`$O(h)$`}</Latex></p>
          </FormulaBox>

          <FormulaBox
            title="Método RK2"
            formula={`\\( y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}) \\)`}
            color="indigo"
          >
            <p className="text-indigo-600 text-lg font-semibold">Usa pendiente corregida en el punto intermedio</p>
            <p className="text-indigo-600 text-lg font-semibold">Error de truncamiento local: <Latex>{`$O(h^3)$`}</Latex></p>
            <p className="text-indigo-600 text-lg font-semibold">Error global: <Latex>{`$O(h^2)$`}</Latex></p>
          </FormulaBox>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2 text-lg">Explicación de Errores de Aproximación</h4>
          <div className="space-y-3 text-gray-700">
            <p><strong>Error de truncamiento local:</strong> Error cometido en un solo paso, debido a la aproximación numérica.</p>
            <p><strong>Error global:</strong> Error acumulado después de varios pasos, que determina la precisión total del método.</p>
            <p><strong>Ventaja de RK2:</strong> Al usar información del punto medio, reduce significativamente el error de truncamiento, logrando mayor precisión con el mismo tamaño de paso.</p>
          </div>
        </div>
      </div>
    ),
  },

  // Filmina 8: Cálculo de k1 y k2 (SIN CAMBIOS)
  {
    title: "Cálculo de k1 y k2",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <p className="text-xl text-center text-gray-600 mb-8">
          En RK2 se usan dos pendientes para mejorar la aproximación
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <FormulaBox
            title="Pendiente Inicial"
            formula={`\\( k_1 = h \\cdot f(x_n, y_n) \\)`}
          >
            <p className="text-gray-700 text-lg">Representa la pendiente en el inicio del intervalo.</p>
          </FormulaBox>

          <FormulaBox
            title="Pendiente Corregida"
            formula={`\\( k_2 = h \\cdot f(x_n + h, y_n + k_1) \\)`}
          >
            <p className="text-gray-700 text-lg">Se ajusta usando k1 para obtener mejor aproximación del siguiente punto.</p>
          </FormulaBox>
        </div>
      </div>
    ),
  },

  // Filmina 9: ELIMINADA

  // Filmina 10: Algoritmo Paso a Paso (SIN CAMBIOS)
  {
    title: "Algoritmo Paso a Paso",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <StepItem number="1" title="Definir PVI" description="Conocer x0, y0 y función f(x,y)" />
        <StepItem number="2" title="Elegir h" description="Determinar tamaño de paso apropiado" />
        <StepItem number="3" title="Calcular k1" description="Usar pendiente inicial" />
        <StepItem number="4" title="Calcular k2" description="Usar pendiente corregida" />
        <StepItem number="5" title="Actualizar y" description="Promediar k1 y k2 para obtener y_{n+1}" />
      </div>
    ),
  },

  // Filmina 11: Ventajas RK2 (MEJORADA - más ventajas y desarrollo)
  {
    title: "Ventajas del Método RK2",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-3 text-lg">Ventajas Principales</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Mayor precisión que Euler</strong> sin aumentar mucho la complejidad computacional</li>
              <li><strong>Estabilidad numérica</strong> mejorada para pasos moderados</li>
              <li><strong>Fácil implementación</strong> y programación</li>
              <li><strong>Auto-iniciable</strong> (método de un solo paso)</li>
              <li><strong>Flexibilidad</strong> en el cambio de tamaño de paso</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 mb-3 text-lg">Aplicaciones y Extensiones</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Base para métodos de orden superior</strong> como RK4</li>
              <li><strong>Ideal para sistemas de EDOs</strong> y ecuaciones acopladas</li>
              <li><strong>Ampliamente usado</strong> en simulaciones científicas</li>
              <li><strong>Buen equilibrio</strong> entre precisión y costo computacional</li>
              <li><strong>Educativamente valioso</strong> para entender métodos numéricos</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2 text-lg">Desarrollo del Método</h4>
          <p className="text-gray-700">
            RK2 representa un punto óptimo en la relación precisión-complejidad. Mientras que Euler es demasiado impreciso para muchas aplicaciones 
            y RK4 puede ser computacionalmente costoso, RK2 ofrece una mejora significativa sobre Euler con solo el doble de evaluaciones de función por paso, 
            haciendo que sea la elección ideal para muchos problemas prácticos donde se requiere un balance entre precisión y eficiencia.
          </p>
        </div>
      </div>
    ),
  },

  // Filmina 12: Ejemplo Numérico (SIN CAMBIOS)
  {
    title: "Ejemplo Numérico",
    content: (
      <div className="space-y-8 max-w-5xl mx-auto text-gray-800 py-8">
        <p className="text-lg text-gray-700">
          Supongamos <Latex>{`$y' = x + y, \\quad y(0)=1, \\quad h=0.1$`}</Latex>. Calculamos:
        </p>
        <FormulaBox
          title="Paso 1"
          formula={`$k_1 = h f(x_0, y_0) = 0.1 \\cdot (0 + 1) = 0.1$`}
        >
          <p className="text-gray-700">Cálculo de k1 usando los valores iniciales</p>
        </FormulaBox>
        <FormulaBox
          formula={`$k_2 = h f(x_0 + h, y_0 + k_1) = 0.1 \\cdot (0.1 + 1.1) = 0.12$`}
        />
        <FormulaBox
          formula={`$y_1 = y_0 + \\frac{1}{2}(k_1 + k_2) = 1 + 0.5 \\cdot (0.1 + 0.12) = 1.11$`}
        />
      </div>
    ),
  },

  // Filmina 13: ELIMINADA
];

export default function PresentacionRK2() {
  const [index, setIndex] = useState(0);
  const section = sections[index];
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'ArrowRight') {
        setIndex(i => Math.min(i + 1, sections.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setLocation("/runge-kutta")}
            className="flex items-center px-5 py-3 rounded-xl bg-white text-gray-700 hover:bg-gray-100 transition shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Inicio
          </button>

          <div className="text-center">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-base font-semibold">
              {index + 1} / {sections.length}
            </span>
          </div>

          <button
            onClick={() => setLocation("/runge-kutta")}
            className="flex items-center px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-md"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Calculadora
          </button>
        </div>

        <ProgressBar current={index} total={sections.length} />

        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-6 mb-10">
            <div className="p-4 bg-indigo-100 rounded-2xl">
              <Calculator className="w-10 h-10 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{section.title}</h1>
              <div className="w-28 h-2 bg-indigo-600 mt-3 rounded-full"></div>
            </div>
          </div>

          <div className="text-gray-800">{section.content}</div>
        </div>

        <div className="fixed bottom-6 left-0 right-0 flex justify-between px-8 max-w-5xl mx-auto">
          <button
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="flex items-center px-7 py-4 rounded-2xl bg-white text-gray-800 disabled:opacity-40 hover:bg-gray-50 transition shadow-lg border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 mr-3" />
            Anterior
          </button>

          <button
            onClick={() => {
              if (index === sections.length - 1) {
                setLocation("/runge-kutta");
              } else {
                setIndex(i => Math.min(i + 1, sections.length - 1));
              }
            }}
            className="flex items-center px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
          >
            {index === sections.length - 1 ? (
              <>
                <BarChart3 className="w-5 h-5 mr-3" />
                Ir a la Calculadora
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-5 h-5 ml-3" />
              </>
            )}
          </button>
        </div>

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          ← → para navegar
        </div>
      </div>
    </div>
  );
}