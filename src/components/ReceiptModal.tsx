import React from 'react';
import { X, Download, Printer, CheckCircle2, ShieldCheck, Scale, QrCode } from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { translations } from '../i18n/translations';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: ShipmentItem;
  lang: Language;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, shipment, lang }) => {
  if (!isOpen) return null;
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#003b1b] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#14532d] flex items-center justify-center text-[#92f5a4]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#92f5a4]">
                Digital APMC Weighing &amp; Collection Slip
              </span>
              <h3 className="text-lg font-bold">Slip #CR-8821-{shipment.id}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Top Verification Badge */}
          <div className="bg-[#f2f3ff] border border-[#dae2fd] rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#006d30]" />
              <span className="text-xs font-semibold text-[#003b1b]">
                {t.farmerGuarantee}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold bg-[#92f5a4] text-[#003b1b] px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          {/* Core Shipment & Farmer Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-mono">Farmer KYC</span>
              <span className="font-bold text-slate-800 text-sm block mt-0.5">{shipment.farmerName}</span>
              <span className="text-slate-600 block">{shipment.farmerVillage}</span>
              <span className="font-mono text-slate-500 mt-1 block">ID: {shipment.farmerId}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-mono">Transporter &amp; Vehicle</span>
              <span className="font-bold text-slate-800 text-sm block mt-0.5">{shipment.transporterName}</span>
              <span className="text-slate-600 block">{shipment.vehicleNumber}</span>
              <span className="font-mono text-slate-500 mt-1 block">Driver: {shipment.transporterPhone}</span>
            </div>
          </div>

          {/* Weighing & Moisture Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Parameter</th>
                  <th className="py-2.5 px-3">Specification</th>
                  <th className="py-2.5 px-3 text-right">Reading</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">Crop &amp; Variety</td>
                  <td className="py-2.5 px-3 text-slate-600">{shipment.crop} - {shipment.variety}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900">Garva Special</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">Farm Gate Weight</td>
                  <td className="py-2.5 px-3 text-slate-600">Farmer Koregaon Scale</td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900">{shipment.expectedWeightKg} kg</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">Satara Hub Bridge Weight</td>
                  <td className="py-2.5 px-3 text-slate-600">Digital Certified Bridge #4</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#003b1b]">{shipment.verifiedHubWeightKg} kg</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-700">Moisture / Weight Variance</td>
                  <td className="py-2.5 px-3 text-slate-600">Tolerance Limit: ±2.0%</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-[#006d30]">{shipment.moistureVariance} (Pass)</td>
                </tr>
                <tr className="bg-emerald-50/50">
                  <td className="py-2.5 px-3 font-semibold text-emerald-900">Grade A (55mm+ Premium)</td>
                  <td className="py-2.5 px-3 text-emerald-700">Optimal firmness, zero rot</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">{shipment.gradeA_Kg} kg</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="py-2.5 px-3 font-semibold text-amber-900">Grade B (40-50mm Standard)</td>
                  <td className="py-2.5 px-3 text-amber-700">Standard market size</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-900">{shipment.gradeB_Kg} kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-[#eaedff]/60 border border-[#dae2fd] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Committed Base Price:</span>
              <span className="font-mono font-semibold text-slate-900">₹{shipment.baseFarmerRatePerKg.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Total Estimated Farm Realization:</span>
              <span className="font-mono font-bold text-slate-900">₹{(shipment.baseFarmerRatePerKg * shipment.verifiedHubWeightKg).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-[#006d30] font-semibold border-t border-slate-200/80 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 50% Instant Advance Disbursed:
              </span>
              <span className="font-mono font-bold">₹{shipment.advancePaidTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Disbursed via UPI: {shipment.advanceUpiRef}</span>
              <span>Bank: Bank of Maharashtra •••• 4921</span>
            </div>
          </div>

          {/* Digital QR & Signatures */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center p-1 text-slate-800">
                <QrCode className="w-12 h-12" />
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <span className="block font-mono font-semibold text-slate-700">APMC Geo-Hash: MH-SAT-4820</span>
                <span className="block">Timestamp: 2026-10-24 13:20:15 IST</span>
                <span className="block text-[#006d30] font-semibold">Digitally Signed by Satara Hub Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={() => {
              alert("Receipt #CR-8821 downloaded successfully to your device!");
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#003b1b] text-white text-xs font-semibold hover:bg-[#14532d] shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Download PDF Slip
          </button>
        </div>
      </div>
    </div>
  );
};
