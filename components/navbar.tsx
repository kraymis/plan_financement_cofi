'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const navLinks = [
    { label: 'Définition', id: 'definition' },
    { label: 'Structure', id: 'structure' },
    { label: 'Étapes', id: 'etapes' },
    { label: 'Exemple', id: 'exemple' },
    { label: 'Scénarios', id: 'scenarios' },
    { label: 'Analyse', id: 'analyse' },
    { label: 'Avantages', id: 'avantages' },
    { label: 'Conseils', id: 'conseils' },
    { label: 'Glossaire', id: 'glossaire' },

  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] backdrop-blur-[12px] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg font-bold text-[#6366F1]">FinPlan</span>
            <span className="hidden sm:inline-block px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-xs font-medium rounded-md">
              ESI 2CS
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-[#64748B] font-normal hover:text-[#0F172A] transition-colors duration-150 hover:font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* CTA Button */}
          <Link href="/calculateur" className="hidden sm:block ml-4">
            <button className="btn-primary inline-flex items-center gap-2 text-sm font-medium">
              Calculateur <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#E2E8F0] py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link href="/calculateur" className="block w-full mt-4">
              <button className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm font-medium">
                Calculateur <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
