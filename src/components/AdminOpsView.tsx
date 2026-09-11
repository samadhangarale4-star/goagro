import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText, 
  Layers, 
  Coins, 
  ShieldCheck,
  Check,
  Download,
  Filter
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { translations } from '../i18n/translations';

interface AdminOpsViewProps {
  shipments: ShipmentItem[];
  onUpdateShipment: (updated: ShipmentItem) => void;
  lang: Language;
}

export const AdminOpsView: React.FC<AdminOpsViewProps> = ({ shipments, onUpdateShipment, lang }) => {
  const t = translations[lang];
  const [selectedShipmentId, setSelectedShipmentId] = useState(shipments[0]?.id || 'GA-ON-00126');
  const [actualWeightInput, setActualWeightInput] = useState(990);
  const [gradeA_Input, setGradeA_Input] = useState(680);
  const [gradeB_Input, setGradeB_Input] = useState(310);
  const [gradeC_Input, setGradeC_Input] = useState(10);
  const [inspectorNotes, setInspectorNotes] = useState('Grade A export quality onions (55mm+), firm bulbs, dried neck. Moisture content 13.8% within APMC norms.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  const totalAggregatedKg = shipments.reduce((acc, s) => acc + s.verifiedHubWeightKg, 0);
  const totalFarmerPayments = shipments.reduce((acc, s) => acc + (s.baseFarmerRatePerKg * s.verifiedHubWeightKg), 0);
  const totalAdvancesPaid = shipments.reduce((acc, s) => acc + s.advancePaidTotal, 0);

  const variancePercent = currentShipment.expectedWeightKg > 0 
    ? (((actualWeightInput - currentShipment.expectedWeightKg) / currentShipment.expectedWeightKg) * 100).toFixed(1)
    : '0.0';

  const isDiscrepancyFlagged = Math.abs(parseFloat(variancePercent)) > 2.0;

  const handleSaveQC = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ShipmentItem = {
      ...currentShipment,
      verifiedHubWeightKg: actualWeightInput,
      gradeA_Kg: gradeA_Input,
      gradeB_Kg: gradeB_Input,
      gradeC_Kg: gradeC_Input,
      moistureVariance: `${variancePercent}%`,
      currentStage: Math.max(currentShipment.currentStage, 5),
    };
    onUpdateShipment(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleApproveFinalSettlement = () => {
    const updated: ShipmentItem = {
      ...currentShipment,
      currentStage: 7,
      status: 'settled',
    };
    onUpdateShipment(updated);
    alert(`Final settlement of ₹${currentShipment.finalSettlementTotal.toLocaleString('en-IN')} approved and released to ${currentShipment.farmerName}'s Bank of Maharashtra account!`);
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-[#92f5a4] flex items-center justify-center shadow-xs shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{t.opsDashboardTitle}</h1>
              <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
                Satara Aggregator Hub Active
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              Live Central Weighing Bridge #4 • Grading Lab • Escrow Payout Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Consignment:</span>
          <select
            value={selectedShipmentId}
            onChange={(e) => setSelectedShipmentId(e.target.value)}
            className="p-2 bg-[#f2f3ff] border border-slate-200 rounded-lg text-xs font-mono font-bold text-[#003b1b] outline-none"
          >
            {shipments.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} - {s.farmerName} ({s.expectedWeightKg} kg)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Quantitative Operations Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-mono uppercase text-slate-500 block">Total Aggregated Supply</span>
          <span className="text-2xl font-bold font-mono text-[#003b1b] mt-1 block">
            {(totalAggregatedKg / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-500">Metric Tons</span>
          </span>
          <span className="text-xs text-slate-500 mt-1 block">2 Consignments Active</span>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-mono uppercase text-slate-500 block">Buyer Demand Locked</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
            100% <span className="text-xs font-normal text-slate-500">@ ₹30.00/kg</span>
          </span>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">Vashi APMC Urban Buyers</span>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-mono uppercase text-slate-500 block">Advances Disbursed</span>
          <span className="text-2xl font-bold font-mono text-[#006d30] mt-1 block">
            ₹{totalAdvancesPaid.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 mt-1 block">50% Instant UPI Payouts</span>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
          <span className="text-[11px] font-mono uppercase text-slate-500 block">Go Agro Net Ops Revenue</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
            ₹{shipments.reduce((acc, s) => acc + s.goAgroMarginTotal, 0).toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Benchmark: ₹0.75 / kg</span>
        </div>
      </div>

      {/* Main Form: Weighing Bridge Receiving + Quality QC Grading */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-[#003b1b]" />
              <h2 className="text-base font-bold text-slate-900">
                {t.weighBridgeEntry} — Shipment #{currentShipment.id}
              </h2>
            </div>

            {savedSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Weigh-Bridge certification &amp; Grade A/B QC results updated and broadcast to Farmer &amp; Vendor!</span>
              </div>
            )}

            <form onSubmit={handleSaveQC} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 uppercase font-mono text-[10px] block">Expected Farm Gate Weight</span>
                  <span className="font-mono text-base font-bold text-slate-900 block mt-1">
                    {currentShipment.expectedWeightKg} kg
                  </span>
                  <span className="text-[11px] text-slate-500">Declared at Koregaon pickup</span>
                </div>

                <div className="p-3 bg-[#eaedff] rounded-xl border border-[#dae2fd]">
                  <span className="text-slate-500 uppercase font-mono text-[10px] block">Certified Hub Scale Reading</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={actualWeightInput}
                      onChange={(e) => setActualWeightInput(parseInt(e.target.value) || 0)}
                      className="w-28 bg-white border border-slate-300 rounded px-2.5 py-1 font-mono text-base font-bold text-[#003b1b] outline-none"
                    />
                    <span className="font-bold text-slate-700">kg</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Satara Bridge Scale #4</span>
                </div>
              </div>

              {/* Weight Discrepancy & Tolerance Notice */}
              <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                isDiscrepancyFlagged
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                {isDiscrepancyFlagged ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block">
                    Moisture Variance: {variancePercent}% ({actualWeightInput - currentShipment.expectedWeightKg} kg)
                  </span>
                  <p className="mt-0.5 text-[11px]">
                    {isDiscrepancyFlagged
                      ? "Variance exceeds ±2.0% standard tolerance limit. Flagged for supervisor photo review under Ombudsman Zero Silent Deductions policy."
                      : "Within acceptable drying variance (±2.0%). Digital weight slip certified automatically."}
                  </p>
                </div>
              </div>

              {/* Quality Grading Input */}
              <div className="pt-2 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3 text-sm flex items-center justify-between">
                  <span>{t.digitalGradingTitle}</span>
                  <span className="font-mono text-slate-500 text-xs">
                    Total: {gradeA_Input + gradeB_Input + gradeC_Input} kg
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                    <span className="font-bold text-emerald-900 block text-xs">Grade A (55mm+)</span>
                    <span className="text-[11px] text-emerald-700 block">Premium Export / Metro</span>
                    <input
                      type="number"
                      value={gradeA_Input}
                      onChange={(e) => setGradeA_Input(parseInt(e.target.value) || 0)}
                      className="mt-2 w-full bg-white border border-emerald-300 rounded p-1.5 font-mono text-sm font-bold text-emerald-900"
                    />
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                    <span className="font-bold text-amber-900 block text-xs">Grade B (40-50mm)</span>
                    <span className="text-[11px] text-amber-700 block">Standard Retail Mart</span>
                    <input
                      type="number"
                      value={gradeB_Input}
                      onChange={(e) => setGradeB_Input(parseInt(e.target.value) || 0)}
                      className="mt-2 w-full bg-white border border-amber-300 rounded p-1.5 font-mono text-sm font-bold text-amber-900"
                    />
                  </div>

                  <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-800 block text-xs">Grade C (Cull/Small)</span>
                    <span className="text-[11px] text-slate-500 block">Processing / Loss</span>
                    <input
                      type="number"
                      value={gradeC_Input}
                      onChange={(e) => setGradeC_Input(parseInt(e.target.value) || 0)}
                      className="mt-2 w-full bg-white border border-slate-300 rounded p-1.5 font-mono text-sm font-bold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quality Inspector Report &amp; CCTV Audit
                </label>
                <textarea
                  rows={2}
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#003b1b] text-white rounded-xl font-bold text-xs hover:bg-[#14532d] transition-all shadow-xs"
                >
                  {t.recordWeighing}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Escrow Payouts & Settlement Release */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Escrow &amp; Farmer Settlement Control
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Upon vendor receipt at Vashi APMC, release the remaining 50% farmer payout.
            </p>

            <div className="p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Farmer:</span>
                <span className="font-bold text-slate-900">{currentShipment.farmerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Committed Rate:</span>
                <span className="font-mono font-semibold">₹27.00 / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Verified Quantity:</span>
                <span className="font-mono font-semibold">{currentShipment.verifiedHubWeightKg} kg</span>
              </div>
              <div className="flex justify-between text-[#006d30] font-semibold border-t border-slate-200 pt-2">
                <span>Advance Already Paid (50%):</span>
                <span className="font-mono font-bold">₹{currentShipment.advancePaidTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#703a00] font-bold">
                <span>Pending Final Settlement:</span>
                <span className="font-mono text-sm">₹{currentShipment.finalSettlementTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-4 pt-2">
              <button
                type="button"
                onClick={handleApproveFinalSettlement}
                disabled={currentShipment.currentStage >= 7}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                  currentShipment.currentStage >= 7
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-[#14532d] text-white hover:bg-[#003b1b] shadow-xs'
                }`}
              >
                {currentShipment.currentStage >= 7
                  ? "✓ Final Settlement Released via UPI"
                  : t.approveSettlement}
              </button>
            </div>
          </div>

          {/* Corridor Logistics Status */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Corridor Aggregation Node Status
            </h3>
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Primary Route:</span>
                <span className="font-mono font-semibold">Satara Hub ➔ Mumbai Vashi (NH48)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Transporter Freight:</span>
                <span className="font-mono font-semibold">₹1.75 / kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Selling Agent Commission:</span>
                <span className="font-mono font-semibold">₹0.50 / kg</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Vendor Wholesale Lock:</span>
                <span className="font-mono font-bold text-[#003b1b]">₹30.00 / kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
