import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calculator, Home, BarChart3, PlayCircle } from "lucide-react";
import Latex from "react-latex-next";
import { Link, useLocation } from "wouter";

// Componente de barra de progreso
const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
    <div 
      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
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
    <div className={`bg-white border-l-4 ${colorClasses[color]} p-6 rounded-lg shadow-md space-y-3 mb-4`}>
      {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
      <div className="text-2xl font-mono text-center py-2 bg-gray-50 rounded">
        <Latex>{formula}</Latex>
      </div>
      {children}
    </div>
  );
};

// Componente para pasos numerados
const StepItem = ({ number, title, description }) => (
  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

const sections = [
  // Filmina 1: Introducción mejorada
  {
    title: "Introducción a EDO y PVI",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Método de Runge-Kutta de 2do Orden</h2>
          <p className="text-xl text-gray-600">Una solución numérica para ecuaciones diferenciales</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FormulaBox 
            title="EDO de Primer Orden" 
            formula={`\\( y' = f(x, y(x)) = \\frac{dy}{dx} \\)`}
            color="indigo"
          >
            <p className="text-gray-700">Relaciona una función con sus derivadas para modelar fenómenos de cambio</p>
          </FormulaBox>
          
          <FormulaBox 
            title="Problema de Valor Inicial (PVI)" 
            formula={`\\( y(x_0) = y_0 \\)`}
            color="green"
          >
            <p className="text-gray-700">Condición inicial que define el punto de partida de la solución</p>
          </FormulaBox>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="font-semibold">🎯 Objetivo: Encontrar <Latex>{`y(x)`}</Latex> para valores cercanos a <Latex>{`x_0`}</Latex></p>
        </div>
      </div>
    ),
  },
  // Filmina 2: Condiciones iniciales mejorada
  {
    title: "Condiciones Iniciales para RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg text-center text-gray-600 mb-8">
          Requisitos para aplicar el método RK2 correctamente
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border-t-4 border-blue-500">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Continuidad</h3>
            <p className="text-sm text-gray-600"><Latex>{`f(x, y)`}</Latex> debe ser continua</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border-t-4 border-green-500">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">Valor Inicial</h3>
            <p className="text-sm text-gray-600">Conocer <Latex>{`y_0`}</Latex> en <Latex>{`x_0`}</Latex></p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border-t-4 border-purple-500">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Paso Adecuado</h3>
            <p className="text-sm text-gray-600">Tamaño <Latex>{`h`}</Latex> apropiado</p>
          </div>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
          <p className="font-semibold text-green-800">✅ Estas condiciones aseguran una aproximación confiable</p>
        </div>
      </div>
    ),
  },
  // Filmina 3: Ordenada Genérica mejorada
  {
    title: "Fórmula RK2 - Ordenada Genérica",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <FormulaBox 
          title="Fórmula Principal RK2" 
          formula={`\\( y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}) \\)`}
        >
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span><Latex>{`k_1 = h \\cdot f(x_n, y_n)`}</Latex></span>
              <span className="text-red-600 font-semibold">Pendiente inicial</span>
            </div>
            <div className="flex justify-between">
              <span><Latex>{`x_n + \\frac{h}{2}`}</Latex></span>
              <span className="text-blue-600 font-semibold">Punto intermedio en x</span>
            </div>
            <div className="flex justify-between">
              <span><Latex>{`y_n + \\frac{k_1}{2}`}</Latex></span>
              <span className="text-green-600 font-semibold">Punto intermedio en y</span>
            </div>
          </div>
        </FormulaBox>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Idea Clave</h4>
          <p>RK2 usa un punto intermedio para corregir la pendiente, mejorando la precisión respecto a Euler</p>
        </div>
      </div>
    ),
  },
  // Filmina 4: Comparación Euler vs RK2 mejorada
  {
    title: "Comparación: Euler vs RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <p className="text-lg text-center text-gray-600 mb-8">
          Diferencias clave entre los métodos numéricos
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <FormulaBox 
            title="Método de Euler" 
            formula={`\\( y_{n+1} = y_n + h \\cdot f(x_n, y_n) \\)`}
            color="red"
          >
            <div className="space-y-2 text-sm">
              <p className="text-red-600 font-semibold">• Usa solo la pendiente inicial</p>
              <p className="text-red-600 font-semibold">• Error: O(h)</p>
              <p className="text-red-600 font-semibold">• Menos preciso</p>
            </div>
          </FormulaBox>
          
          <FormulaBox 
            title="Método RK2" 
            formula={`\\( y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}) \\)`}
            color="indigo"
          >
            <div className="space-y-2 text-sm">
              <p className="text-indigo-600 font-semibold">• Usa pendiente corregida</p>
              <p className="text-indigo-600 font-semibold">• Error: O(h²)</p>
              <p className="text-indigo-600 font-semibold">• Más preciso</p>
            </div>
          </FormulaBox>
        </div>
        
        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
          <p className="font-semibold text-purple-800">
            📈 RK2 es más preciso porque evalúa la pendiente en un punto intermedio
          </p>
        </div>
      </div>
    ),
  },
  // Filmina 5: Fórmulas RK2 mejorada
  {
    title: "Fórmulas Completas RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Procedimiento RK2 Completo</h3>
          
          <div className="space-y-4">
            <StepItem 
              number="1" 
              title="Pendiente Inicial" 
              description={<Latex>{`k_1 = h \\cdot f(x_n, y_n)`}</Latex>}
            />
            <StepItem 
              number="2" 
              title="Punto Intermedio" 
              description={<Latex>{`(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2})`}</Latex>}
            />
            <StepItem 
              number="3" 
              title="Pendiente Corregida" 
              description={<Latex>{`f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2})`}</Latex>}
            />
            <StepItem 
              number="4" 
              title="Nuevo Valor" 
              description={<Latex>{`y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2})`}</Latex>}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-semibold text-gray-700"><Latex>{`y_n`}</Latex></p>
            <p className="text-sm text-gray-600">Valor conocido</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-semibold text-gray-700"><Latex>{`h`}</Latex></p>
            <p className="text-sm text-gray-600">Tamaño paso</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-semibold text-gray-700"><Latex>{`k_1`}</Latex></p>
            <p className="text-sm text-gray-600">Pendiente inicial</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="font-semibold text-gray-700"><Latex>{`y_{n+1}`}</Latex></p>
            <p className="text-sm text-gray-600">Nuevo valor</p>
          </div>
        </div>
      </div>
    ),
  },
  // Filmina 6: Pasos del Método mejorada
  {
    title: "Pasos del Método RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-center mb-4">Proceso Iterativo RK2</h3>
          <p className="text-center text-blue-100">
            Cada iteración sigue estos pasos para avanzar en la solución
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow border">
            <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h4 className="font-semibold text-red-600">Evaluar pendiente inicial</h4>
              <p className="text-gray-600"><Latex>{`k_1 = h \\cdot f(x_n, y_n)`}</Latex></p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow border">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h4 className="font-semibold text-blue-600">Calcular pendiente corregida</h4>
              <p className="text-gray-600">En el punto intermedio <Latex>{`(x_n + h/2, y_n + k_1/2)`}</Latex></p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow border">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h4 className="font-semibold text-green-600">Calcular nuevo valor</h4>
              <p className="text-gray-600"><Latex>{`y_{n+1} = y_n + h \\cdot f(x_n + h/2, y_n + k_1/2)`}</Latex></p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
          <p className="font-semibold text-green-800">
            ✅ RK2 es más preciso porque ajusta la pendiente usando información intermedia
          </p>
        </div>
      </div>
    ),
  },
  // Filmina 7: Funcionamiento paso a paso mejorada
  {
    title: "Funcionamiento Visual RK2",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Representación Gráfica del Método</h3>
          <p className="text-gray-600">Cómo RK2 corrige la pendiente para mayor precisión</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-600">Punto inicial:</span>
              <Latex>{`(x_n, y_n)`}</Latex>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="font-semibold text-red-600">Pendiente inicial (k₁):</span>
              <span className="text-gray-600">Línea roja - evaluación en punto actual</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-blue-600">Punto intermedio:</span>
              <Latex>{`(x_n + h/2, y_n + k_1/2)`}</Latex>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-blue-600">Pendiente corregida:</span>
              <span className="text-gray-600">Línea azul - evaluación en punto intermedio</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-600">Nuevo punto:</span>
              <Latex>{`(x_{n+1}, y_{n+1})`}</Latex>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
          <h4 className="font-semibold text-indigo-800 mb-2">🎯 Ventaja Clave</h4>
          <p>RK2 corrige la dirección usando información del punto medio, resultando en una aproximación más cercana a la solución real</p>
        </div>
      </div>
    ),
  },
  // Filmina 8: Ejemplo práctico mejorado
  {
    title: "Ejemplo Práctico Aplicado",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Problema de Ejemplo</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormulaBox 
              title="EDO" 
              formula={`\\( y' = -3x^2 y \\)`}
              color="blue"
            />
            
            <FormulaBox 
              title="Condición Inicial" 
              formula={`\\( y(0) = 3 \\)`}
              color="green"
            />
          </div>
          
          <div className="text-center mt-4">
            <p className="font-semibold text-gray-700">Tamaño de paso: <Latex>{`h = 0.1`}</Latex></p>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
          <h4 className="font-semibold text-yellow-800 mb-2">Primera Iteración</h4>
          <div className="font-mono text-lg space-y-2">
            <p><Latex>{`x_0 = 0, y_0 = 3`}</Latex></p>
            <p><Latex>{`k_1 = h \\cdot f(x_0, y_0) = 0.1 \\cdot (-3 \\cdot 0^2 \\cdot 3) = 0`}</Latex></p>
            <p><Latex>{`y_1 = y_0 + h \\cdot f(x_0 + h/2, y_0 + k_1/2)`}</Latex></p>
          </div>
        </div>
      </div>
    ),
  },
  // Filmina 9: Iteraciones mejorada
  {
    title: "Iteraciones Paso a Paso",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Proceso Iterativo Completo</h3>
          <p className="text-gray-600">Desde x=0 hasta x=0.5 con h=0.1</p>
        </div>
        
        <div className="grid gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold text-green-800 mb-2">Iteración 1</h4>
            <p className="font-mono"><Latex>{`x_0=0, y_0=3, k_1=0 → y_1=3`}</Latex></p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">Iteración 2</h4>
            <p className="font-mono"><Latex>{`x_1=0.1, y_1=3 → calcular k_1, y_2`}</Latex></p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-800 mb-2">Iteración 3</h4>
            <p className="font-mono"><Latex>{`x_2=0.2, y_2=? → continuar cálculo...`}</Latex></p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-bold text-orange-800 mb-2">Iteración 5</h4>
            <p className="font-mono"><Latex>{`x_4=0.4 → calcular y_5`}</Latex></p>
          </div>
        </div>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded mt-4">
          <p className="font-semibold text-indigo-800">
            🔄 Continuar este proceso hasta alcanzar x = 0.5
          </p>
        </div>
      </div>
    ),
  },
  // Filmina 10: Resultado final mejorado
  {
    title: "Resultado Final y Conclusiones",
    content: (
      <div className="space-y-6 max-w-5xl mx-auto text-gray-800 py-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Solución Aproximada</h3>
          <p className="text-xl text-gray-600">Valor obtenido tras aplicar RK2</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-8 text-center shadow-lg">
          <div className="text-4xl font-bold mb-2">
            <Latex>{`y(0.5) \\approx 2.5278`}</Latex>
          </div>
          <p className="text-green-100 text-lg">Solución numérica con método RK2</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h4 className="font-bold text-indigo-700 mb-3">✅ Ventajas de RK2</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Mayor precisión que Euler</li>
              <li>• Fácil de implementar</li>
              <li>• Balance entre costo y precisión</li>
              <li>• Error del orden O(h²)</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border">
            <h4 className="font-bold text-blue-700 mb-3">📊 Aplicaciones</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Dinámica de poblaciones</li>
              <li>• Circuitos eléctricos</li>
              <li>• Movimiento de proyectiles</li>
              <li>• Modelos económicos</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];

export default function PresentacionRK2() {
  const [index, setIndex] = useState(0);
  const section = sections[index];
  const [, setLocation] = useLocation();

  // Agregar navegación por teclado
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con navegación */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition shadow-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </button>
          
          <div className="text-center">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {index + 1} / {sections.length}
            </span>
          </div>
          
          <button
            onClick={() => setLocation("/runge-kutta")}
            className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Calculadora
          </button>
        </div>

        {/* Barra de progreso */}
        <ProgressBar current={index} total={sections.length} />

        {/* Contenido principal */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Calculator className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{section.title}</h1>
              <div className="w-20 h-1 bg-indigo-600 mt-2 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-gray-800">{section.content}</div>
        </div>

        {/* Navegación inferior mejorada */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-between px-8 max-w-5xl mx-auto">
          <button
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="flex items-center px-6 py-3 rounded-xl bg-white text-gray-800 disabled:opacity-40 hover:bg-gray-50 transition shadow-lg border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
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
            className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
          >
            {index === sections.length - 1 ? (
              <>
                <BarChart3 className="w-5 h-5 mr-2" />
                Ir a la Calculadora
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Indicadores de navegación por teclado */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          ← → para navegar
        </div>
      </div>
    </div>
  );
}