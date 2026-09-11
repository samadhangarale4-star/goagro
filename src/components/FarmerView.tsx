import React, { useState } from 'react';
import { 
  Tractor, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Scale, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  Plus, 
  Minus, 
  Sun, 
  PhoneCall, 
  AlertCircle, 
  Volume2, 
  Receipt,
  Check,
  Building2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';
import { translations } from '../i18n/translations';

interface FarmerViewProps {
  shipments: ShipmentItem[];
  currentShipment: ShipmentItem;
  onSelectShipment: (id: string) => void;
  onAddBooking: (booking: { crop: string; variety: string; qtyKg: number; date: string }) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenAudioGuide: () => void;
  onOpenReceipt: () => void;
  onOpenComplaint: () => void;
}

export const FarmerView: React.FC<FarmerViewProps> = ({
  shipments,
  currentShipment,
  onSelectShipment,
  onAddBooking,
  lang,
  onSelectLang,
  onOpenAudioGuide,
  onOpenReceipt,
  onOpenComplaint,
}) => {
  const t = translations[lang];

  // Booking Form State
  const [selectedCrop, setSelectedCrop] = useState('onion');
  const [variety, setVariety] = useState('Garva / Red Onion (Maharashtra Late)');
  const [qty, setQty] = useState(500);
  const [date, setDate] = useState('2026-10-26');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const ratePerKg = 27.0;
  const totalGross = qty * ratePerKg;
  const advance50 = totalGross * 0.5;

  const handleQtyChange = (delta: number) => {
    setQty((prev) => Math.max(50, prev + delta));
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBooking({
      crop: selectedCrop === 'onion' ? 'Onion (कांदा)' : selectedCrop,
      variety,
      qtyKg: qty,
      date,
    });
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Accessibility, Language Toggle & Assurance Ribbon */}
      <div className="px-4 lg:px-8 py-2.5 bg-[#f2f3ff] border-b border-[#dae2fd] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#003b1b]">
          <ShieldCheck className="w-5 h-5 text-[#006d30] shrink-0" />
          <span className="font-mono text-xs uppercase tracking-wide font-semibold">
            {t.farmerGuarantee}
          </span>
        </div>

        {/* Quick Audio Guide & Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAudioGuide}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#dae2fd] text-[#003b1b] text-xs font-semibold rounded-lg shadow-2xs hover:bg-[#eaedff] transition-all"
          >
            <Volume2 className="w-4 h-4 text-[#006d30]" />
            <span>{t.audioGuide}</span>
          </button>

          <div className="flex items-center bg-[#dae2fd] p-0.5 rounded-lg shadow-2xs">
            <button
              onClick={() => onSelectLang('en')}
              type="button"
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                lang === 'en' ? 'bg-[#14532d] text-white font-bold' : 'text-slate-700 hover:text-black'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onSelectLang('mr')}
              type="button"
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                lang === 'mr' ? 'bg-[#14532d] text-white font-bold' : 'text-slate-700 hover:text-black'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              type="button"
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                lang === 'hi' ? 'bg-[#14532d] text-white font-bold' : 'text-slate-700 hover:text-black'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* Shipment Selector Banner if multiple shipments */}
        {shipments.length > 1 && (
          <div className="bg-[#eaedff] border border-[#dae2fd] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#003b1b]">Switch Active Consignment:</span>
              <div className="flex gap-2">
                {shipments.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectShipment(s.id)}
                    className={`px-3 py-1 rounded-md font-mono text-xs font-semibold transition-all ${
                      currentShipment.id === s.id
                        ? 'bg-[#003b1b] text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {s.id} ({s.expectedWeightKg} kg)
                  </button>
                ))}
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Demo includes 500kg &amp; 1,000kg Satara ➔ Mumbai flows
            </span>
          </div>
        )}

        {/* Farmer Identity & Linked Settlement Banner */}
        <section className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#003b1b] flex items-center justify-center text-[#92f5a4] shadow-xs shrink-0">
              <Tractor className="w-9 h-9" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-slate-900">{t.farmerName}</h1>
                <span className="bg-[#92f5a4] text-[#003b1b] px-2.5 py-0.5 rounded font-mono text-xs uppercase font-bold">
                  {t.verifiedKYC}
                </span>
                <span className="bg-[#eaedff] text-slate-700 px-2.5 py-0.5 rounded font-mono text-xs">
                  ID: PAT-SAT-482
                </span>
              </div>
              <p className="text-sm text-slate-600 flex items-center gap-1.5 flex-wrap">
                <span className="text-emerald-700 font-semibold">{t.farmerLocation}</span>
                <span>•</span>
                <span className="font-semibold text-[#003b1b]">{t.cropSpecialty}</span>
              </p>
            </div>
          </div>

          {/* Bank & Payment Channel Card */}
          <div className="w-full xl:w-auto flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 bg-[#eaedff] rounded-xl border border-[#dae2fd]">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#003b1b] shadow-2xs shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase text-slate-500">
                {t.linkedAccount}
              </span>
              <span className="font-mono text-sm font-bold text-slate-900">
                Bank of Maharashtra •••• 4921
              </span>
              <span className="text-xs text-[#006d30] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t.instantUPI}
              </span>
            </div>
            <button
              onClick={() => alert("Bank Account verified via NPCI UPI e-Mandate: Bank of Maharashtra, Koregaon Branch.")}
              type="button"
              className="ml-auto sm:ml-4 px-3 py-1.5 bg-white text-[#003b1b] text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-2xs border border-slate-200"
            >
              {t.updateBank}
            </button>
          </div>
        </section>

        {/* Main Grid: Left Column (Shipment & Stepper) + Right Column (Booking & Ombudsman) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT / MAIN COLUMN: Shipment Details & Detailed Step Track (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* ACTIVE SHIPMENT HERO CARD */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
              {/* Shipment Header */}
              <div className="bg-[#003b1b] p-4 text-white flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#14532d] flex items-center justify-center text-[#92f5a4]">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[#92f5a4] block uppercase font-semibold">
                      {t.activeConsignment}
                    </span>
                    <span className="text-lg font-bold tracking-wide">
                      Shipment #{currentShipment.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-[#92f5a4] text-[#003b1b] px-3 py-1 rounded-md font-mono text-xs uppercase font-bold shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#006d30] animate-ping"></span>
                    {t.inTransit}
                  </span>
                </div>
              </div>

              {/* Key Quantitative Metrics Grid */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#f2f3ff]">
                <div className="p-4 bg-white rounded-xl shadow-2xs border border-slate-200">
                  <span className="font-mono text-[11px] text-slate-500 block uppercase">
                    {t.expectedGateWeight}
                  </span>
                  <span className="font-mono text-xl font-bold text-slate-900 mt-1 block">
                    {currentShipment.expectedWeightKg} <span className="text-xs font-normal text-slate-500">kg</span>
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    {t.farmScaleReading}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-2xs border border-slate-200">
                  <span className="font-mono text-[11px] text-slate-500 block uppercase">
                    {t.verifiedHubWeight}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#003b1b] mt-1 block">
                    {currentShipment.verifiedHubWeightKg} <span className="text-xs font-normal text-slate-500">kg</span>
                  </span>
                  <span className="text-xs text-[#006d30] font-semibold block mt-1">
                    {t.certifiedScale}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-2xs border border-slate-200">
                  <span className="font-mono text-[11px] text-slate-500 block uppercase">
                    {t.committedBaseRate}
                  </span>
                  <span className="font-mono text-xl font-bold text-slate-900 mt-1 block">
                    ₹{currentShipment.baseFarmerRatePerKg.toFixed(2)}<span className="text-xs font-normal text-slate-500">/kg</span>
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    APMC Benchmarked
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-2xs border border-slate-200">
                  <span className="font-mono text-[11px] text-slate-500 block uppercase">
                    {t.totalEstimatedValue}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#006d30] mt-1 block">
                    ₹{(currentShipment.baseFarmerRatePerKg * currentShipment.verifiedHubWeightKg).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    {currentShipment.verifiedHubWeightKg} kg @ ₹27/kg
                  </span>
                </div>
              </div>

              {/* Advance Payment Status Banner */}
              <div className="p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#eaedff] border-y border-[#dae2fd]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#92f5a4] text-[#003b1b] flex items-center justify-center shrink-0 shadow-2xs">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[#003b1b] text-white font-mono text-[11px] px-2 py-0.5 rounded font-bold uppercase">
                        Paid Instant
                      </span>
                      <span className="text-lg font-bold text-slate-900">
                        ₹{currentShipment.advancePaidTotal.toLocaleString('en-IN')} (50% Advance)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Disbursed via UPI • Ref: <span className="font-mono font-semibold text-slate-900">{currentShipment.advanceUpiRef}</span> • Bank of Maharashtra
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-2xs border border-slate-200 flex flex-col justify-center text-left md:text-right">
                  <span className="font-mono text-[10px] uppercase text-slate-500">
                    {t.pendingFinalSettlement}
                  </span>
                  <span className="font-mono text-sm text-[#703a00] font-bold">
                    ₹{currentShipment.finalSettlementTotal.toLocaleString('en-IN')} on Delivery
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {t.scheduledOnAcceptance}
                  </span>
                </div>
              </div>

              {/* Visual 7-Stage Supply Progression Tracker */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-slate-900">
                    {t.visualProgression}
                  </h2>
                  <span className="font-mono text-xs text-slate-500">
                    Stage {currentShipment.currentStage} of 7 Completed
                  </span>
                </div>

                {/* Detailed Stepper List */}
                <div className="space-y-3">
                  {currentShipment.stages.map((stg) => {
                    const isCompleted = stg.status === 'completed';
                    const isActive = stg.status === 'active';

                    return (
                      <div
                        key={stg.id}
                        className={`flex items-start gap-4 p-3.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#dae2fd] border border-[#003b1b]/20 shadow-xs'
                            : isCompleted
                            ? 'bg-[#f2f3ff] border border-slate-100'
                            : 'bg-slate-50/70 border border-slate-100 opacity-70'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                            isActive
                              ? 'bg-[#14532d] text-white animate-pulse'
                              : isCompleted
                              ? 'bg-[#006d30] text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4" /> : <span>{stg.id}</span>}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span
                              className={`text-xs md:text-sm font-semibold flex items-center gap-2 ${
                                isActive ? 'text-[#003b1b] font-bold' : isCompleted ? 'text-slate-900' : 'text-slate-600'
                              }`}
                            >
                              {stg.titleKey}
                              {isActive && (
                                <span className="bg-[#003b1b] text-white font-mono text-[10px] px-2 py-0.5 rounded uppercase">
                                  Current Stage
                                </span>
                              )}
                            </span>
                            <span className="font-mono text-[11px] text-slate-500">
                              {stg.time}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 mt-1">
                            {stg.descriptionKey}
                          </p>

                          {/* Stage 5 Special Quality Breakdown Cards */}
                          {stg.id === 5 && (
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-[#006d30]"></span>
                                  <span className="text-xs font-semibold text-slate-800">
                                    Grade A (Premium 55mm+)
                                  </span>
                                </div>
                                <span className="font-mono text-xs font-bold text-[#003b1b]">
                                  {currentShipment.gradeA_Kg} kg ({((currentShipment.gradeA_Kg / currentShipment.verifiedHubWeightKg) * 100).toFixed(1)}%)
                                </span>
                              </div>

                              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-[#ffb77d]"></span>
                                  <span className="text-xs font-semibold text-slate-800">
                                    Grade B (Standard 40-50mm)
                                  </span>
                                </div>
                                <span className="font-mono text-xs font-bold text-[#703a00]">
                                  {currentShipment.gradeB_Kg} kg ({((currentShipment.gradeB_Kg / currentShipment.verifiedHubWeightKg) * 100).toFixed(1)}%)
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipment Proof & Download Footer */}
              <div className="p-4 bg-[#eaedff] border-t border-[#dae2fd] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#006d30]" />
                  <span className="text-xs font-semibold text-slate-800">
                    {t.receiptIssued}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenComplaint}
                    type="button"
                    className="px-3 py-2 bg-white text-red-700 text-xs font-semibold rounded-lg border border-red-200 hover:bg-red-50 transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t.raiseComplaint}</span>
                  </button>

                  <button
                    onClick={onOpenReceipt}
                    type="button"
                    className="px-4 py-2 bg-white text-[#003b1b] text-xs font-semibold rounded-lg shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-1.5 border border-slate-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.downloadReceipt}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Past Completed Lots History Table */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">
                  {t.pastDispatches}
                </h2>
                <button
                  type="button"
                  onClick={() => alert("Showing all 18 historical verified dispatch records for Farmer Ramesh Patil.")}
                  className="text-xs text-[#006d30] font-semibold hover:underline"
                >
                  {t.viewAll}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#f2f3ff] font-mono text-[11px] uppercase text-slate-600 border-b border-slate-200">
                      <th className="py-2.5 px-3">Lot ID</th>
                      <th className="py-2.5 px-3">Harvest Crop</th>
                      <th className="py-2.5 px-3">Net Weight</th>
                      <th className="py-2.5 px-3">Gross Payout</th>
                      <th className="py-2.5 px-3">Settlement Status</th>
                      <th className="py-2.5 px-3 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-slate-800">GA-ON-00098</td>
                      <td className="py-3 px-3">Red Onion (Garva)</td>
                      <td className="py-3 px-3 font-mono">1,200 kg</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#003b1b]">₹32,400</td>
                      <td className="py-3 px-3">
                        <span className="bg-[#92f5a4] text-[#003b1b] px-2 py-0.5 rounded font-mono text-[11px] font-bold uppercase">
                          Fully Settled
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button onClick={onOpenReceipt} className="text-[#003b1b] hover:text-[#006d30] p-1" title="View Slip">
                          <Receipt className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-slate-800">GA-PT-00844</td>
                      <td className="py-3 px-3">Jyoti Potato</td>
                      <td className="py-3 px-3 font-mono">800 kg</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#003b1b]">₹17,600</td>
                      <td className="py-3 px-3">
                        <span className="bg-[#92f5a4] text-[#003b1b] px-2 py-0.5 rounded font-mono text-[11px] font-bold uppercase">
                          Fully Settled
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button onClick={onOpenReceipt} className="text-[#003b1b] hover:text-[#006d30] p-1" title="View Slip">
                          <Receipt className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Book Next Crop Collection & Ombudsman Guarantee (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* OFFER CREATION / FAST DISPATCH REQUEST CARD */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#003b1b] flex items-center justify-center text-[#92f5a4]">
                  <Plus className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  {t.bookNextCrop}
                </h2>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {t.bookCropDesc}
              </p>

              {bookingSuccess && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Collection request scheduled! Transporter dispatch notified for Koregaon farm yard.</span>
                </div>
              )}

              <form onSubmit={handleBookSubmit} className="space-y-4">
                {/* Crop Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    {t.selectCrop}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCrop('onion')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        selectedCrop === 'onion'
                          ? 'bg-[#14532d] text-white shadow-2xs'
                          : 'bg-[#eaedff] text-slate-700 hover:bg-[#dae2fd]'
                      }`}
                    >
                      <span>🧅 {t.onion}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCrop('potato')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        selectedCrop === 'potato'
                          ? 'bg-[#14532d] text-white shadow-2xs'
                          : 'bg-[#eaedff] text-slate-700 hover:bg-[#dae2fd]'
                      }`}
                    >
                      <span>🥔 {t.potato}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCrop('tomato')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        selectedCrop === 'tomato'
                          ? 'bg-[#14532d] text-white shadow-2xs'
                          : 'bg-[#eaedff] text-slate-700 hover:bg-[#dae2fd]'
                      }`}
                    >
                      <span>🍅 {t.tomato}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCrop('garlic')}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        selectedCrop === 'garlic'
                          ? 'bg-[#14532d] text-white shadow-2xs'
                          : 'bg-[#eaedff] text-slate-700 hover:bg-[#dae2fd]'
                      }`}
                    >
                      <span>🧄 {t.garlic}</span>
                    </button>
                  </div>
                </div>

                {/* Variety Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    {t.produceVariety}
                  </label>
                  <select
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    className="w-full bg-[#f2f3ff] border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 outline-none focus:border-[#003b1b]"
                  >
                    <option value="Garva / Red Onion (Maharashtra Late)">Garva / Red Onion (Maharashtra Late)</option>
                    <option value="Pol Red Onion">Pol Red Onion</option>
                    <option value="White Onion Export Grade">White Onion Export Grade</option>
                  </select>
                </div>

                {/* Estimated Quantity with Incrementers */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    {t.estimatedQuantityKg}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(-50)}
                      className="w-12 h-11 bg-[#eaedff] rounded-xl font-bold text-slate-900 text-lg hover:bg-[#dae2fd] transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(Math.max(50, parseInt(e.target.value) || 50))}
                      className="flex-1 bg-[#f2f3ff] border border-slate-200 h-11 text-center font-mono text-lg font-bold text-slate-900 rounded-xl outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleQtyChange(50)}
                      className="w-12 h-11 bg-[#eaedff] rounded-xl font-bold text-slate-900 text-lg hover:bg-[#dae2fd] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    {t.gunnyBagsNote} ({(qty / 50).toFixed(0)} bags)
                  </span>
                </div>

                {/* Collection Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    {t.preferredDate}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#f2f3ff] border border-slate-200 p-2.5 rounded-xl text-xs text-slate-800 outline-none"
                  />
                </div>

                {/* Instant Guaranteed Valuation Box */}
                <div className="p-4 bg-[#92f5a4]/20 border border-[#92f5a4]/40 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase text-[#006d30] font-bold">
                      {t.guaranteedPrice}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#006d30]">
                      ₹27.00 / kg
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-800 pt-1">
                    <span className="text-xs">{t.totalGrossVal}</span>
                    <span className="font-mono text-sm font-bold">
                      ₹{totalGross.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#006d30] pt-1 border-t border-slate-200">
                    <span className="text-xs font-semibold">{t.advancePledge50}</span>
                    <span className="font-mono text-sm font-bold">
                      ₹{advance50.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1 leading-normal">
                    {t.advanceDisbursedNotice}
                  </p>
                </div>

                {/* Form Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#14532d] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#003b1b] transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{t.acceptOfferBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Draft saved to your local offline queue.")}
                    className="w-full py-2 bg-transparent text-slate-600 text-xs font-medium hover:text-slate-900 transition-colors text-center"
                  >
                    {t.saveDraftBtn}
                  </button>
                </div>
              </form>
            </div>

            {/* TRANSPARENT WEIGHING GUARANTEE & OMBUDSMAN CARD */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {t.ombudsmanTitle}
                  </h3>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold uppercase">
                    {t.ombudsmanSubtitle}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {t.ombudsmanDesc}
              </p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#006d30] shrink-0" />
                  <span className="text-xs text-slate-800">
                    {t.ombudsmanPoint1}
                  </span>
                </div>
                <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006d30] shrink-0" />
                  <span className="text-xs text-slate-800">
                    {t.ombudsmanPoint2}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#eaedff] rounded-xl flex items-center justify-between border border-[#dae2fd]">
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-500 block">
                    {t.helpline}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#003b1b]">
                    1800-420-9921 (Toll-free)
                  </span>
                </div>
                <a
                  href="tel:18004209921"
                  className="px-3 py-1.5 bg-[#003b1b] text-white rounded-lg text-xs font-semibold shadow-2xs hover:bg-[#14532d] transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.callNow}</span>
                </a>
              </div>
            </div>

            {/* Weather & Mandi Sentiment Micro-Widget */}
            <div className="bg-[#eaedff] rounded-2xl p-4 shadow-2xs border border-[#dae2fd]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600">
                  {t.weatherTransit}
                </span>
                <span className="font-mono text-[11px] text-[#006d30] font-bold">
                  Clear Transit
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />
                  <div>
                    <span className="text-lg font-bold text-slate-900 font-mono">29°C</span>
                    <span className="text-xs text-slate-600 block">
                      {t.weatherOptimal}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-slate-500 block">
                    {t.etaMumbai}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#003b1b]">
                    4 hrs 15 mins
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
