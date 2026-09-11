import React from 'react';
import { 
  ReceiptText, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  PieChart, 
  UserCheck, 
  Truck, 
  Building2, 
  Store, 
  ShoppingBag, 
  ShieldCheck 
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { translations } from '../i18n/translations';

interface PriceBreakdownViewProps {
  shipment: ShipmentItem;
  lang: Language;
}

export const PriceBreakdownView: React.FC<PriceBreakdownViewProps> = ({ shipment, lang }) => {
  const t = translations[lang];

  // 1,000 kg Onion Benchmark Values
  const qty = 1000;
  const farmerRate = 27.0;
  const farmerAdvanceRate = 13.5;
  const farmerFinalRate = 13.5;
  const transporterRate = 1.75;
  const goAgroRate = 0.75;
  const agentRate = 0.50;
  const vendorRate = 30.0;
  const consumerRate = 37.0;
  const retailSpread = 7.0;

  // Totals for 1,000 kg
  const totalVendorPurchase = qty * vendorRate; // ₹30,000
  const totalFarmer = qty * farmerRate; // ₹27,000
  const totalFarmerAdvance = qty * farmerAdvanceRate; // ₹13,500
  const totalFarmerFinal = qty * farmerFinalRate; // ₹13,500
  const totalTransporter = qty * transporterRate; // ₹1,750
  const totalGoAgro = qty * goAgroRate; // ₹750
  const totalAgent = qty * agentRate; // ₹500
  const totalConsumer = qty * consumerRate; // ₹37,000
  const totalRetailSpread = qty * retailSpread; // ₹7,000

  const stakeholders = [
    {
      name: "Farmer Gate Price",
      sub: "Ramesh Patil (Koregaon Node)",
      icon: <UserCheck className="w-5 h-5 text-emerald-700" />,
      ratePerKg: farmerRate,
      percent: ((farmerRate / vendorRate) * 100).toFixed(1),
      total1000kg: totalFarmer,
      color: "bg-emerald-50 text-emerald-950 border-emerald-200",
      accent: "bg-emerald-600",
      notes: `50% Advance = ₹${farmerAdvanceRate.toFixed(2)}/kg (₹${totalFarmerAdvance.toLocaleString('en-IN')}) upon collection + 50% Final Settlement = ₹${farmerFinalRate.toFixed(2)}/kg (₹${totalFarmerFinal.toLocaleString('en-IN')}) on vendor acceptance.`
    },
    {
      name: "Transporter Freight",
      sub: "Suresh Shinde (TR-102 Eicher Canter)",
      icon: <Truck className="w-5 h-5 text-blue-700" />,
      ratePerKg: transporterRate,
      percent: ((transporterRate / vendorRate) * 100).toFixed(1),
      total1000kg: totalTransporter,
      color: "bg-blue-50 text-blue-950 border-blue-200",
      accent: "bg-blue-600",
      notes: "Aggregates from multiple Koregaon farm gates, geo-stamps gunny bags, transports via NH48 corridor to Satara Hub & Mumbai."
    },
    {
      name: "Go Agro Platform & Hub Ops",
      sub: "Central Weighing, Grading & Escrow",
      icon: <Building2 className="w-5 h-5 text-purple-700" />,
      ratePerKg: goAgroRate,
      percent: ((goAgroRate / vendorRate) * 100).toFixed(1),
      total1000kg: totalGoAgro,
      color: "bg-purple-50 text-purple-950 border-purple-200",
      accent: "bg-purple-600",
      notes: "Digital weigh-bridge certification, Grade A/B lab sorting, CCTV dispute escrow, and instant UPI banking infrastructure."
    },
    {
      name: "Selling / Commission Agent",
      sub: "Dilip Deshmukh (APMC Agent #AG-77)",
      icon: <Store className="w-5 h-5 text-amber-700" />,
      ratePerKg: agentRate,
      percent: ((agentRate / vendorRate) * 100).toFixed(1),
      total1000kg: totalAgent,
      color: "bg-amber-50 text-amber-950 border-amber-200",
      accent: "bg-amber-600",
      notes: "APMC statutory commission for matching graded supply with certified wholesale buyers without hidden deductions."
    },
  ];

  const flowSteps = [
    { step: 1, label: "Farmer Supplies", actor: "Farmer (Koregaon)", action: "Lists produce & locks ₹27/kg", status: "completed" },
    { step: 2, label: "Transporter Collects", actor: "Transporter Fleet", action: "Picks up produce, geo-tags, ₹1.75/kg", status: "completed" },
    { step: 3, label: "Go Agro Receives & Grades", actor: "Satara Hub Desk", action: "Weigh-bridge certified, Grade A/B, ₹0.75/kg", status: "completed" },
    { step: 4, label: "Agent Sells", actor: "Selling Agent", action: "Matches Vashi buyer, ₹0.50/kg commission", status: "completed" },
    { step: 5, label: "Vendor Receives", actor: "Apex Groceries", action: "Purchases batch at ₹30/kg", status: "completed" },
    { step: 6, label: "Vendor Sells", actor: "Retail Consumers", action: "Sells in Mumbai stores @ ₹37/kg", status: "active" },
    { step: 7, label: "Go Agro Records Payment", actor: "Escrow Engine", action: "Reconciles ₹30,000 vendor ledger", status: "completed" },
    { step: 8, label: "Farmer Receives Settlement", actor: "Bank of Maharashtra", action: "Releases final 50% balance ₹13,500", status: "completed" },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-[#92f5a4] flex items-center justify-center shadow-xs shrink-0">
            <ReceiptText className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{t.priceDistributionTitle}</h1>
              <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
                Zero Hidden Deductions Model
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              Consignment Unique ID: <span className="font-bold text-[#003b1b]">{shipment.id}</span> • Corridor: Satara ➔ Mumbai APMC
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900 font-medium">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t.illustrativeNotice}</span>
        </div>
      </div>

      {/* Visual Unit Economics Waterfall (₹30/kg Breakdown) */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Illustrative Vendor Purchase Price Breakdown: ₹30.00 / kg
            </h2>
            <span className="text-xs text-slate-500">
              Mathematical distribution of every rupee paid by wholesale buyers.
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-[#003b1b] bg-[#f2f3ff] px-3 py-1 rounded-full">
            Total Vendor Purchase: ₹30.00 / kg
          </span>
        </div>

        {/* Visual Stacked Progress Bar */}
        <div className="w-full h-6 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner mb-6">
          <div style={{ width: '90%' }} className="bg-[#14532d] h-full flex items-center justify-center text-white text-[10px] font-mono font-bold" title="Farmer 90%">
            Farmer ₹27.00 (90%)
          </div>
          <div style={{ width: '5.83%' }} className="bg-blue-600 h-full flex items-center justify-center text-white text-[9px] font-mono font-bold" title="Transporter 5.83%">
            ₹1.75
          </div>
          <div style={{ width: '2.5%' }} className="bg-purple-600 h-full" title="Go Agro 2.5%"></div>
          <div style={{ width: '1.67%' }} className="bg-amber-500 h-full" title="Agent 1.67%"></div>
        </div>

        {/* Stakeholder Share Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stakeholders.map((stk, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${stk.color} flex flex-col justify-between space-y-3 transition-all`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                    {stk.icon}
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/80">
                    {stk.percent}%
                  </span>
                </div>

                <h3 className="font-bold text-sm mt-3">{stk.name}</h3>
                <span className="text-[11px] opacity-75 font-mono block">{stk.sub}</span>

                <div className="mt-3 pt-2 border-t border-current/20">
                  <span className="text-2xl font-bold font-mono block">
                    ₹{stk.ratePerKg.toFixed(2)} <span className="text-xs font-normal opacity-75">/ kg</span>
                  </span>
                  <span className="text-[11px] font-mono font-semibold block mt-0.5">
                    ₹{stk.total1000kg.toLocaleString('en-IN')} (for 1,000 kg)
                  </span>
                </div>
              </div>

              <p className="text-[11px] opacity-80 leading-relaxed border-t border-current/10 pt-2">
                {stk.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Consumer Retail Resale Banner */}
        <div className="mt-6 p-4 bg-[#f2f3ff] rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003b1b] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                Consumer Retail Sales Value: ₹37.00 / kg (₹37,000 Total)
              </span>
              <p className="text-xs text-slate-600">
                The vendor sells to consumers at ₹37/kg, giving an illustrative <strong>₹7/kg gross spread</strong> before retail overheads.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Illustrative Gross Spread</span>
            <span className="text-lg font-mono font-bold text-[#006d30]">
              +₹7.00 / kg (+23.3%)
            </span>
          </div>
        </div>
      </div>

      {/* Complete Shipment Example for 1,000 kg Onions */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">
            {t.shipment1000kgTitle} (Satara ➔ Mumbai NH48)
          </h2>
          <span className="bg-[#f2f3ff] text-[#003b1b] font-mono text-xs font-bold px-3 py-1 rounded-full">
            Flagship Lot GA-ON-00126
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#eaedff] font-mono text-[11px] uppercase text-slate-700">
              <tr>
                <th className="py-3 px-4">Entity / Stakeholder</th>
                <th className="py-3 px-4">Rate Basis</th>
                <th className="py-3 px-4">1,000 kg Consignment Value</th>
                <th className="py-3 px-4">Disbursement Mode</th>
                <th className="py-3 px-4">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="bg-white">
                <td className="py-3 px-4 font-sans font-semibold text-slate-900">
                  Vendor Total Purchase Spend
                </td>
                <td className="py-3 px-4 text-slate-600">₹30.00 / kg</td>
                <td className="py-3 px-4 font-bold text-slate-900 text-sm">₹30,000</td>
                <td className="py-3 px-4 font-sans text-slate-600">RTGS Escrow to Go Agro</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                    Received
                  </span>
                </td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-3 px-4 font-sans font-semibold text-emerald-900">
                  Farmer Net Realization (Ramesh Patil)
                </td>
                <td className="py-3 px-4 text-emerald-800">₹27.00 / kg</td>
                <td className="py-3 px-4 font-bold text-emerald-900 text-sm">
                  ₹27,000
                  <span className="block font-sans text-[10px] text-emerald-700 font-normal">
                    (₹13,500 Adv + ₹13,500 Final)
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-slate-600">Instant UPI Autopay</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                    Fully Guaranteed
                  </span>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-4 font-sans font-semibold text-blue-900">
                  Transporter Freight Payout (Suresh Shinde)
                </td>
                <td className="py-3 px-4 text-blue-800">₹1.75 / kg</td>
                <td className="py-3 px-4 font-bold text-blue-900 text-sm">₹1,750</td>
                <td className="py-3 px-4 font-sans text-slate-600">IMPS Fleet Disbursement</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                    Released
                  </span>
                </td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-3 px-4 font-sans font-semibold text-purple-900">
                  Go Agro Platform &amp; Hub Ops Revenue
                </td>
                <td className="py-3 px-4 text-purple-800">₹0.75 / kg</td>
                <td className="py-3 px-4 font-bold text-purple-900 text-sm">₹750</td>
                <td className="py-3 px-4 font-sans text-slate-600">Internal Hub Clearing</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                    Audited
                  </span>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-4 font-sans font-semibold text-amber-900">
                  Selling / Commission Agent (Dilip Deshmukh)
                </td>
                <td className="py-3 px-4 text-amber-800">₹0.50 / kg</td>
                <td className="py-3 px-4 font-bold text-amber-900 text-sm">₹500</td>
                <td className="py-3 px-4 font-sans text-slate-600">Direct Bank Mandate</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                    Settled
                  </span>
                </td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-3 px-4 font-sans font-bold text-slate-900">
                  Consumer Sales Value (Mumbai Retail)
                </td>
                <td className="py-3 px-4 text-slate-700 font-bold">₹37.00 / kg</td>
                <td className="py-3 px-4 font-bold text-slate-900 text-base">₹37,000</td>
                <td className="py-3 px-4 font-sans text-slate-600">UPI / Cash at Retail Store</td>
                <td className="py-3 px-4">
                  <span className="bg-[#92f5a4] text-[#003b1b] px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                    End Consumer
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual End-to-End Produce and Money Flow Cycle */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
        <h2 className="text-base font-bold text-slate-900 mb-2">
          {t.produceMoneyFlow}
        </h2>
        <p className="text-xs text-slate-500 mb-6 font-mono">
          Farmer supplies ➔ Transporter collects ➔ Go Agro receives/weighs/grades ➔ Agent sells ➔ Vendor receives ➔ Vendor sells ➔ Go Agro records payment ➔ Farmer receives remaining settlement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flowSteps.map((stg) => (
            <div
              key={stg.step}
              className="p-4 rounded-xl bg-[#f2f3ff] border border-slate-200 flex flex-col justify-between space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-[#003b1b] text-[#92f5a4] flex items-center justify-center font-bold text-xs font-mono">
                  {stg.step}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#006d30] uppercase">
                  {stg.actor}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">{stg.label}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{stg.action}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Verified Step</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006d30]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
