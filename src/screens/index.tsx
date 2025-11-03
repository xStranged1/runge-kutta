import React, { useState } from 'react';
import { Calculator, ChevronRight, Plus } from 'lucide-react';
import { Link } from "wouter";
import Latex from "react-latex-next";

const IndexScreen = () => {
    const [activeTab, setActiveTab] = useState('ejemplo');
    const [customInput, setCustomInput] = useState({
        equation: '2*x*y',
        x0: '1',
        y0: '1',
        xf: '1.3',
        h: '0.1'
    });
    const [customResult, setCustomResult] = useState(null);

    // Ejemplo del problema dado
    const ejemploData = {
        equation: 'f(x, y(x)) = y\' = -3x²y',
        x0: 0,
        y0: 3,
        xf: 0.5,
        h: 0.1
    };

    // Función para evaluar la ecuación diferencial del ejemplo
    const f_ejemplo = (x, y) => -3 * x * x * y;

    // Resolver el ejemplo
    const resolverEjemplo = () => {
        const iteraciones = [];
        let x = ejemploData.x0;
        let y = ejemploData.y0;

        iteraciones.push({
            n: 0,
            x: x.toFixed(1),
            y: y.toFixed(4),
            k1: '-',
            k1_calc: '-',
            evaluacion: '-',
            y_next: y.toFixed(4)
        });

        let n = 0;
        while (x < ejemploData.xf - 0.0001) {
            // Paso 1: calcular k1
            const f_n = f_ejemplo(x, y);
            const k1 = ejemploData.h * f_n;

            // Paso 2: calcular punto medio
            const x_medio = x + ejemploData.h / 2;
            const y_medio = y + k1 / 2;

            // Paso 3: evaluar f en el punto medio
            const f_medio = f_ejemplo(x_medio, y_medio);

            // Paso 4: calcular y_next
            const y_next = y + ejemploData.h * f_medio;

            iteraciones.push({
                n: n + 1,
                x: x.toFixed(1),
                y: y.toFixed(6),
                f_n: f_n.toFixed(6),
                k1: k1.toFixed(6),
                k1_calc: `${ejemploData.h} \\times (-3 \\times ${x.toFixed(1)}^2 \\times ${y.toFixed(6)})`,
                x_medio: x_medio.toFixed(2),
                y_medio: y_medio.toFixed(6),
                f_medio: f_medio.toFixed(6),
                f_medio_calc: `-3 \\times (${x_medio.toFixed(2)})^2 \\times ${y_medio.toFixed(6)}`,
                y_next: y_next.toFixed(6)
            });

            x += ejemploData.h;
            y = y_next;
            n++;
        }

        return iteraciones;
    };

    // Parsear y evaluar expresiones matemáticas personalizadas
    const evaluarExpresion = (expr, x, y) => {
        try {
            // Reemplazar operadores y funciones
            let processed = expr
                .replace(/\^/g, '**')
                .replace(/\bx\b/g, `(${x})`)
                .replace(/\by\b/g, `(${y})`)
                .replace(/exp/g, 'Math.exp')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt');

            return eval(processed);
        } catch (error) {
            console.error('Error evaluando expresión:', error);
            throw new Error('Error en la expresión matemática');
        }
    };

    // Resolver problema personalizado
    const resolverPersonalizado = () => {
        try {
            const x0 = parseFloat(customInput.x0);
            const y0 = parseFloat(customInput.y0);
            const xf = parseFloat(customInput.xf);
            const h = parseFloat(customInput.h);

            if (isNaN(x0) || isNaN(y0) || isNaN(xf) || isNaN(h)) {
                alert('Por favor ingrese valores numéricos válidos');
                return;
            }

            if (h <= 0) {
                alert('El paso h debe ser positivo');
                return;
            }

            if (Math.abs(xf - x0) < h * 0.1) {
                alert('El intervalo es muy pequeño para el paso dado');
                return;
            }

            const iteraciones = [];
            let x = x0;
            let y = y0;

            iteraciones.push({
                n: 0,
                x: x.toFixed(4),
                y: y.toFixed(6),
                k1: '-',
                y_next: y.toFixed(6)
            });

            let n = 0;
            const maxIter = 1000;
            const epsilon = h * 0.01; // Tolerancia para comparación

            while (n < maxIter) {
                // Verificar si llegamos al punto final
                if ((xf >= x0 && x >= xf - epsilon) || (xf < x0 && x <= xf + epsilon)) {
                    break;
                }

                // Paso 1: evaluar f(xn, yn) y calcular k1
                const f_n = evaluarExpresion(customInput.equation, x, y);
                const k1 = h * f_n;

                // Paso 2: calcular punto medio
                const x_medio = x + h / 2;
                const y_medio = y + k1 / 2;

                // Paso 3: evaluar f en el punto medio
                const f_medio = evaluarExpresion(customInput.equation, x_medio, y_medio);

                // Paso 4: calcular y_next
                const y_next = y + h * f_medio;

                iteraciones.push({
                    n: n + 1,
                    x: x.toFixed(4),
                    y: y.toFixed(8),
                    f_n: f_n.toFixed(8),
                    k1: k1.toFixed(8),
                    x_medio: x_medio.toFixed(4),
                    y_medio: y_medio.toFixed(8),
                    f_medio: f_medio.toFixed(8),
                    y_next: y_next.toFixed(8),
                    x_next: (x + h).toFixed(4)
                });

                x += h;
                y = y_next;
                n++;
            }

            setCustomResult({
                iteraciones,
                resultado_final: y.toFixed(8),
                x_final: x.toFixed(4)
            });
        } catch (error) {
            alert('Error al resolver: ' + error.message);
        }
    };

    const ejemploIteraciones = resolverEjemplo();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6">
                    <Link href="/runge-kutta/presentacion">
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
                            Ver Presentación
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Calculator className="w-12 h-12 text-indigo-600" />
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800">Método de Runge-Kutta</h1>
                            <p className="text-gray-600">Orden 2 - Resolución de EDO's</p>
                        </div>
                    </div>

                    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                        <h2 className="font-semibold text-indigo-900 mb-2">Fórmula del Método:</h2>
                        <div className="font-mono text-sm space-y-2 text-gray-700">
                            <div><Latex>{`$k_1 = h \\cdot f(x_n, y_n)$`}</Latex></div>
                            <div><Latex>{`$y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2})$`}</Latex></div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('ejemplo')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'ejemplo'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Problema Resuelto
                        </button>
                        <button
                            onClick={() => setActiveTab('calculadora')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'calculadora'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Calculadora Personalizada
                        </button>
                    </div>

                    {/* Contenido del Ejemplo */}
                    {activeTab === 'ejemplo' && (
                        <div className="p-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Problema:</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p className="font-mono text-lg"><Latex>{`$f(x, y(x)) = y' = -3x^2y$`}</Latex></p>
                                    <p>Condiciones iniciales: <Latex>{`$y(0) = 3$`}</Latex></p>
                                    <p>Dominio: <Latex>{`$0 \\leq x \\leq 0.5$`}</Latex></p>
                                    <p>Paso: <Latex>{`$h = 0.1$`}</Latex></p>
                                    <p className="font-semibold text-indigo-600 mt-3">Hallar: <Latex>{`$y(0.5)$`}</Latex></p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Ordenada Genérica:</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="font-mono text-sm space-y-2">
                                        <p><Latex>{`$k_1 = h \\cdot f(x_n, y_n) = h \\cdot (-3x_n^2 \\cdot y_n)$`}</Latex></p>
                                        <p><Latex>{`$y_{n+1} = y_n + h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2})$`}</Latex></p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-4">Iteraciones:</h3>

                            {ejemploIteraciones.slice(1).map((iter, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-4 border border-indigo-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ChevronRight className="text-indigo-600" />
                                        <h4 className="text-lg font-bold text-indigo-900">Iteración {iter.n}: <Latex>{`$n = ${iter.n - 1}$`}</Latex></h4>
                                    </div>

                                    <div className="space-y-3 text-gray-700">
                                        <div className="bg-white p-3 rounded border border-indigo-100">
                                            <p className="font-semibold text-indigo-700">Valores iniciales:</p>
                                            <p className="font-mono ml-4"><Latex>{`$x_{${iter.n - 1}} = ${iter.x}$`}</Latex></p>
                                            <p className="font-mono ml-4"><Latex>{`$y_{${iter.n - 1}} = ${iter.y}$`}</Latex></p>
                                        </div>

                                        <div className="bg-white p-3 rounded border border-indigo-100">
                                            <p className="font-semibold text-indigo-700">Paso 1: Calcular <Latex>{`$k_1$`}</Latex></p>
                                            <p className="font-mono ml-4 text-sm"><Latex>{`$f(x_{${iter.n - 1}}, y_{${iter.n - 1}}) = ${iter.f_n}$`}</Latex></p>
                                            <p className="font-mono ml-4 text-sm"><Latex>{`$k_1 = ${iter.k1_calc}$`}</Latex></p>
                                            <p className="font-mono ml-4"><Latex>{`$k_1 = ${iter.k1}$`}</Latex></p>
                                        </div>

                                        <div className="bg-white p-3 rounded border border-indigo-100">
                                            <p className="font-semibold text-indigo-700">Paso 2: Calcular punto medio</p>
                                            <p className="font-mono ml-4"><Latex>{`$x_{\\text{medio}} = ${iter.x} + \\frac{${ejemploData.h}}{2} = ${iter.x_medio}$`}</Latex></p>
                                            <p className="font-mono ml-4"><Latex>{`$y_{\\text{medio}} = ${iter.y} + \\frac{${iter.k1}}{2} = ${iter.y_medio}$`}</Latex></p>
                                        </div>

                                        <div className="bg-white p-3 rounded border border-indigo-100">
                                            <p className="font-semibold text-indigo-700">Paso 3: Evaluar <Latex>{`$f$`}</Latex> en el punto medio</p>
                                            <p className="font-mono ml-4 text-sm"><Latex>{`$f(${iter.x_medio}, ${iter.y_medio}) = ${iter.f_medio_calc}$`}</Latex></p>
                                            <p className="font-mono ml-4"><Latex>{`$f_{\\text{medio}} = ${iter.f_medio}$`}</Latex></p>
                                        </div>

                                        <div className="bg-indigo-100 p-3 rounded border-2 border-indigo-300">
                                            <p className="font-semibold text-indigo-900">Paso 4: Calcular <Latex>{`$y_{n+1}$`}</Latex></p>
                                            <p className="font-mono ml-4 text-sm"><Latex>{`$y_{${iter.n}} = ${iter.y} + ${ejemploData.h} \\times ${iter.f_medio}$`}</Latex></p>
                                            <p className="font-mono ml-4 text-xl font-bold text-indigo-700"><Latex>{`$y_{${iter.n}} = ${iter.y_next}$`}</Latex></p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mt-6">
                                <h3 className="text-2xl font-bold text-green-800 mb-2">Resultado Final:</h3>
                                <p className="text-xl font-mono">
                                    <Latex>{`$y(0.5) = ${ejemploIteraciones[ejemploIteraciones.length - 1].y_next}$`}</Latex>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Contenido de la Calculadora */}
                    {activeTab === 'calculadora' && (
                        <div className="p-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Instrucciones:</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                                    <li>Ingrese la ecuación diferencial como expresión de x e y</li>
                                    <li>Use ^ para potencias (ejemplo: x^2) o * para multiplicación</li>
                                    <li>Operadores disponibles: +, -, *, /, ^</li>
                                    <li>Funciones: sin, cos, tan, exp, log, sqrt</li>
                                    <li>Ejemplo: 2*x*y o -3*x^2*y o x + y</li>
                                </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ecuación Diferencial <Latex>{`$f(x,y)$`}</Latex>:
                                    </label>
                                    <input
                                        type="text"
                                        value={customInput.equation}
                                        onChange={(e) => setCustomInput({ ...customInput, equation: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ejemplo: 2*x*y"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Paso <Latex>{`$h$`}</Latex>:
                                    </label>
                                    <input
                                        type="text"
                                        value={customInput.h}
                                        onChange={(e) => setCustomInput({ ...customInput, h: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="0.1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Latex>{`$x_0$`}</Latex> (valor inicial):
                                    </label>
                                    <input
                                        type="text"
                                        value={customInput.x0}
                                        onChange={(e) => setCustomInput({ ...customInput, x0: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Latex>{`$y_0$`}</Latex> (condición inicial):
                                    </label>
                                    <input
                                        type="text"
                                        value={customInput.y0}
                                        onChange={(e) => setCustomInput({ ...customInput, y0: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Latex>{`$x_f$`}</Latex> (valor final):
                                    </label>
                                    <input
                                        type="text"
                                        value={customInput.xf}
                                        onChange={(e) => setCustomInput({ ...customInput, xf: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="1.3"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={resolverPersonalizado}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Calculator className="w-5 h-5" />
                                Resolver Ecuación
                            </button>

                            {customResult && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Resultados:</h3>

                                    {customResult.iteraciones.slice(1).map((iter, idx) => (
                                        <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 mb-3 border border-gray-300">
                                            <h4 className="font-bold text-indigo-900 mb-3">Iteración {iter.n} (<Latex>{`$n = ${iter.n - 1}$`}</Latex>):</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="bg-white p-2 rounded">
                                                    <p className="font-semibold text-gray-700">Valores iniciales:</p>
                                                    <p className="font-mono ml-4"><Latex>{`$x_{${iter.n - 1}} = ${iter.x}$`}</Latex></p>
                                                    <p className="font-mono ml-4"><Latex>{`$y_{${iter.n - 1}} = ${iter.y}$`}</Latex></p>
                                                </div>

                                                <div className="bg-white p-2 rounded">
                                                    <p className="font-semibold text-gray-700">Paso 1: Calcular <Latex>{`$k_1$`}</Latex></p>
                                                    <p className="font-mono ml-4"><Latex>{`$f(x_{${iter.n - 1}}, y_{${iter.n - 1}}) = ${iter.f_n}$`}</Latex></p>
                                                    <p className="font-mono ml-4"><Latex>{`$k_1 = h \\times f = ${customInput.h} \\times ${iter.f_n} = ${iter.k1}$`}</Latex></p>
                                                </div>

                                                <div className="bg-white p-2 rounded">
                                                    <p className="font-semibold text-gray-700">Paso 2: Punto medio</p>
                                                    <p className="font-mono ml-4"><Latex>{`$x_{\\text{medio}} = ${iter.x_medio}$`}</Latex></p>
                                                    <p className="font-mono ml-4"><Latex>{`$y_{\\text{medio}} = ${iter.y_medio}$`}</Latex></p>
                                                </div>

                                                <div className="bg-white p-2 rounded">
                                                    <p className="font-semibold text-gray-700">Paso 3: Evaluar en punto medio</p>
                                                    <p className="font-mono ml-4"><Latex>{`$f_{\\text{medio}} = ${iter.f_medio}$`}</Latex></p>
                                                </div>

                                                <div className="bg-indigo-100 p-2 rounded border-2 border-indigo-400">
                                                    <p className="font-semibold text-indigo-900">Resultado:</p>
                                                    <p className="font-mono ml-4 text-lg font-bold text-indigo-700"><Latex>{`$y_{${iter.n}} = ${iter.y_next}$`}</Latex></p>
                                                    <p className="font-mono ml-4 text-sm text-gray-600"><Latex>{`$x_{${iter.n}} = ${iter.x_next}$`}</Latex></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mt-4">
                                        <h3 className="text-2xl font-bold text-green-800 mb-2">Resultado Final:</h3>
                                        <p className="text-xl font-mono">
                                            <Latex>{`$y(${customResult.x_final}) \\approx ${customResult.resultado_final}$`}</Latex>
                                        </p>
                                    </div>
                                </div>
                                
                            )}
                        </div>
                        
                    )}
                </div>
                <div className="text-center mt-6">
                    <Link href="/runge-kutta/compare">
                        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
                            Ejercicio 2
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IndexScreen;