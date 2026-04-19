'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, Minus } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

// Exemple STYLE & CO data
const EXAMPLE_DATA = {
  emplois: {
    investissements: [500000, 0, 0],
    stock: [800000, 300000, 300000],
    frais: [50000, 0, 0],
    bfr: [300000, 150000, 100000],
    remboursement: [0, 200000, 200000],
  },
  ressources: {
    capital: [1500000, 0, 0],
    emprunt: [1000000, 0, 0],
    caf: [0, 700000, 900000],
    subvention: [400000, 0, 0],
  },
  caf_detail: {
    resultat: [0, 500000, 700000],
    amortissements: [0, 200000, 200000],
  },
}

export default function Calculateur() {
  // Auxiliary calculators
  const [bfrStocks, setBfrStocks] = useState(0)
  const [bfrCreances, setBfrCreances] = useState(0)
  const [bfrDettes, setBfrDettes] = useState(0)
  const [bfrResult, setBfrResult] = useState(0)

  const [cafResults, setCafResults] = useState([0, 0, 0])

  // Main table inputs
  const [emplois, setEmplois] = useState({
    investissements: [0, 0, 0],
    stock: [0, 0, 0],
    frais: [0, 0, 0],
    bfr: [0, 0, 0],
    remboursement: [0, 0, 0],
  })

  const [ressources, setRessources] = useState({
    capital: [0, 0, 0],
    emprunt: [0, 0, 0],
    caf: [0, 0, 0],
    subvention: [0, 0, 0],
  })

  // Calculations
  const calculateBFR = () => {
    const result = bfrStocks + bfrCreances - bfrDettes
    setBfrResult(result)
  }

  const useBFR = () => {
    setEmplois((prev) => ({
      ...prev,
      bfr: [bfrResult, bfrResult, bfrResult],
    }))
  }

  const calculateCAF = (index: number, resultat: number, amortissements: number) => {
    const result = resultat + amortissements
    setCafResults((prev) => {
      const newResults = [...prev]
      newResults[index] = result
      return newResults
    })
  }

  const useCAF = () => {
    setRessources((prev) => ({
      ...prev,
      caf: cafResults,
    }))
  }

  const loadExample = () => {
    setEmplois(EXAMPLE_DATA.emplois)
    setRessources(EXAMPLE_DATA.ressources)
    setCafResults([0, 700000, 900000])
  }

  // Calculate totals
  const calculateTotals = () => {
    const emploisArray = Object.values(emplois)
    const ressourcesArray = Object.values(ressources)

    const emploisTotals = [0, 1, 2].map((year) =>
      emploisArray.reduce((sum, arr) => sum + (arr[year] || 0), 0)
    )

    const ressourcesTotals = [0, 1, 2].map((year) =>
      ressourcesArray.reduce((sum, arr) => sum + (arr[year] || 0), 0)
    )

    const soldes = [0, 1, 2].map((year) => ressourcesTotals[year] - emploisTotals[year])

    const soldesCumules = [
      soldes[0],
      soldes[0] + soldes[1],
      soldes[0] + soldes[1] + soldes[2],
    ]

    return {
      emploisTotals,
      ressourcesTotals,
      soldes,
      soldesCumules,
      totalEmplois: emploisTotals.reduce((a, b) => a + b, 0),
      totalRessources: ressourcesTotals.reduce((a, b) => a + b, 0),
    }
  }

  const totals = calculateTotals()

  // Analysis rules
  const rule1 = totals.soldes.every((s) => s >= 0)
  const rule2 = totals.soldesCumules[0] < totals.soldesCumules[1] && totals.soldesCumules[1] < totals.soldesCumules[2]
  const rule3 = totals.totalEmplois > 0 && (totals.totalRessources / totals.totalEmplois) >= 0.3

  const allRulesPassed = rule1 && rule2 && rule3

  const formatDA = (value: number) => {
    return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 })
  }

  const InputCell = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <Input
      type="number"
      value={value || ''}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      className="w-full text-right text-xs sm:text-sm p-1 h-8 font-mono"
    />
  )

  const chartData = [
    {
      year: 'Année 1',
      emplois: totals.emploisTotals[0],
      ressources: totals.ressourcesTotals[0],
    },
    {
      year: 'Année 2',
      emplois: totals.emploisTotals[1],
      ressources: totals.ressourcesTotals[1],
    },
    {
      year: 'Année 3',
      emplois: totals.emploisTotals[2],
      ressources: totals.ressourcesTotals[2],
    },
  ]

  const lineChartData = [
    { year: 'Année 1', solde: totals.soldesCumules[0] },
    { year: 'Année 2', solde: totals.soldesCumules[1] },
    { year: 'Année 3', solde: totals.soldesCumules[2] },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="section-title">Calculateur — Plan de Financement</h1>
          <p className="section-subtitle">
            Saisissez vos données pour générer votre plan et obtenir une analyse automatique.
          </p>
        </div>

        {/* PART A — Auxiliary Calculators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* BFR Calculator */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Calculateur BFR</h3>
            <div className="formula-box mb-4">
              BFR = Stocks + Créances clients − Dettes fournisseurs
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Stocks (DA)</label>
                <Input
                  type="number"
                  value={bfrStocks || ''}
                  onChange={(e) => setBfrStocks(parseInt(e.target.value) || 0)}
                  className="w-full mt-1"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Créances clients (DA)</label>
                <Input
                  type="number"
                  value={bfrCreances || ''}
                  onChange={(e) => setBfrCreances(parseInt(e.target.value) || 0)}
                  className="w-full mt-1"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Dettes fournisseurs (DA)</label>
                <Input
                  type="number"
                  value={bfrDettes || ''}
                  onChange={(e) => setBfrDettes(parseInt(e.target.value) || 0)}
                  className="w-full mt-1"
                  placeholder="0"
                />
              </div>
            </div>
            <button onClick={calculateBFR} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg mb-3">
              Calculer
            </button>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center font-bold text-blue-900 mb-3">
              BFR = {formatDA(bfrResult)} DA
            </div>
            <Button onClick={useBFR} variant="outline" className="w-full">
              Utiliser ce BFR dans le tableau
            </Button>
          </Card>

          {/* CAF Calculator */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Calculateur CAF</h3>
            <div className="formula-box mb-4">
              CAF = Résultat net + Dotations aux amortissements
            </div>
            <div className="space-y-4 mb-4">
              {[0, 1, 2].map((year) => (
                <div key={year} className="border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Année {year + 1}</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      type="number"
                      placeholder="Résultat net"
                      defaultValue={EXAMPLE_DATA.caf_detail.resultat[year]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0
                        const amort = EXAMPLE_DATA.caf_detail.amortissements[year]
                        calculateCAF(year, val, amort)
                      }}
                      className="text-sm h-8"
                    />
                    <Input
                      type="number"
                      placeholder="Amortissements"
                      defaultValue={EXAMPLE_DATA.caf_detail.amortissements[year]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0
                        const result = EXAMPLE_DATA.caf_detail.resultat[year]
                        calculateCAF(year, result, val)
                      }}
                      className="text-sm h-8"
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-600 text-right">
                    CAF = {formatDA(cafResults[year])} DA
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={useCAF} variant="outline" className="w-full">
              Utiliser ces CAF dans le tableau
            </Button>
          </Card>
        </div>

        {/* PART B — Main Table */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Saisie du tableau principal</h3>
            <Button onClick={loadExample} variant="outline" size="sm">
              Charger l'exemple STYLE & CO
            </Button>
          </div>

          {/* EMPLOIS */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead className="bg-red-100">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-red-900">EMPLOIS</th>
                  <th className="px-4 py-2 text-right font-bold text-red-900">Année 1</th>
                  <th className="px-4 py-2 text-right font-bold text-red-900">Année 2</th>
                  <th className="px-4 py-2 text-right font-bold text-red-900">Année 3</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(emplois).map(([key, values]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="px-4 py-2 font-medium text-gray-700 capitalize">
                      {key === 'investissements' && 'Investissements'}
                      {key === 'stock' && 'Stock de marchandises'}
                      {key === 'frais' && 'Frais de constitution'}
                      {key === 'bfr' && 'BFR'}
                      {key === 'remboursement' && 'Remboursement emprunt'}
                    </td>
                    {[0, 1, 2].map((year) => (
                      <td key={year} className="px-4 py-2">
                        <InputCell
                          value={values[year]}
                          onChange={(val) =>
                            setEmplois((prev) => ({
                              ...prev,
                              [key]: prev[key as keyof typeof prev].map((v, i) => (i === year ? val : v)),
                            }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RESSOURCES */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-green-900">RESSOURCES</th>
                  <th className="px-4 py-2 text-right font-bold text-green-900">Année 1</th>
                  <th className="px-4 py-2 text-right font-bold text-green-900">Année 2</th>
                  <th className="px-4 py-2 text-right font-bold text-green-900">Année 3</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ressources).map(([key, values]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="px-4 py-2 font-medium text-gray-700 capitalize">
                      {key === 'capital' && 'Capital propre'}
                      {key === 'emprunt' && 'Emprunt bancaire'}
                      {key === 'caf' && 'CAF / Autofinancement'}
                      {key === 'subvention' && 'Subventions et aides'}
                    </td>
                    {[0, 1, 2].map((year) => (
                      <td key={year} className="px-4 py-2">
                        <InputCell
                          value={values[year]}
                          onChange={(val) =>
                            setRessources((prev) => ({
                              ...prev,
                              [key]: prev[key as keyof typeof prev].map((v, i) => (i === year ? val : v)),
                            }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* PART C — Results */}
        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Résultats calculés en temps réel</h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-gray-900">Indicateurs</th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900">Année 1</th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900">Année 2</th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900">Année 3</th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 font-semibold">
                  <td className="px-4 py-2 text-gray-900">Total Emplois (A)</td>
                  {totals.emploisTotals.map((val, i) => (
                    <td key={i} className="px-4 py-2 text-right text-gray-700">
                      {formatDA(val)}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-right text-gray-900 bg-gray-100">{formatDA(totals.totalEmplois)}</td>
                </tr>
                <tr className="border-b border-gray-200 font-semibold">
                  <td className="px-4 py-2 text-gray-900">Total Ressources (B)</td>
                  {totals.ressourcesTotals.map((val, i) => (
                    <td key={i} className="px-4 py-2 text-right text-gray-700">
                      {formatDA(val)}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-right text-gray-900 bg-gray-100">{formatDA(totals.totalRessources)}</td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2 text-gray-900">Solde (B − A)</td>
                  {totals.soldes.map((val, i) => (
                    <td
                      key={i}
                      className={`px-4 py-2 text-right font-bold ${
                        val >= 0 ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {val >= 0 ? '+' : ''} {formatDA(val)}
                    </td>
                  ))}
                  <td className={`px-4 py-2 text-right font-bold ${
                    totals.soldes.reduce((a, b) => a + b, 0) >= 0 ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
                  }`}>
                    {totals.soldes.reduce((a, b) => a + b, 0) >= 0 ? '+' : ''} {formatDA(totals.soldes.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-4 py-2 text-gray-900">Solde Cumulé</td>
                  {totals.soldesCumules.map((val, i) => (
                    <td
                      key={i}
                      className={`px-4 py-2 text-right font-bold ${
                        val >= 0 ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {val >= 0 ? '+' : ''} {formatDA(val)}
                    </td>
                  ))}
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700 overflow-x-auto space-y-1">
            <p><span className="font-bold">Total Emplois Année 1</span> = {formatDA(totals.emploisTotals[0])} DA</p>
            <p><span className="font-bold">Total Ressources Année 1</span> = {formatDA(totals.ressourcesTotals[0])} DA</p>
            <p><span className="font-bold">Solde Année 1</span> = {formatDA(totals.ressourcesTotals[0])} − {formatDA(totals.emploisTotals[0])} = {totals.soldes[0] >= 0 ? '+' : ''}{formatDA(totals.soldes[0])} DA</p>
            <p><span className="font-bold">Solde Cumulé</span> = {formatDA(totals.soldesCumules[0])} → {formatDA(totals.soldesCumules[1])} → {formatDA(totals.soldesCumules[2])} DA</p>
          </div>
        </Card>

        {/* PART D — Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Emplois vs Ressources par année</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => formatDA(value as number)} />
                <Legend />
                <Bar dataKey="emplois" fill="#dc2626" name="Emplois" />
                <Bar dataKey="ressources" fill="#16a34a" name="Ressources" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Évolution du solde cumulé</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => formatDA(value as number)} />
                <ReferenceLine y={0} stroke="#ccc" strokeDasharray="5 5" />
                <Line 
                  type="monotone" 
                  dataKey="solde" 
                  stroke={totals.soldesCumules[2] >= 0 ? '#16a34a' : '#dc2626'} 
                  strokeWidth={2}
                  dot={{ fill: totals.soldesCumules[2] >= 0 ? '#16a34a' : '#dc2626' }}
                  name="Solde Cumulé"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* PART E — Analysis */}
        <Card className={`p-6 mb-8 border-l-4 ${
          allRulesPassed ? 'border-green-600 bg-green-50' : 
          rule1 && rule2 ? 'border-orange-600 bg-orange-50' : 
          'border-red-600 bg-red-50'
        }`}>
          <div className={`text-lg font-bold mb-6 ${
            allRulesPassed ? 'text-green-900' :
            rule1 && rule2 ? 'text-orange-900' :
            'text-red-900'
          }`}>
            {allRulesPassed && '✓ Plan équilibré — votre projet est financièrement viable.'}
            {!allRulesPassed && (rule1 || rule2) && '⚠ Plan à réviser — certains indicateurs nécessitent attention.'}
            {!allRulesPassed && !rule1 && !rule2 && '✗ Plan déséquilibré — refonte nécessaire avant tout engagement.'}
          </div>

          <div className="space-y-4">
            {/* Règle 1 */}
            <div className={`p-4 rounded-lg border-l-4 ${rule1 ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'}`}>
              <h4 className={`font-bold mb-2 ${rule1 ? 'text-green-900' : 'text-red-900'}`}>
                {rule1 ? '✓' : '✗'} Règle 1 — Équilibre annuel
              </h4>
              <p className="text-sm text-gray-700">
                {rule1 
                  ? 'Tous les soldes annuels sont positifs — équilibre respecté.' 
                  : `Attention : l'année ${totals.soldes.findIndex(s => s < 0) + 1} présente un solde négatif.`}
              </p>
            </div>

            {/* Règle 2 */}
            <div className={`p-4 rounded-lg border-l-4 ${rule2 ? 'bg-green-50 border-green-600' : 'bg-orange-50 border-orange-600'}`}>
              <h4 className={`font-bold mb-2 ${rule2 ? 'text-green-900' : 'text-orange-900'}`}>
                {rule2 ? '✓' : '⚠'} Règle 2 — Solde cumulé croissant
              </h4>
              <p className="text-sm text-gray-700">
                {rule2
                  ? 'Le solde cumulé est croissant — réserve financière en constitution.'
                  : 'Le solde cumulé se dégrade — révision nécessaire.'}
              </p>
            </div>

            {/* Règle 3 */}
            <div className={`p-4 rounded-lg border-l-4 ${rule3 ? 'bg-green-50 border-green-600' : 'bg-orange-50 border-orange-600'}`}>
              <h4 className={`font-bold mb-2 ${rule3 ? 'text-green-900' : 'text-orange-900'}`}>
                {rule3 ? '✓' : '⚠'} Règle 3 — Structure de financement
              </h4>
              <p className="text-sm text-gray-700">
                {totals.totalEmplois > 0
                  ? rule3
                    ? `L'apport personnel représente ${Math.round((totals.totalRessources / totals.totalEmplois) * 100)}% des besoins — structure saine.`
                    : `L'apport personnel est insuffisant (${Math.round((totals.totalRessources / totals.totalEmplois) * 100)}% < 30%) — risque bancaire.`
                  : 'Remplissez d\'abord le tableau.'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-semibold mb-2">ESI · Cours de Comptabilité et Finance · 2024–2025</p>
          <p className="text-sm">Bemmoussat Moulay Reda & Maachi Mohamed Islam Aymen</p>
        </div>
      </footer>
    </div>
  )
}
