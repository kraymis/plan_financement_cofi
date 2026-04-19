'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, TrendingUp, DollarSign, Briefcase, Target, Zap, AlertCircle, CheckCircle, BookOpen } from 'lucide-react'
import { ExempleStepper } from '@/components/exemple-stepper'
import { ScenariosSection } from '@/components/scenarios-section'
import { SoldeTimeline } from '@/components/solde-timeline'
import { DebtRatioCalculator } from '@/components/debt-ratio-calculator'
import { GlossaireSection } from '@/components/glossaire-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center w-full">
          {/* Badge */}
          <div className="inline-block mb-8 px-4 py-2 bg-[#EEF2FF] border border-[#C7D2FE] rounded-full">
            <span className="text-sm font-medium text-[#6366F1]">
              Cours de Comptabilité & Finance · ESI 2024–2025
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-[800] tracking-[-0.02em] text-[#0F172A] mb-6">
            Plan de Financement
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-[#64748B] mb-10 leading-relaxed">
            Comprendre, construire et analyser votre plan financier prévisionnel
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => document.getElementById('definition')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary inline-flex items-center justify-center"
            >
              Découvrir la méthode
            </button>
            <Link href="/calculateur">
              <button className="btn-secondary w-full inline-flex items-center justify-center gap-2">
                Accéder au calculateur <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Stat Pills */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-sm text-[#64748B]">
              3–5 ans de prévision
            </div>
            <div className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-sm text-[#64748B]">
              4 formules clés
            </div>
            <div className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-sm text-[#64748B]">
              Analyse automatique
            </div>
          </div>
        </div>
      </section>

      {/* DEFINITION SECTION */}
      <section id="definition" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-intro">Introduction</span>
          </div>
          <h2 className="section-title">Définition & Importance</h2>
          <p className="section-subtitle">
            Un plan de financement est un document financier prévisionnel de 3 à 5 ans listant tous les besoins financiers (emplois) et les sources de financement (ressources).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Zap, label: 'Création d\'entreprise' },
              { icon: TrendingUp, label: 'Investissement important' },
              { icon: Target, label: 'Phase d\'expansion' },
              { icon: Briefcase, label: 'Restructuration financière' },
              { icon: DollarSign, label: 'Financement externe' },
            ].map((item, i) => (
              <div key={i} className="card-feature text-center">
                <div className="icon-box icon-box-primary mx-auto mb-4 text-[#6366F1]">
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-[#0F172A]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCTURE SECTION */}
      <section id="structure" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-concepts">Concepts</span>
          </div>
          <h2 className="section-title">Structure : Emplois & Ressources</h2>
          <p className="section-subtitle">Les deux piliers du plan de financement</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* EMPLOIS */}
            <div>
              <h3 className="text-xl font-bold text-[#EF4444] mb-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full"></div> EMPLOIS
              </h3>
              <div className="space-y-4">
                <div className="card-feature border-l-4 border-[#EF4444]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Investissements</h4>
                  <p className="text-sm text-[#64748B]">Achats de biens durables (terrains, machines, véhicules)</p>
                </div>
                <div className="card-feature border-l-4 border-[#EF4444]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">BFR (Besoin en Fonds de Roulement)</h4>
                  <p className="text-sm text-[#64748B] mb-3">Décalages entre encaissements et décaissements</p>
                  <div className="formula-box">
                    <span className="text-[#818CF8]">BFR</span> <span className="text-[#34D399]">=</span> Stocks <span className="text-[#34D399]">+</span> Créances clients <span className="text-[#34D399]">−</span> Dettes fournisseurs
                  </div>
                </div>
                <div className="card-feature border-l-4 border-[#EF4444]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Remboursement dettes</h4>
                  <p className="text-sm text-[#64748B]">Capital des emprunts contractés</p>
                </div>
                <div className="card-feature border-l-4 border-[#EF4444]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Frais de constitution</h4>
                  <p className="text-sm text-[#64748B]">Frais juridiques, notariaux, immatriculation</p>
                </div>
              </div>
            </div>

            {/* RESSOURCES */}
            <div>
              <h3 className="text-xl font-bold text-[#10B981] mb-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div> RESSOURCES
              </h3>
              <div className="space-y-4">
                <div className="card-feature border-l-4 border-[#10B981]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Capitaux propres</h4>
                  <p className="text-sm text-[#64748B]">Apport personnel des associés</p>
                </div>
                <div className="card-feature border-l-4 border-[#10B981]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Emprunt bancaire</h4>
                  <p className="text-sm text-[#64748B]">Crédit remboursé sur plusieurs années</p>
                </div>
                <div className="card-feature border-l-4 border-[#10B981]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">CAF (Capacité d'Autofinancement)</h4>
                  <p className="text-sm text-[#64748B] mb-3">Richesse générée par l'activité</p>
                  <div className="formula-box">
                    <span className="text-[#818CF8]">CAF</span> <span className="text-[#34D399]">=</span> Résultat net <span className="text-[#34D399]">+</span> Dotations aux amortissements
                  </div>
                </div>
                <div className="card-feature border-l-4 border-[#10B981]">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Subventions & aides</h4>
                  <p className="text-sm text-[#64748B]">Aides ANSEJ, ANGEM, sans remboursement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ETAPES SECTION */}
      <section id="etapes" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-methodology">Méthodologie</span>
          </div>
          <h2 className="section-title">Méthodologie en 6 étapes</h2>
          <p className="section-subtitle">Comment construire votre plan de financement</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Identifier tous les emplois (investissements, BFR, remboursements)',
              'Évaluer les ressources disponibles (apport, CAF, crédits, subventions)',
              'Construire le tableau année par année',
              'Calculer le solde : Ressources − Emplois (doit être ≥ 0)',
              'Identifier les déséquilibres (solde négatif = risque)',
              'Ajuster jusqu\'à l\'équilibre (renégocier, augmenter capital, décaler)',
            ].map((step, i) => (
              <div key={i} className="card-feature">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#EEF2FF] rounded-full flex items-center justify-center font-bold text-[#6366F1] text-sm font-semibold">
                    {i + 1}
                  </div>
                  <p className="text-[#334155] font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXEMPLE SECTION */}
      <section id="exemple" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-practice">Cas pratique</span>
          </div>
          <h2 className="section-title">Exemple pratique : La boutique STYLE & CO</h2>
          
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-[16px] p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">Contexte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><span className="font-semibold">Propriétaire :</span> Mme Amira BENSAID</p>
              <p><span className="font-semibold">Secteur :</span> Boutique de vêtements, Alger</p>
              <p><span className="font-semibold">Apport personnel :</span> 1 500 000 DA</p>
              <p><span className="font-semibold">Emprunt bancaire :</span> 1 000 000 DA / 5 ans</p>
              <p><span className="font-semibold">Subvention ANSEJ :</span> 400 000 DA</p>
              <p><span className="font-semibold">Durée du plan :</span> 3 ans</p>
            </div>
          </div>

          <ExempleStepper />
        </div>
      </section>

      <ScenariosSection />

      {/* ANALYSE SECTION */}
      <section id="analyse" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-analysis">Analyse</span>
          </div>
          <h2 className="section-title">Analyse & Interprétation</h2>
          <p className="section-subtitle">Les trois règles fondamentales</p>

          <div className="space-y-6 mb-8">
            {[
              { title: 'Règle 1 — Équilibre annuel', desc: 'Le solde doit être ≥ 0 chaque année sans exception' },
              { title: 'Règle 2 — Solde cumulé croissant', desc: 'Indique une réserve financière qui se constitue' },
              { title: 'Règle 3 — Structure de financement', desc: 'Capital propre ≥ 30–40% du total des besoins' },
            ].map((rule, i) => (
              <div key={i} className="card-feature border-l-4 border-[#6366F1]">
                <h4 className="font-semibold text-[#0F172A]">{rule.title}</h4>
                <p className="text-[#64748B] mt-2">{rule.desc}</p>
              </div>
            ))}
          </div>

          <SoldeTimeline />

          <DebtRatioCalculator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-feature border-2 border-[#10B981] bg-[#ECFDF5]">
              <h3 className="text-lg font-semibold text-[#065F46] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Bons signes
              </h3>
              <ul className="space-y-2 text-sm text-[#065F46]">
                <li>✓ Solde annuel positif</li>
                <li>✓ Solde cumulé croissant</li>
                <li>✓ CAF {'>'} remboursements</li>
                <li>✓ Dettes {'<'} 2× capitaux propres</li>
                <li>✓ BFR maîtrisé</li>
              </ul>
            </div>

            <div className="card-feature border-2 border-[#EF4444] bg-[#FEF2F2]">
              <h3 className="text-lg font-semibold text-[#991B1B] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Mauvais signes
              </h3>
              <ul className="space-y-2 text-sm text-[#991B1B]">
                <li>✗ Solde négatif même 1 an</li>
                <li>✗ CAF insuffisante</li>
                <li>✗ Dépendance excessive aux emprunts</li>
                <li>✗ BFR sous-estimé</li>
                <li>✗ Aucune réserve</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES SECTION */}
      <section id="avantages" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-evaluation">Évaluation</span>
          </div>
          <h2 className="section-title">Avantages & Limites</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-feature border-2 border-[#10B981] bg-[#ECFDF5]">
              <h3 className="text-lg font-semibold text-[#065F46] mb-4">Avantages</h3>
              <ul className="space-y-3 text-sm text-[#065F46]">
                <li className="flex gap-2"><span className="font-bold">✓</span> Vision globale et pluriannuelle</li>
                <li className="flex gap-2"><span className="font-bold">✓</span> Outil de communication avec les banques</li>
                <li className="flex gap-2"><span className="font-bold">✓</span> Aide à la décision (investir ou attendre)</li>
                <li className="flex gap-2"><span className="font-bold">✓</span> Anticipe les besoins de trésorerie</li>
                <li className="flex gap-2"><span className="font-bold">✓</span> Facilite le suivi de la performance</li>
              </ul>
            </div>

            <div className="card-feature border-2 border-[#F59E0B] bg-[#FFFBEB]">
              <h3 className="text-lg font-semibold text-[#92400E] mb-4">Limites</h3>
              <ul className="space-y-3 text-sm text-[#92400E]">
                <li className="flex gap-2"><span className="font-bold">!</span> Repose sur des hypothèses (CAF surestimée)</li>
                <li className="flex gap-2"><span className="font-bold">!</span> Ignore les aléas extérieurs (crise)</li>
                <li className="flex gap-2"><span className="font-bold">!</span> Nécessite des compétences financières</li>
                <li className="flex gap-2"><span className="font-bold">!</span> Doit être mis à jour régulièrement</li>
                <li className="flex gap-2"><span className="font-bold">!</span> Risque d'optimisme qui induit en erreur</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONSEILS SECTION */}
      <section id="conseils" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="section-label label-practices">Bonnes pratiques</span>
          </div>
          <h2 className="section-title">Conseils pour réussir</h2>
          <p className="section-subtitle">5 bonnes pratiques essentielles</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: 1, title: 'Réalisme', desc: '3 scénarios: optimiste, réaliste, pessimiste' },
              { num: 2, title: 'Réserve', desc: 'Prévoir 5–10% du total des emplois' },
              { num: 3, title: 'Diversification', desc: 'Apport + emprunt + aides publiques' },
              { num: 4, title: 'Actualisation', desc: 'Comparer annuellement aux réalisations' },
              { num: 5, title: 'Accompagnement', desc: 'Expert-comptable pour validation' },
            ].map((conseil) => (
              <div key={conseil.num} className="card-feature">
                <div className="w-10 h-10 bg-[#EEF2FF] rounded-full flex items-center justify-center font-bold text-[#6366F1] text-sm font-semibold mb-3">
                  {conseil.num}
                </div>
                <h4 className="font-semibold text-[#0F172A] mb-2">{conseil.title}</h4>
                <p className="text-sm text-[#64748B]">{conseil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlossaireSection />

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-[#6366F1] to-[#4338CA] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à construire votre propre plan ?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Utilisez notre calculateur interactif — saisissez vos données et obtenez votre analyse complète avec graphiques.
          </p>
          <Link href="/calculateur">
            <button className="bg-white hover:bg-gray-50 text-[#6366F1] font-semibold px-8 py-3 rounded-[10px] inline-flex items-center gap-2 transition-colors">
              Accéder au calculateur <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-[#94A3B8] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1E293B]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-semibold mb-2 text-[#E2E8F0]">ESI · Cours de Comptabilité et Finance · 2024–2025</p>
          <p className="text-sm">Bemmoussat Moulay Reda & Maachi Mohamed Islam Aymen</p>
        </div>
      </footer>
    </div>
  )
}
