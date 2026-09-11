import React, { useState } from 'react';
import { 
  Store, 
  Handshake, 
  CheckCircle2, 
  Coins, 
  ShoppingBag, 
  Tag, 
  FileCheck2, 
  Check, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { translations } from '../i18n/translations';

interface AgentViewProps {
  shipment: ShipmentItem;
  onUpdateShipment: (updated: ShipmentItem) => void;
  lang: Language;
}

export const AgentView: React.FC<AgentViewProps> = ({ shipment, onUpdateShipment, lang }) => {
  const t = translations[lang];
  const [saleConfirmed, setSaleConfirmed] = useState(shipment.currentStage >= 6);

  const buyerBids = [
    {
      id: "BID-891",
      buyerName: "Apex Urban Grocery Syndicate",
      location: "Vashi APMC Mandi, Yard #12",
      bidRate: 30.0,
      reqQtyKg: 1000,
      qualityTarget: "Grade A (65%+) & Grade B (35%)",
      paymentTerms: "Escrow Instant Clearance on Terminal Delivery",
      status: "selected",
    },
    {
      id: "BID-894",
      buyerName: "Navi Mumbai Wholesale Traders",
      location: "Turbhe APMC Sector 19",
      bidRate: 29.5,
      reqQtyKg: 800,
      qualityTarget: "Grade B Standard",
      paymentTerms: "T+2 Credit Ledger",
      status: "competing",
    }
  ];

  const handleConfirmSale = () => {
    setSaleConfirmed(true);
    onUpdateShipment({
      ...shipment,
      currentStage: Math.max(shipment.currentStage, 6),
      status: 'in_transit_mumbai',
    });
  };

  const agentCommission = shipment.verifiedHubWeightKg * 0.50;

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-[#92f5a4] flex items-center justify-center shadow-xs shrink-0">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">{t.agentTitle}</h1>
              <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
                Licensed APMC Agent #AG-77
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              Dilip Deshmukh • Onion &amp; Potato Exchange • Vashi Terminal
            </p>
          </div>
        </div>

        {/* Commission Box */}
        <div className="w-full xl:w-auto p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd] flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white text-[#003b1b] flex items-center justify-center shadow-2xs">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              {t.agentCommissionRate}
            </span>
            <span className="text-lg font-bold font-mono text-[#003b1b]">
              ₹{agentCommission.toFixed(2)} Commission
            </span>
            <span className="text-[11px] text-slate-500 block">
              (₹0.50/kg on {shipment.verifiedHubWeightKg} kg lot)
            </span>
          </div>
        </div>
      </div>

      {/* Role explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-sm block">Selling / Commission Agent Operating Function</span>
          The Commission Agent connects Go Agro’s graded Satara consignments with verified wholesale vendors at Mumbai Vashi APMC. The agent receives a fixed, transparent statutory commission of <strong>₹0.50/kg</strong> without hidden under-the-table cuts or arbitrations.
        </div>
      </div>

      {/* Assigned Consignment Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Assigned Go Agro Consignment #{shipment.id}
              </h2>
              <span className="bg-[#92f5a4] text-[#003b1b] text-xs font-mono font-bold px-2.5 py-0.5 rounded">
                Verified Hub QC Passed
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span className="text-slate-600">Crop &amp; Variety:</span>
                <span className="font-bold text-slate-900">{shipment.crop} - {shipment.variety}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span className="text-slate-600">Certified Net Weight:</span>
                <span className="font-mono font-bold text-slate-900">{shipment.verifiedHubWeightKg} kg</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between">
                <span className="text-emerald-800 font-semibold">Grade A (55mm+ Premium):</span>
                <span className="font-mono font-bold text-emerald-900">{shipment.gradeA_Kg} kg</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between">
                <span className="text-amber-800 font-semibold">Grade B (40-50mm Standard):</span>
                <span className="font-mono font-bold text-amber-900">{shipment.gradeB_Kg} kg</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span className="text-slate-600">Farmer Origin:</span>
                <span className="font-bold text-slate-900">{shipment.farmerName} ({shipment.farmerVillage})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Matching Buyer Demands & Confirm Sale */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              {t.buyerBids}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Select verified vendor to match the ₹30.00/kg benchmark purchase agreement.
            </p>

            <div className="space-y-3">
              {buyerBids.map((bid) => (
                <div
                  key={bid.id}
                  className={`p-4 rounded-xl border text-xs transition-all ${
                    bid.status === 'selected'
                      ? 'bg-[#eaedff] border-[#dae2fd]'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">{bid.buyerName}</span>
                      <span className="text-slate-600 font-mono text-[11px]">{bid.location}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-bold text-[#003b1b]">
                        ₹{bid.bidRate.toFixed(2)} / kg
                      </span>
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Offered Price</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/80 space-y-1 text-slate-600">
                    <p>Specification Match: <span className="font-semibold text-slate-800">{bid.qualityTarget}</span></p>
                    <p>Terms: <span className="text-emerald-700 font-semibold">{bid.paymentTerms}</span></p>
                  </div>

                  {bid.status === 'selected' && (
                    <div className="mt-4 pt-2">
                      <button
                        onClick={handleConfirmSale}
                        disabled={saleConfirmed}
                        className={`w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                          saleConfirmed
                            ? 'bg-emerald-700 text-white cursor-default'
                            : 'bg-[#003b1b] text-white hover:bg-[#14532d] shadow-xs'
                        }`}
                      >
                        {saleConfirmed ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Trade Locked with Apex Groceries @ ₹30/kg</span>
                          </>
                        ) : (
                          <>
                            <Handshake className="w-4 h-4" />
                            <span>{t.confirmSale}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
