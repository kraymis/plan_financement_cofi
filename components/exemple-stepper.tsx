'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ExempleStepper() {
  const [step, setStep] = useState(1)

  const totalSteps = 6

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Saisie des emplois — Année 1</h3>
            <div className="space-y-4">
              {[
                { item: 'Loyer caution', value: 500000, desc: '3 mois de caution pour le local commercial' },
                { item: 'Équipement & mobilier', value: 1200000, desc: 'Rayonnages, cabines, système de caisse' },
                { item: 'Stock initial', value: 800000, desc: 'Première commande de marchandises' },
                { item: 'Frais de constitution', value: 50000, desc: 'Immatriculation, frais juridiques' },
                { item: 'BFR', value: 300000, desc: 'Décalage entre paiements fournisseurs et encaissements ventes' },
              ].map((row, idx) => (
                <div key={idx} className="card-feature">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{row.item}</p>
                      <p className="text-sm text-gray-600">{row.desc}</p>
                    </div>
                    <p className="font-bold text-gray-900 whitespace-nowrap">{(row.value / 1000000).toFixed(1)}M DA</p>
                  </div>
                </div>
              ))}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 font-bold text-blue-900">
                Total Emplois Année 1 = 2 850 000 DA
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Saisie des ressources — Année 1</h3>
            <div className="space-y-4">
              {[
                { item: 'Capital propre', value: 1500000, desc: 'Apport personnel de Mme BENSAID' },
                { item: 'Emprunt bancaire', value: 1000000, desc: 'Crédit sur 5 ans' },
                { item: 'Subvention ANSEJ', value: 400000, desc: 'Aide sans remboursement' },
              ].map((row, idx) => (
                <div key={idx} className="card-feature">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{row.item}</p>
                      <p className="text-sm text-gray-600">{row.desc}</p>
                    </div>
                    <p className="font-bold text-gray-900 whitespace-nowrap">{(row.value / 1000000).toFixed(1)}M DA</p>
                  </div>
                </div>
              ))}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 font-bold text-green-900">
                Total Ressources Année 1 = 2 900 000 DA
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Calcul du solde — Année 1</h3>
            <div className="space-y-4">
              <div className="formula-box">
                Solde = Total Ressources − Total Emplois
              </div>
              <div className="formula-box">
                Solde = 2 900 000 − 2 850 000 = +50 000 DA ✓
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="font-bold text-green-900">Équilibre respecté pour l&apos;Année 1</p>
              </div>
              <p className="text-gray-600">
                Le solde positif indique que les ressources couvrent parfaitement les emplois, avec un léger excédent.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Années 2 et 3 — La CAF prend le relais</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white border border-gray-300 text-sm">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-3 py-2 text-left font-bold text-gray-900">Ligne</th>
                    <th className="px-3 py-2 text-right font-bold text-gray-900">A2</th>
                    <th className="px-3 py-2 text-right font-bold text-gray-900">A3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 text-gray-700">Emplois</td>
                    <td className="px-3 py-2 text-right text-gray-700">650 000</td>
                    <td className="px-3 py-2 text-right text-gray-700">800 000</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-yellow-50">
                    <td className="px-3 py-2 text-yellow-900 font-bold">CAF</td>
                    <td className="px-3 py-2 text-right text-yellow-900 font-bold">700 000</td>
                    <td className="px-3 py-2 text-right text-yellow-900 font-bold">900 000</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-green-50">
                    <td className="px-3 py-2 text-green-900 font-bold">Solde</td>
                    <td className="px-3 py-2 text-right text-green-900 font-bold">+50 000</td>
                    <td className="px-3 py-2 text-right text-green-900 font-bold">+100 000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-feature bg-blue-50 border-blue-200">
              <p className="text-gray-800">
                À partir de l&apos;Année 2, l&apos;entreprise n&apos;a plus besoin d&apos;apports externes. <span className="font-bold">La CAF générée par l&apos;activité finance elle-même les besoins.</span> C&apos;est le signe d&apos;une entreprise mature.
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Solde cumulé — vision globale</h3>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { year: 'A1', cumulé: 50000 },
                  { year: 'A2', cumulé: 100000 },
                  { year: 'A3', cumulé: 200000 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k DA`} />
                  <Line type="monotone" dataKey="cumulé" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div className="card-feature">
                <p className="text-gray-700">
                  <span className="font-bold">Année 1:</span> +50 000 DA (lancement)
                </p>
              </div>
              <div className="card-feature">
                <p className="text-gray-700">
                  <span className="font-bold">Année 2:</span> +100 000 DA (croissance confirmée)
                </p>
              </div>
              <div className="card-feature">
                <p className="text-gray-700">
                  <span className="font-bold">Année 3:</span> +200 000 DA (double des apports initiaux)
                </p>
              </div>
            </div>
            <div className="card-feature bg-green-50 border-green-200 mt-4">
              <p className="text-gray-800">
                <span className="font-bold">Le solde cumulé croissant confirme</span> que la boutique constitue progressivement une réserve financière solide.
              </p>
            </div>
          </div>
        )

      case 6:
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Analyse finale</h3>
            <div className="space-y-4 mb-6">
              <div className="card-feature border-l-4 border-green-600">
                <p className="font-bold text-green-900">✓ Règle 1 — Équilibre annuel</p>
                <p className="text-sm text-gray-600 mt-1">Tous les soldes annuels sont positifs (+50K, +50K, +100K)</p>
              </div>
              <div className="card-feature border-l-4 border-green-600">
                <p className="font-bold text-green-900">✓ Règle 2 — Solde cumulé croissant</p>
                <p className="text-sm text-gray-600 mt-1">+50K → +100K → +200K (progression forte)</p>
              </div>
              <div className="card-feature border-l-4 border-green-600">
                <p className="font-bold text-green-900">✓ Règle 3 — Structure de financement</p>
                <p className="text-sm text-gray-600 mt-1">Capital propre = 1 500 000 / Total emplois = 4 300 000 = 34,9% ≥ 30% ✓</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-6">
              <p className="font-bold text-green-900 text-lg">Plan équilibré — La boutique STYLE & CO est financièrement viable.</p>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <a href="/calculateur">Tester avec mes propres données →</a>
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Étape {step} sur {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Dots */}
      <div className="flex justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx + 1)}
            className={`w-10 h-10 rounded-full font-bold transition-colors ${
              step === idx + 1
                ? 'bg-blue-600 text-white'
                : step > idx + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step > idx + 1 ? '✓' : idx + 1}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card-feature bg-white border-2 border-gray-200 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <Button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          variant="outline"
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Étape précédente
        </Button>
        <Button
          onClick={() => setStep(Math.min(totalSteps, step + 1))}
          disabled={step === totalSteps}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Étape suivante
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
