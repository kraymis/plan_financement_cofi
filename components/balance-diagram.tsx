'use client'

import { useState, useEffect } from 'react'

export function BalanceDiagram() {
  const [state, setState] = useState<'equilibre' | 'surplus' | 'desequilibre'>('equilibre')

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        switch (prev) {
          case 'equilibre':
            return 'surplus'
          case 'surplus':
            return 'desequilibre'
          case 'desequilibre':
            return 'equilibre'
        }
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const getLeftRotation = () => {
    switch (state) {
      case 'equilibre':
        return 0
      case 'surplus':
        return 8
      case 'desequilibre':
        return -15
    }
  }

  const getRightRotation = () => {
    switch (state) {
      case 'equilibre':
        return 0
      case 'surplus':
        return -8
      case 'desequilibre':
        return 15
    }
  }

  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-lg">
      <svg viewBox="0 0 400 300" className="w-full h-auto mb-6">
        {/* Fulcrum */}
        <polygon points="200,180 185,200 215,200" fill="#666" />
        <rect x="195" y="200" width="10" height="40" fill="#666" />

        {/* Left Plate - EMPLOIS */}
        <g transform={`rotate(${getLeftRotation()} 120 180)`}>
          <rect x="80" y="165" width="80" height="15" fill="#ef4444" rx="3" />
          <text x="120" y="177" textAnchor="middle" className="font-bold text-xs fill-white">
            EMPLOIS
          </text>
          {/* Plate items */}
          <text x="85" y="155" className="text-xs fill-gray-700 font-medium">
            Inv.
          </text>
          <text x="100" y="155" className="text-xs fill-gray-700 font-medium">
            BFR
          </text>
          <text x="120" y="155" className="text-xs fill-gray-700 font-medium">
            Remb.
          </text>
          <text x="145" y="155" className="text-xs fill-gray-700 font-medium">
            Frais
          </text>
        </g>

        {/* Right Plate - RESSOURCES */}
        <g transform={`rotate(${getRightRotation()} 280 180)`}>
          <rect x="240" y="165" width="80" height="15" fill="#22c55e" rx="3" />
          <text x="280" y="177" textAnchor="middle" className="font-bold text-xs fill-white">
            RESSOURCES
          </text>
          {/* Plate items */}
          <text x="250" y="155" className="text-xs fill-gray-700 font-medium">
            Capit.
          </text>
          <text x="275" y="155" className="text-xs fill-gray-700 font-medium">
            Empr.
          </text>
          <text x="300" y="155" className="text-xs fill-gray-700 font-medium">
            CAF
          </text>
          <text x="330" y="155" className="text-xs fill-gray-700 font-medium">
            Subv.
          </text>
        </g>
      </svg>

    </div>
  )
}
