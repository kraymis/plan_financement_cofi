'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function ScenariosSection() {
  const [activeTab, setActiveTab] = useState<'realiste' | 'optimiste' | 'pessimiste'>('realiste')

  const scenarios = {
    realiste: {
      badge: { label: 'Scénario de base', color: 'bg-[#ECFDF5] text-[#065F46]' },
      caf2: 700000,
      caf3: 900000,
      soldes: [50000, 50000, 100000],
      soldesFinal: 200000,
      status: '✓ Plan équilibré — viable',
      statusColor: 'bg-[#ECFDF5] border-[#6EE7B7] text-[#065F46]',
    },
    optimiste: {
      badge: { label: 'Meilleur cas', color: 'bg-[#EEF2FF] text-[#4338CA]' },
      caf2: 900000,
      caf3: 1200000,
      soldes: [50000, 250000, 400000],
      soldesFinal: 700000,
      status: '✓ Plan très favorable — mais attention à ne pas surestimer',
      statusColor: 'bg-[#EEF2FF] border-[#C7D2FE] text-[#4338CA]',
    },
    pessimiste: {
      badge: { label: 'Pire cas', color: 'bg-[#FEF2F2] text-[#991B1B]' },
      caf2: 500000,
      caf3: 600000,
      soldes: [50000, -100000, -150000],
      soldesFinal: -200000,
      status: '✗ Plan critique — révision nécessaire',
      statusColor: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]',
    },
  }

  const current = scenarios[activeTab]

  const chartData = [
    { scenario: 'Pessimiste', cumulé: -250000, fill: '#dc2626' },
    { scenario: 'Réaliste', cumulé: 200000, fill: '#22c55e' },
    { scenario: 'Optimiste', cumulé: 700000, fill: '#0284c7' },
  ]

  return (
    <section id="scenarios" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="section-label label-simulation">Simulation</span>
        </div>
        <h2 className="section-title">Analyse de scénarios — Boutique STYLE & CO</h2>
        <p className="section-subtitle">
          Le conseil n°1 : construisez toujours 3 scénarios avant de vous engager.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['realiste', 'optimiste', 'pessimiste'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-[10px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-[#E2E8F0] text-[#64748B] hover:bg-[#CBD5E1]'
              }`}
            >
              {tab === 'realiste' ? 'Réaliste' : tab === 'optimiste' ? 'Optimiste' : 'Pessimiste'}
            </button>
          ))}
        </div>

        {/* Badge */}
        <div className="mb-6">
          <Badge className={`${current.badge.color}`}>{current.badge.label}</Badge>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-8 rounded-[16px]">
          <table className="w-full border-collapse bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden">
            <thead className="bg-[#0F172A] text-white border-b border-[#E2E8F0]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-[0.04em]">Scénario {activeTab === 'realiste' ? 'Réaliste' : activeTab === 'optimiste' ? 'Optimiste' : 'Pessimiste'}</th>
                <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-[0.04em]">Année 1</th>
                <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-[0.04em]">Année 2</th>
                <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-[0.04em]">Année 3</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E2E8F0] odd:bg-white even:bg-[#F8FAFC]">
                <td className="px-4 py-3 text-[#0F172A] font-semibold">Emplois</td>
                <td className="px-4 py-3 text-right text-[#334155]">2 850 000</td>
                <td className="px-4 py-3 text-right text-[#334155]">650 000</td>
                <td className="px-4 py-3 text-right text-[#334155]">800 000</td>
              </tr>
              <tr className="border-b border-[#E2E8F0] odd:bg-white even:bg-[#F8FAFC]">
                <td className="px-4 py-3 text-[#0F172A] font-semibold">CAF</td>
                <td className="px-4 py-3 text-right text-[#334155]">0</td>
                <td className="px-4 py-3 text-right text-[#6366F1] font-bold">{(current.caf2 / 1000).toFixed(0)}k</td>
                <td className="px-4 py-3 text-right text-[#6366F1] font-bold">{(current.caf3 / 1000).toFixed(0)}k</td>
              </tr>
              <tr className={`font-semibold ${current.soldes[0] >= 0 ? 'bg-[#ECFDF5]' : 'bg-[#FEF2F2]'}`}>
                <td className={`px-4 py-3 ${current.soldes[0] >= 0 ? 'text-[#065F46]' : 'text-[#991B1B]'}`}>Solde annuel</td>
                <td className={`px-4 py-3 text-right ${current.soldes[0] >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {current.soldes[0] >= 0 ? '+' : ''}{(current.soldes[0] / 1000).toFixed(0)}k
                </td>
                <td className={`px-4 py-3 text-right ${current.soldes[1] >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {current.soldes[1] >= 0 ? '+' : ''}{(current.soldes[1] / 1000).toFixed(0)}k
                </td>
                <td className={`px-4 py-3 text-right ${current.soldes[2] >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {current.soldes[2] >= 0 ? '+' : ''}{(current.soldes[2] / 1000).toFixed(0)}k
                </td>
              </tr>
              <tr className={`font-semibold ${current.soldesFinal >= 0 ? 'bg-[#ECFDF5]' : 'bg-[#FEF2F2]'}`}>
                <td className={`px-4 py-3 ${current.soldesFinal >= 0 ? 'text-[#065F46]' : 'text-[#991B1B]'}`}>Solde cumulé (Année 3)</td>
                <td colSpan={3} className={`px-4 py-3 text-right ${current.soldesFinal >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {current.soldesFinal >= 0 ? '+' : ''}{(current.soldesFinal / 1000).toFixed(0)}k DA
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Status Banner */}
        <div className={`border-2 rounded-[12px] p-4 mb-8 text-center font-semibold text-sm ${current.statusColor}`}>
          {current.status}
        </div>

        {/* Comparison Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Comparaison du solde cumulé final selon le scénario</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${(value / 1000).toFixed(0)}k DA`}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="cumulé" fill="#6366F1" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="cumulé" fill={entry.fill === '#dc2626' ? '#EF4444' : entry.fill === '#22c55e' ? '#10B981' : '#6366F1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Advice Box */}
        <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-[12px] p-4">
          <p className="text-sm text-[#92400E]">
            <span className="font-semibold">Conseil :</span> En cas d&apos;incertitude, dimensionnez votre plan sur le scénario réaliste et vérifiez que le scénario pessimiste ne génère pas de solde négatif deux années consécutives.
          </p>
        </div>
      </div>
    </section>
  )
}
