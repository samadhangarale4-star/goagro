import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Receipt, 
  Store, 
  Tag, 
  TrendingUp, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { translations } from '../i18n/translations';

interface VendorViewProps {
  shipment: ShipmentItem;
  onUpdateShipment: (updated: ShipmentItem) => void;
  lang: Language;
}

export const VendorView: React.FC<VendorViewProps> = ({ shipment, onUpdateShipment, lang }) => {
  const t = translations[lang];
  const [demandQty, setDemandQty] = useState(1000);
  const [demandPrice, setDemandPrice] = useState(30.0);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(shipment.currentStage >= 6);
  const [demandPosted, setDemandPosted] = useState(false);

  const purchasePricePerKg = 30.0;
  const consumerPricePerKg = 37.0;
  const grossRetailSpreadPerKg = consumerPricePerKg - purchasePricePerKg; // ₹7.00
  const totalPurchaseValue = shipment.verifiedHubWeightKg * purchasePricePerKg;
  const totalConsumerValue = shipment.verifiedHubWeightKg * consumerPricePerKg;
  const totalGrossRetailProfit = shipment.verifiedHubWeightKg * grossRetailSpreadPerKg;

  const handleConfirmDelivery = () => {
    setDeliveryConfirmed(true);
    onUpdateShipment({
      ...shipment,
      currentStage: Math.max(shipment.currentStage, 6),
      status: 'delivered_vendor',
    });
    alert("Delivery confirmed at Vashi APMC Terminal Yard #12! Escrow payout triggered for Farmer & Transporter.");
  };

  const handlePostDemand = (e: React.FormEvent) => {
    e.preventDefault();
    setDemandPosted(true);
    setTimeout(() => setDemandPosted(false), 3000);
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-[#92f5a4] flex items-center justify-center shadow-xs shrink-0">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{t.buyerTitle}</h1>
              <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
                Apex Urban Grocery Syndicate
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              Vendor Code: VND-904 • Vashi Terminal Yard #12 • Mumbai Metro Retail Supply
            </p>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="w-full xl:w-auto p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd] flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white text-[#003b1b] flex items-center justify-center shadow-2xs">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Wholesale Purchase Rate
            </span>
            <span className="text-lg font-bold font-mono text-[#003b1b]">
              ₹30.00 / kg
            </span>
            <span className="text-[11px] text-[#006d30] font-semibold block">
              Consumer Retail @ ₹37.00/kg (₹7.00/kg Gross Spread)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Create Demand + Active Procurement Delivery Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Post Demand & Pricing Economics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              {t.createDemand}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Post your daily onion procurement quota directly to Go Agro aggregator hubs.
            </p>

            {demandPosted && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demand RFQ matched with Satara Aggregator Hub consignment #{shipment.id}!</span>
              </div>
            )}

            <form onSubmit={handlePostDemand} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Crop &amp; Quality Specifications</label>
                <select className="w-full bg-[#f2f3ff] border border-slate-200 rounded-xl p-2.5 outline-none font-medium">
                  <option>Red Onion (Garva Special) - Grade A 55mm+ (70%) &amp; Grade B (30%)</option>
                  <option>Export Quality White Onion</option>
                  <option>Pol Red Onion Standard</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Required Quantity (kg)</label>
                  <input
                    type="number"
                    value={demandQty}
                    onChange={(e) => setDemandQty(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#f2f3ff] border border-slate-200 rounded-xl p-2.5 font-mono text-sm font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Purchase Rate</label>
                  <div className="flex items-center gap-1 bg-[#f2f3ff] border border-slate-200 rounded-xl p-2.5 font-mono text-sm font-bold text-[#003b1b]">
                    <span>₹</span>
                    <input
                      type="number"
                      step="0.5"
                      value={demandPrice}
                      onChange={(e) => setDemandPrice(parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent outline-none"
                    />
                    <span className="text-xs font-normal text-slate-500">/kg</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Delivery Destination</label>
                <input
                  type="text"
                  defaultValue="Vashi APMC Terminal Yard #12, Navi Mumbai"
                  className="w-full bg-[#f2f3ff] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#003b1b] text-white rounded-xl font-bold text-xs hover:bg-[#14532d] transition-all shadow-xs"
              >
                Post Daily Demand Request
              </button>
            </form>
          </div>

          {/* Vendor Retail Spread Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 text-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#006d30]" />
              Vendor Unit Economics &amp; Consumer Retail
            </h3>

            <div className="space-y-2.5 text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between border border-slate-100">
                <span>Vendor Purchase from Go Agro:</span>
                <span className="font-mono font-bold text-slate-900">₹30.00 / kg</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl flex justify-between border border-emerald-200">
                <span className="text-emerald-900 font-semibold">Consumer Retail Resale Benchmark:</span>
                <span className="font-mono font-bold text-emerald-900">₹37.00 / kg</span>
              </div>
              <div className="p-3 bg-[#eaedff] rounded-xl flex justify-between border border-[#dae2fd]">
                <span className="text-[#003b1b] font-bold">Gross Retail Spread:</span>
                <span className="font-mono font-bold text-[#003b1b]">₹7.00 / kg</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              *Illustrative prototype model: The ₹7.00/kg spread covers vendor sorting, inner-city store logistics, gunny bag retail packaging, and vendor overheads before retail margin.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Consignment In-Transit & Unloading (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                  Matched In-Transit Consignment
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Shipment #{shipment.id} — {shipment.verifiedHubWeightKg} kg Graded Onions
                </h2>
              </div>
              <span className="bg-[#92f5a4] text-[#003b1b] px-3 py-1 rounded-full font-mono text-xs font-bold">
                NH48 In Transit ➔ Vashi
              </span>
            </div>

            {/* Consignment Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-mono uppercase text-[10px] block">Invoice Purchase Total</span>
                <span className="font-mono text-base font-bold text-[#003b1b] mt-1 block">
                  ₹{totalPurchaseValue.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500">{shipment.verifiedHubWeightKg} kg @ ₹30/kg</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-mono uppercase text-[10px] block">Grade A Ratio</span>
                <span className="font-mono text-base font-bold text-emerald-800 mt-1 block">
                  {shipment.gradeA_Kg} kg
                </span>
                <span className="text-[10px] text-slate-500">55mm+ Premium</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-mono uppercase text-[10px] block">Consumer Value</span>
                <span className="font-mono text-base font-bold text-slate-900 mt-1 block">
                  ₹{totalConsumerValue.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500">@ ₹37/kg retail</span>
              </div>
            </div>

            {/* Live Route Tracker */}
            <div className="p-4 bg-[#f2f3ff] rounded-xl border border-slate-200 mb-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#006d30]" /> Eicher 14ft Pro Canter (MH-11-BV-8402)
                </span>
                <span className="font-mono text-[#006d30] font-bold">ETA: 4 hrs 15 mins</span>
              </div>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#006d30] h-full rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Satara APMC Hub (01:20 PM)</span>
                <span className="font-bold text-[#003b1b]">Khandala Ghat Bypass (In Transit)</span>
                <span>Vashi Yard #12 (11:30 PM)</span>
              </div>
            </div>

            {/* Confirm Unloading & Final Delivery */}
            <div className="p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm text-slate-900 block">
                  Terminal Weighing &amp; Acceptance
                </span>
                <span className="text-xs text-slate-600">
                  Verify unloaded gunny bags at Vashi Yard to release final seller escrow.
                </span>
              </div>

              <button
                onClick={handleConfirmDelivery}
                disabled={deliveryConfirmed}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  deliveryConfirmed
                    ? 'bg-emerald-700 text-white cursor-default'
                    : 'bg-[#003b1b] text-white hover:bg-[#14532d] shadow-xs'
                }`}
              >
                {deliveryConfirmed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Delivery Confirmed &amp; Payment Cleared</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.confirmDeliveryAtMandi}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
