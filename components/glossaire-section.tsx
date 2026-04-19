export function GlossaireSection() {
  const terms = [
    {
      term: 'Emplois',
      definition: 'Les besoins de financement de l\'entreprise : tout ce qu\'elle doit dépenser ou mobiliser (investissements, BFR, remboursements).',
    },
    {
      term: 'Ressources',
      definition: 'Les sources de fonds disponibles pour couvrir les emplois (apport personnel, emprunt, CAF, subventions).',
    },
    {
      term: 'BFR — Besoin en Fonds de Roulement',
      definition: 'Décalage de trésorerie entre encaissements et décaissements liés au cycle d\'exploitation.',
      formula: 'BFR = Stocks + Créances clients − Dettes fournisseurs',
    },
    {
      term: 'CAF — Capacité d\'Autofinancement',
      definition: 'Richesse générée par l\'activité de l\'entreprise, disponible pour investir et rembourser.',
      formula: 'CAF = Résultat net + Dotations aux amortissements',
    },
    {
      term: 'Solde annuel',
      definition: 'Différence entre les ressources et les emplois pour une année donnée. Doit être ≥ 0 chaque année.',
      formula: 'Solde = Ressources (B) − Emplois (A)',
    },
    {
      term: 'Solde cumulé',
      definition: 'Somme de tous les soldes annuels depuis le début du plan. Mesure l\'accumulation de la réserve financière.',
      formula: 'Cumulé N = Cumulé N-1 + Solde N',
    },
    {
      term: 'Taux d\'endettement',
      definition: 'Rapport entre les dettes totales et les capitaux propres. Mesure la dépendance au financement externe. Doit être < 2.',
      formula: 'Taux = Total dettes / Capitaux propres',
    },
    {
      term: 'Subventions (ANSEJ / ANGEM)',
      definition: 'Aides financières accordées par l\'État ou des organismes algériens sans obligation de remboursement, pour encourager la création d\'emplois et l\'innovation.',
    },
  ]

  return (
    <section id="glossaire" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="section-label label-reference">Référence</span>
        </div>
        <h2 className="section-title">Glossaire — Termes essentiels</h2>
        <p className="section-subtitle">
          Les définitions clés pour comprendre le plan de financement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((item, idx) => (
            <div key={idx} className="card-feature">
              <h3 className="font-semibold text-[#0F172A] mb-2 text-sm">{item.term}</h3>
              <p className="text-[#64748B] text-sm mb-3">{item.definition}</p>
              {item.formula && (
                <div className="formula-box text-xs">
                  {item.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
