import React from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import Latex from 'react-latex-next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompareScreen = () => {
  // Datos del ejercicio
  const x0 = 1;
  const y0 = 2;
  const xf = 1.5;
  const h = 0.1;
  const f = (x: number, y: number) => 4 * x + y;

  // Resolver RK2 (Punto Medio) paso a paso
  const resolverPuntoMedio = () => {
    let x = x0;
    let y = y0;
    const iteraciones = [{ n: 0, x, y }];
    
    while (x < xf - 0.0001) {
      const k1 = h * f(x, y);
      const x_m = x + h / 2;
      const y_m = y + k1 / 2;
      const k2 = h * f(x_m, y_m);
      const y_next = y + k2;
      iteraciones.push({ n: iteraciones.length, x: x + h, y: y_next, k1, k2, x_m, y_m });
      x += h;
      y = y_next;
    }
    
    return iteraciones;
  };

  const rk2Iter = resolverPuntoMedio();

  // Datos para gráfica
  const data = {
    labels: rk2Iter.map(i => i.x.toFixed(3)),
    datasets: [
      {
        label: 'Punto Medio (RK2)',
        data: rk2Iter.map(i => i.y),
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.3)',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <Link href="/runge-kutta">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform">
              Volver al Ejercicio
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Resolución con RK2 (Punto Medio)</h1>
          <p className="text-gray-600 mb-4">
            Ecuación: <Latex>{`$y' = 4x + y$`}</Latex>, <Latex>{`$y(1) = 2$`}</Latex>, paso <Latex>{`$h = ${h}$`}</Latex>
          </p>

          {/* Gráfica */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <Line data={data} />
          </div>

          {/* Iteraciones RK2 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">Iteraciones Punto Medio (RK2)</h2>
            {rk2Iter.slice(1).map(iter => (
              <div key={iter.n} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                <p className="font-bold text-lg mb-2">Iteración {iter.n}:</p>
                <div className="space-y-2 text-sm">
                  <p><Latex>{`$x_n = ${(iter.x - h).toFixed(4)},\\quad y_n = ${rk2Iter[iter.n - 1].y.toFixed(6)}$`}</Latex></p>
                  <p><Latex>{`$k_1 = h \\cdot f(x_n, y_n) = ${iter.k1.toFixed(6)}$`}</Latex></p>
                  <p><Latex>{`$x_{\\text{medio}} = ${iter.x_m.toFixed(4)},\\quad y_{\\text{medio}} = ${iter.y_m.toFixed(6)}$`}</Latex></p>
                  <p><Latex>{`$k_2 = h \\cdot f(x_{\\text{medio}}, y_{\\text{medio}}) = ${iter.k2.toFixed(6)}$`}</Latex></p>
                  <p className="font-semibold text-blue-800 text-base">
                    <Latex>{`$y_{n+1} = y_n + k_2 = ${iter.y.toFixed(6)}$`}</Latex>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resultado final */}
          <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mt-4">
            <h3 className="text-2xl font-bold text-green-800 mb-2">Resultado Final</h3>
            <p className="text-xl font-mono">
              <Latex>{`$y(${xf}) \\approx ${rk2Iter[rk2Iter.length -1].y.toFixed(6)}$`}</Latex>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareScreen;