'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function SoldeTimeline() {
  const data = [
    { year: 'Année 1', cumulé: 50000, formula: 'Cumulé = +50 000' },
    { year: 'Année 2', cumulé: 100000, formula: 'Cumulé = 50 000 + 50 000' },
    { year: 'Année 3', cumulé: 200000, formula: 'Cumulé = 100 000 + 100 000' },
  ]

  const annotations = [
    'Premier excédent — lancement réussi',
    'La CAF prend le relais des apports externes',
    'Réserve financière solide constituée',
  ]

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Progression du solde cumulé — STYLE & CO</h3>

      {/* Timeline */}
      <div className="mb-8">
        <div className="flex items-end justify-between gap-4">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1">
              <div className="flex flex-col items-center">
                {/* Node */}
                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-md mb-4"></div>

                {/* Value */}
                <div className="text-center mb-4">
                  <div className="font-bold text-green-700">+{(item.cumulé / 1000).toFixed(0)}k</div>
                  <div className="text-xs text-gray-600">{item.year}</div>
                </div>

                {/* Annotation */}
                <div className="text-xs text-gray-600 text-center mb-3 px-2">{annotations[idx]}</div>

                {/* Formula */}
                <div className="text-xs text-gray-500 font-mono text-center bg-gray-50 p-2 rounded w-full">
                  {item.formula}
                </div>
              </div>

              {/* Connector line */}
              {idx < data.length - 1 && (
                <div className="absolute left-0 right-0 h-1 bg-green-300 top-12" style={{ width: '33%', marginLeft: `${(idx * 33) + 18}%` }}></div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline line */}
        <div className="relative h-1 bg-green-300 mt-2"></div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCumulé" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip
              formatter={(value) => `${(value / 1000).toFixed(0)}k DA`}
              labelFormatter={(label) => `${label}`}
            />
            <Area type="monotone" dataKey="cumulé" stroke="#22c55e" fillOpacity={1} fill="url(#colorCumulé)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-600 text-center mt-4">
        <span className="font-semibold">Courbe du solde cumulé</span> — STYLE & CO
      </p>
    </div>
  )
}
