'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function DebtRatioCalculator() {
  const [dettes, setDettes] = useState(1000000)
  const [capitaux, setCapitaux] = useState(1500000)

  const ratio = capitaux > 0 ? dettes / capitaux : 0
  const ratioFixed = ratio.toFixed(2)

  const getStatus = () => {
    if (ratio < 1) {
      return {
        badge: 'bg-green-100 text-green-800',
        text: '✓ Excellent — très faible dépendance aux dettes',
        color: 'text-green-900',
      }
    } else if (ratio < 2) {
      return {
        badge: 'bg-orange-100 text-orange-800',
        text: '⚠ Acceptable — surveiller l\'évolution',
        color: 'text-orange-900',
      }
    } else {
      return {
        badge: 'bg-red-100 text-red-800',
        text: '✗ Risqué — dettes excessives, banques réticentes',
        color: 'text-red-900',
      }
    }
  }

  const status = getStatus()

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-lg card-feature">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Calculateur — Taux d&apos;endettement</h3>

      {/* Formula */}
      <div className="formula-box mb-6">
        <p className="mb-2">Taux d&apos;endettement = Total dettes / Capitaux propres</p>
        <p className="text-xs text-gray-600">Règle : Taux d&apos;endettement &lt; 2 (dettes &lt; 2× les capitaux propres)</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total dettes (DA)</label>
          <Input
            type="number"
            value={dettes}
            onChange={(e) => setDettes(parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capitaux propres (DA)</label>
          <Input
            type="number"
            value={capitaux}
            onChange={(e) => setCapitaux(parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      </div>

      {/* Result */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-center">
        <p className="text-sm text-gray-600 mb-1">Taux d&apos;endettement</p>
        <p className="text-3xl font-bold text-gray-900">{ratioFixed}</p>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <Badge className={status.badge}>{status.text}</Badge>
      </div>

      {/* Test Button */}
      <Button
        onClick={() => {
          setDettes(1000000)
          setCapitaux(1500000)
        }}
        variant="outline"
        className="w-full"
      >
        Tester avec STYLE & CO
      </Button>
    </div>
  )
}
