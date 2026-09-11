import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Scale, PhoneCall } from 'lucide-react';
import { Language, ShipmentItem } from '../types';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: ShipmentItem;
  lang: Language;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose, shipment, lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [disputeType, setDisputeType] = useState('tare_weight');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#ba1a1a] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Farmer Ombudsman Protection</h3>
              <p className="text-xs text-red-100">Zero Silent Deductions • Quick Re-Check Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-red-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Dispute Ticket #DIS-4820 Registered</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your request has been escalated to Satara Hub Chief Ombudsman officer <strong>Shri Vitthalrao Deshmukh</strong>.
                The CCTV tare weight footage and digital scale bridge logs are locked. You will receive an update within <strong>30 minutes</strong>.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700">
                <span>Escrow Guarantee: Pending balance will remain protected and cannot be forfeited.</span>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#003b1b] text-white text-xs font-semibold rounded-lg hover:bg-[#14532d] transition-all"
              >
                Close &amp; Back to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Shipment Reference: {shipment.id}</span>
                  <p className="mt-0.5 text-amber-800">
                    Expected: {shipment.expectedWeightKg} kg • Hub Certified: {shipment.verifiedHubWeightKg} kg (Variance: {shipment.moistureVariance})
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nature of Discrepancy / तक्रारीचा प्रकार
                </label>
                <select
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-[#003b1b]"
                >
                  <option value="tare_weight">Tare Weight / Digital Scale Reading Discrepancy</option>
                  <option value="grade_classification">Grade A / Grade B Sorting Quality Disagreement</option>
                  <option value="gunny_bag_tare">Gunny Bag Weight Deductions</option>
                  <option value="advance_upi_delay">Advance Payment UPI Bank Credit Delay</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Comments / Farm Scale Notes / शेतातील वजन पुरावा
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Weigh-scale at Koregaon was calibrated yesterday. Moisture loss cannot exceed 1.5%."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-[#003b1b]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-500 block">Immediate Phone Resolution</span>
                  <span className="font-bold text-[#003b1b] font-mono text-sm">1800-420-9921</span>
                </div>
                <a
                  href="tel:18004209921"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006d30] text-white rounded-lg text-xs font-semibold hover:bg-[#003b1b] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Ombudsman
                </a>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#ba1a1a] text-white rounded-lg text-xs font-semibold hover:bg-red-700 shadow-sm transition-all"
                >
                  Submit Official Dispute
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
