import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Navigation, 
  Coins, 
  FileCheck, 
  Scale, 
  Check, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { defaultTransporterPickups } from '../data/mockData';
import { translations } from '../i18n/translations';

interface TransporterViewProps {
  shipment: ShipmentItem;
  onUpdateShipment: (updated: ShipmentItem) => void;
  lang: Language;
}

export const TransporterView: React.FC<TransporterViewProps> = ({ shipment, onUpdateShipment, lang }) => {
  const t = translations[lang];
  const [pickups, setPickups] = useState(defaultTransporterPickups);
  const [activeStop, setActiveStop] = useState<string | null>(null);
  const [deliveredToHub, setDeliveredToHub] = useState(false);
  const [discrepancyInput, setDiscrepancyInput] = useState<{ id: string; text: string }>({ id: '', text: '' });

  const totalCollectedKg = pickups.reduce((acc, p) => acc + p.actualKg, 0);
  const freightEarnings = totalCollectedKg * 1.75;

  const handleConfirmPickup = (id: string) => {
    setPickups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'collected' } : p))
    );
  };

  const handleUpdateWeight = (id: string, newKg: number) => {
    setPickups((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const diff = newKg - p.expectedKg;
          return {
            ...p,
            actualKg: newKg,
            discrepancy: diff === 0 ? 'None (Exact Match)' : `${diff > 0 ? '+' : ''}${diff} kg recorded`,
          };
        }
        return p;
      })
    );
  };

  const handleHandoverHub = () => {
    setDeliveredToHub(true);
    // update shipment stage if needed
    onUpdateShipment({
      ...shipment,
      verifiedHubWeightKg: totalCollectedKg,
      currentStage: Math.max(shipment.currentStage, 4),
    });
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Route & Vehicle Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-[#92f5a4] flex items-center justify-center shadow-xs shrink-0">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{t.transporterTitle}</h1>
              <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
                Aggregator Fleet Active
              </span>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 flex-wrap font-mono">
              <span className="text-slate-900 font-semibold">{t.assignedRoute}</span>
              <span>•</span>
              <span className="text-[#006d30] font-bold">{t.vehicleAssigned}</span>
            </p>
          </div>
        </div>

        {/* Transporter Financial Card */}
        <div className="w-full xl:w-auto p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd] flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white text-[#006d30] flex items-center justify-center shadow-2xs">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              {t.transporterFeePerKg}
            </span>
            <span className="text-lg font-bold font-mono text-[#003b1b]">
              ₹{freightEarnings.toLocaleString('en-IN')} Payout
            </span>
            <span className="text-[11px] text-slate-500 block">
              ({totalCollectedKg} kg aggregated @ ₹1.75/kg)
            </span>
          </div>
        </div>
      </div>

      {/* Core Principle Callout */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 leading-relaxed">
          <span className="font-bold block text-sm">Key Operating Rule: Transporter Aggregation Role</span>
          Go Agro does NOT collect directly from individual farm gates. Transporters collect produce from multiple Koregaon farmers, verify bags with geo-stamps, aggregate the lot into standard 1,000 kg consignments, and deliver to the Go Agro Satara Hub weigh-bridge.
        </div>
      </div>

      {/* Farmers Collection List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">{t.farmersToCollect}</h2>
                <span className="text-xs text-slate-500">Route 102: Koregaon ➔ Wai ➔ Rahimatpur Corridor</span>
              </div>
              <span className="bg-[#f2f3ff] text-[#003b1b] px-3 py-1 rounded-full font-mono text-xs font-bold">
                {totalCollectedKg} / 1,000 kg Aggregated
              </span>
            </div>

            <div className="space-y-3">
              {pickups.map((p, idx) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border transition-all ${
                    p.status === 'collected'
                      ? 'bg-[#f2f3ff] border-slate-200'
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#14532d] text-white flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{p.farmerName}</span>
                          <span className="text-xs text-slate-500 font-mono">({p.village})</span>
                        </div>
                        <span className="text-xs text-slate-600 block mt-0.5">
                          {p.crop} • {p.expectedBags} Gunny Bags • Phone: {p.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-mono px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Farm Gate
                      </span>
                    </div>
                  </div>

                  {/* Weight verification inputs */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block uppercase font-mono text-[10px]">Expected Weight</span>
                      <span className="font-mono text-sm font-bold text-slate-800">{p.expectedKg} kg</span>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block uppercase font-mono text-[10px]">Actual Loaded Weight</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <input
                          type="number"
                          value={p.actualKg}
                          onChange={(e) => handleUpdateWeight(p.id, parseInt(e.target.value) || 0)}
                          className="w-20 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-mono text-sm font-bold text-[#003b1b]"
                        />
                        <span className="text-slate-500">kg</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block uppercase font-mono text-[10px]">Variance / Note</span>
                      <span className={`font-mono text-xs font-semibold block mt-0.5 ${
                        p.discrepancy.includes('None') ? 'text-[#006d30]' : 'text-amber-700'
                      }`}>
                        {p.discrepancy}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Handover Action */}
            <div className="mt-6 p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  Aggregate Batch Ready for Hub Weigh-Bridge
                </span>
                <span className="text-xs text-slate-600">
                  Total 3 farm stops loaded • Satara Weigh Bridge Gate #4
                </span>
              </div>

              <button
                onClick={handleHandoverHub}
                disabled={deliveredToHub}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  deliveredToHub
                    ? 'bg-emerald-700 text-white cursor-default'
                    : 'bg-[#003b1b] text-white hover:bg-[#14532d] shadow-xs'
                }`}
              >
                {deliveredToHub ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Delivered at Satara Hub Bridge</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    <span>{t.deliverToHub}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Transporter Checklist & Geo-Stamp */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">{t.transitChecklist}</h3>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006d30]" /> Tarpaulin Waterproof Cover
                </span>
                <span className="text-[#006d30] font-bold font-mono">OK</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006d30]" /> Digital Scale Tare Calibration
                </span>
                <span className="text-[#006d30] font-bold font-mono">OK</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006d30]" /> Driver GPS Telematics Connected
                </span>
                <span className="text-[#006d30] font-bold font-mono">LIVE</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006d30]" /> Discrepancy Escrow Acknowledged
                </span>
                <span className="text-[#006d30] font-bold font-mono">YES</span>
              </div>
            </div>

            {/* Transporter Discrepancy Reporting Tool */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2">{t.reportDiscrepancy}</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                If farm scale differs by more than 2% from truck gauge, flag immediately before moving.
              </p>
              <textarea
                rows={2}
                placeholder="Describe farm gate weighing condition..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
              />
              <button
                type="button"
                onClick={() => alert("Transporter discrepancy memo logged with Satara Hub Dispatcher.")}
                className="mt-2 w-full py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors"
              >
                Log Verification Memo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
