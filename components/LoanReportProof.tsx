/**
 * WARUM: Proof-Section – zeigt konkret, was im Loan-Report enthalten ist
 * WIE: Liste mit 3 Kernelementen plus Hinweis auf Interviews mit SACCO-Officern
 * WAS: Liefert textliches Proof-Element solange Screenshots fehlen
 */

const proofItems = [
  {
    title: 'Cash-flow timeline lenders expect',
    description: '6-month cash-flow analysis (up to 12 months available) showing incoming vs. outgoing M-Pesa transfers so credit officers see repayment capacity at a glance. Delivered as PDF + Excel.',
  },
  {
    title: 'Loan-ready summary page',
    description: 'Business snapshot with total float, largest payers, and daily average volume mapped to the exact sections SACCO loan forms request. Professional PDF format.',
  },
  {
    title: 'Audit trail straight from M-Pesa',
    description: 'Every transaction keeps the original reference ID and timestamp, so banks can validate authenticity without emailing you back and forth. Exportable to Excel for their systems.',
  },
];

export default function LoanReportProof() {
  return (
    <section className="bg-black text-white py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="uppercase tracking-[0.2em] text-primary/80 text-xs mb-3">
            Proof until screenshots land
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What lenders receive: Bank-ready PDF + Excel export
          </h2>
          <p className="text-white/80">
            Shaped by interviews with SACCO credit officers and informal earners, so every section matches the checklist lenders actually use when approving loans. Download as PDF or Excel - both formats accepted by all Banks, SACCOs, and Chamas.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {proofItems.map((item) => (
            <div key={item.title} className="bg-white/5 rounded-xl p-6 text-left border border-white/10">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/75 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
