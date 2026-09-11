import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ArrowRight, 
  Scale, 
  HelpCircle,
  Award,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { defaultMarketComparisons } from '../data/mockData';
import { translations } from '../i18n/translations';

interface MarketCompareViewProps {
  lang: Language;
}

export const MarketCompareView: React.FC<MarketCompareViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCrop, setSelectedCrop] = useState('onion');
  const [lotSizeKg, setLotSizeKg] = useState(1000);

  const goAgroNet = 27.0; // ₹27.00/kg guaranteed net at farm gate with zero transport/hamali deduction to farmer

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-[#92f5a4] flex items-center justify-center shadow-xs shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{t.marketComparisonTitle}</h1>
              <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
                Dynamic Net Realization Engine
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              Compares actual net realizations after subtracting freight, APMC cess, hamali (loading/unloading), and wastage.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#eaedff] border border-[#dae2fd] rounded-xl flex items-center gap-3">
          <Award className="w-6 h-6 text-[#003b1b] shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-[#003b1b] block">Go Agro Net Farm Gate Advantage:</span>
            <span className="font-mono text-slate-700">₹27.00/kg Guaranteed (Zero Hidden Mandi Cuts)</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Highlight Banner */}
      <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-800">Simulate Crop Consignment:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="onion">🧅 Red Onion (Garva Special)</option>
            <option value="potato">🥔 Jyoti Potato</option>
            <option value="tomato">🍅 Hybrid Tomato</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-600 font-medium">Batch Size:</span>
          <div className="flex gap-1.5">
            {[500, 1000, 2000].map((size) => (
              <button
                key={size}
                onClick={() => setLotSizeKg(size)}
                className={`px-3 py-1 rounded-md font-mono text-xs font-bold transition-all ${
                  lotSizeKg === size
                    ? 'bg-[#003b1b] text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {size.toLocaleString()} kg
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900">
            Market Net Realization Breakdown (Satara Origin)
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Values in ₹ per kg &amp; Net Batch Total for {lotSizeKg.toLocaleString()} kg
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#eaedff] font-mono text-[11px] uppercase text-slate-700">
              <tr>
                <th className="py-3 px-3">Market Destination</th>
                <th className="py-3 px-3">Gross APMC Price</th>
                <th className="py-3 px-3">Transport / Freight</th>
                <th className="py-3 px-3">Mandi Cess + Hamali</th>
                <th className="py-3 px-3">Wastage / Shrinkage</th>
                <th className="py-3 px-3 font-bold text-slate-900">Net Realization</th>
                <th className="py-3 px-3 text-right">Farmer Take-Home ({lotSizeKg} kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {/* Go Agro Direct Farm Gate Row (Hero Highlight) */}
              <tr className="bg-emerald-50/80 font-semibold border-2 border-emerald-500">
                <td className="py-3.5 px-3 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <span className="font-bold text-emerald-950">Go Agro Farm Gate Pick-up</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-sans block mt-0.5">
                    Koregaon Farm Gate • Zero Transport/Hamali to Farmer
                  </span>
                </td>
                <td className="py-3.5 px-3 text-emerald-900">₹27.00 / kg</td>
                <td className="py-3.5 px-3 text-emerald-700">₹0.00 (Go Agro Transporter)</td>
                <td className="py-3.5 px-3 text-emerald-700">₹0.00 (Zero Mandi Cuts)</td>
                <td className="py-3.5 px-3 text-emerald-700">0% (Guaranteed Base)</td>
                <td className="py-3.5 px-3 text-base font-bold text-[#003b1b]">
                  ₹27.00 / kg
                </td>
                <td className="py-3.5 px-3 text-right text-base font-bold text-[#003b1b]">
                  ₹{(27.0 * lotSizeKg).toLocaleString('en-IN')}
                </td>
              </tr>

              {/* Other Mandis */}
              {defaultMarketComparisons.map((m, idx) => {
                const mandiCess = (m.wholesaleGrossPrice * m.mandiCessPercent) / 100;
                const shrinkageLoss = (m.wholesaleGrossPrice * m.transitShrinkagePercent) / 100;
                const netRealization = Math.max(0, m.wholesaleGrossPrice - m.transportCostPerKg - m.handlingHamaliPerKg - mandiCess - shrinkageLoss);
                const totalTakeHome = netRealization * lotSizeKg;
                const diffWithGoAgro = (goAgroNet - netRealization) * lotSizeKg;

                return (
                  <tr key={`${m.marketName}-${idx}`} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-sans">
                      <span className="font-bold text-slate-900">{m.marketName}</span>
                      <span className="text-[11px] text-slate-500 block font-sans">{m.distanceKm} km from Koregaon • {m.estimatedHours}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-800">₹{m.wholesaleGrossPrice.toFixed(2)} / kg</td>
                    <td className="py-3.5 px-3 text-red-600">-₹{m.transportCostPerKg.toFixed(2)}</td>
                    <td className="py-3.5 px-3 text-red-600">-₹{(m.handlingHamaliPerKg + mandiCess).toFixed(2)}</td>
                    <td className="py-3.5 px-3 text-slate-600">{m.transitShrinkagePercent}% (-₹{shrinkageLoss.toFixed(2)})</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      ₹{netRealization.toFixed(2)} / kg
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="font-bold text-slate-900 block">
                        ₹{Math.round(totalTakeHome).toLocaleString('en-IN')}
                      </span>
                      {diffWithGoAgro > 0 ? (
                        <span className="text-[10px] text-emerald-700 font-sans font-semibold">
                          (Go Agro gives +₹{Math.round(diffWithGoAgro).toLocaleString('en-IN')} more)
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-sans">
                          (High freight risk)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytical Breakdown: Why Go Agro delivers superior net returns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Zero Distress Selling</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In traditional mandis like Satara or Pune, farmers pay ₹1.50 - ₹2.50/kg for freight upfront. If market rates crash on arrival, they are forced to sell at distress rates. Go Agro locks your ₹27/kg price before produce leaves your farm.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">No Hamali or Unofficial Cuts</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unorganized commission agents deduct unofficial hamali, weighing cuts (kanta charges), and sample fees ranging from ₹0.80 to ₹1.60/kg. Go Agro’s digital weigh-bridge has a strict Ombudsman policy with zero silent deductions.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">50% Instant Cash Flow</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Traditional APMC arathiyas operate on 15 to 45-day credit slips. Go Agro disburses 50% advance immediately upon farm gate collection via UPI, and the remaining 50% directly into your verified bank account upon delivery.
          </p>
        </div>
      </div>
    </div>
  );
};
