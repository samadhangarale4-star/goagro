import React, { useState } from 'react';
import { 
  Tractor, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  FileText, 
  Volume2, 
  AlertTriangle,
  ArrowRight,
  Calendar,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';

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
  const [selectedCrop, setSelectedCrop] = useState('onion');
  const [qty, setQty] = useState(1000);
  const [pickupDate, setPickupDate] = useState('2026-10-28');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const guaranteedRate = 27.0; // ₹27/kg
  const totalPayout = qty * guaranteedRate;
  const advancePayout = totalPayout * 0.5;

  const t = {
    en: {
      greeting: "Namaskar, Ramesh Patil",
      village: "Koregaon, Satara District",
      kycBadge: "KYC Verified Farmer",
      guaranteedBanner: "₹27.00 / kg Guaranteed Farm Gate Price",
      bannerDesc: "Zero transport deductions • No APMC mandi cess • 50% Instant UPI advance",
      activeTitle: "Your Active Consignment",
      consignmentId: "Batch #",
      totalEarned: "Total Locked Value",
      advanceReceived: "50% Advance Received",
      advanceMethod: "via UPI (Ref: UPI8923412)",
      balancePending: "50% Final Settlement",
      balanceMethod: "Bank of Maharashtra •••• 4921",
      progressTitle: "Dispatch Status",
      step1: "Harvest Booked",
      step2: "Transporter Picked Up",
      step3: "Weighed & Graded at Hub",
      step4: "Final Payment Release",
      driverCard: "Assigned Transporter",
      callDriver: "Call Driver",
      viewReceipt: "Weighing Slip",
      listenAudio: "Audio Help",
      dispute: "Help / Issue",
      bookTitle: "Book Next Harvest Pickup",
      bookSub: "Lock your rate today at ₹27.00/kg before loading",
      cropType: "Select Crop",
      onion: "🧅 Red Onion (Garva Special)",
      potato: "🥔 Jyoti Potato (₹18/kg)",
      tomato: "🍅 Hybrid Tomato (₹22/kg)",
      quantityLabel: "Quantity (kg)",
      dateLabel: "Preferred Pickup Date",
      calcTotal: "Expected Payout:",
      calcAdvance: "Instant 50% Advance:",
      btnBook: "Confirm & Book Farm Pickup",
      bookedToast: "Pickup booked successfully! Transporter will be assigned.",
      switchBatch: "Switch Consignment:",
    },
    mr: {
      greeting: "नमस्कार, रमेश पाटील",
      village: "कोरेगाव, सातारा जिल्हा",
      kycBadge: "सत्यापित शेतकरी (KYC)",
      guaranteedBanner: "शिवार दारात हमीभाव ₹२७.०० / किलो",
      bannerDesc: "वाहतूक खर्च शून्य • कोणतीही हमाली किंवा आडत कपात नाही • ५०% तत्काळ आगाऊ रक्कम",
      activeTitle: "चालू कांदा पाठवणी",
      consignmentId: "बॅच क्र.",
      totalEarned: "एकूण हमी रक्कम",
      advanceReceived: "५०% आगाऊ रक्कम जमा",
      advanceMethod: "UPI द्वारे (Ref: UPI8923412)",
      balancePending: "५०% अंतिम शिल्लक रक्कम",
      balanceMethod: "बँक ऑफ महाराष्ट्र खाते •••• ४९२१",
      progressTitle: "पाठवणीची सद्यस्थिती",
      step1: "नोंदणी झाली",
      step2: "वाहतूकदाराने शेतातून माल भरला",
      step3: "सातारा हब येथे वजन व प्रतवारी",
      step4: "अंतिम खात्यात रक्कम जमा",
      driverCard: "नेमणूक केलेला वाहतूकदार",
      callDriver: "चालकाला फोन करा",
      viewReceipt: "काटा पावती",
      listenAudio: "ऑडिओ मार्गदर्शन",
      dispute: "तक्रार / मदत",
      bookTitle: "पुढील पीक पाठवणी नोंदवा",
      bookSub: "माल शेतातून उचलण्यापूर्वीच ₹२७.००/किलो भाव पक्का करा",
      cropType: "पीक निवडा",
      onion: "🧅 लाल कांदा (गरवा स्पेशल)",
      potato: "🥔 बटाटा (₹१८/किलो)",
      tomato: "🍅 टोमॅटो (₹२२/किलो)",
      quantityLabel: "अंदाजे वजन (किलो)",
      dateLabel: "मालाची उचल तारीख",
      calcTotal: "एकूण मिळणारी रक्कम:",
      calcAdvance: "५०% तत्काळ आगाऊ रक्कम:",
      btnBook: "शेत उचल नोंदणी निश्चित करा",
      bookedToast: "नोंदणी यशस्वी! गो ऍग्रो ट्रान्सपोर्टर लवकरच संपर्क करेल.",
      switchBatch: "दुसरी बॅच निवडा:",
    },
    hi: {
      greeting: "नमस्कार, रमेश पाटिल",
      village: "कोरेगांव, सतारा जिला",
      kycBadge: "सत्यापित किसान (KYC)",
      guaranteedBanner: "खेत पर गारंटीशुदा मूल्य ₹27.00 / किलो",
      bannerDesc: "शून्य भाड़ा कटौती • कोई मंडी सेस या हम्माली नहीं • 50% तत्काल UPI अग्रिम",
      activeTitle: "सक्रिय फसल खेप",
      consignmentId: "बैच सं.",
      totalEarned: "कुल निश्चित मूल्य",
      advanceReceived: "50% अग्रिम प्राप्त हुआ",
      advanceMethod: "UPI द्वारा (Ref: UPI8923412)",
      balancePending: "50% अंतिम भुगतान",
      balanceMethod: "बैंक ऑफ महाराष्ट्र खाता •••• 4921",
      progressTitle: "माल की वर्तमान स्थिति",
      step1: "फसल बुकिंग पूर्ण",
      step2: "खेत से गाड़ी में माल लोड",
      step3: "सतारा हब पर डिजिटल तौल व ग्रेडिंग",
      step4: "अंतिम भुगतान बैंक में",
      driverCard: "नियुक्त ट्रांसपोर्टर",
      callDriver: "ड्राइवर को कॉल करें",
      viewReceipt: "तौल रसीद",
      listenAudio: "ऑडियो सहायता",
      dispute: "शिकायत / सहायता",
      bookTitle: "अगली फसल की बुकिंग करें",
      bookSub: "माल उठने से पहले ही ₹27.00/किलो भाव पक्का करें",
      cropType: "फसल चुनें",
      onion: "🧅 लाल प्याज (गरवा स्पेशल)",
      potato: "🥔 ज्योति आलू (₹18/किलो)",
      tomato: "🍅 हाइब्रिड टमाटर (₹22/किलो)",
      quantityLabel: "वजन (किलो)",
      dateLabel: "उठाव की तिथि",
      calcTotal: "कुल अनुमानित राशि:",
      calcAdvance: "50% तत्काल अग्रिम राशि:",
      btnBook: "पिकअप बुक करें",
      bookedToast: "बुकिंग सफल! ट्रांसपोर्टर जल्द संपर्क करेगा।",
      switchBatch: "बैच बदलें:",
    },
  }[lang];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBooking({
      crop: selectedCrop === 'onion' ? 'Red Onion (कांदा)' : selectedCrop,
      variety: 'Garva Special',
      qtyKg: qty,
      date: pickupDate,
    });
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 w-full">
      {/* Farmer Greeting & Guaranteed Price Banner */}
      <div className="bg-gradient-to-br from-[#003b1b] to-[#005a2b] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#92f5a4] text-[#003b1b] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {t.kycBadge}
              </span>
              <span className="text-xs text-emerald-200">{t.village}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t.greeting}</h1>
            <p className="text-sm text-emerald-100 mt-1">{t.bannerDesc}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-4 text-center md:text-right shrink-0">
            <span className="text-xs text-emerald-200 block font-semibold">{t.guaranteedBanner}</span>
            <div className="text-3xl sm:text-4xl font-black text-[#92f5a4] tracking-tight">₹27.00 <span className="text-base font-medium text-white">/ kg</span></div>
          </div>
        </div>
      </div>

      {/* Consignment Selector if multiple */}
      {shipments.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-700 whitespace-nowrap">{t.switchBatch}</span>
          {shipments.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectShipment(s.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                s.id === currentShipment.id
                  ? 'bg-[#003b1b] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {s.id} • {s.crop} ({s.expectedWeightKg} kg)
            </button>
          ))}
        </div>
      )}

      {/* Main Active Consignment Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-6">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-lg font-bold text-slate-900">{t.activeTitle}</h2>
              <span className="bg-slate-100 text-slate-700 font-mono text-xs font-bold px-2 py-0.5 rounded-md">
                {currentShipment.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentShipment.crop} • {currentShipment.expectedWeightKg.toLocaleString()} kg (20 Gunny Bags)
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenReceipt}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-[#003b1b] hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>{t.viewReceipt}</span>
            </button>

            <button
              onClick={onOpenAudioGuide}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{t.listenAudio}</span>
            </button>

            <button
              onClick={onOpenComplaint}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>{t.dispute}</span>
            </button>
          </div>
        </div>

        {/* Big Money Tracker (Crystal Clear Payout Status) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Value */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
              {t.totalEarned}
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              ₹{(currentShipment.expectedWeightKg * 27).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] font-medium text-emerald-700 mt-0.5 block">
              @ ₹27.00 / kg (Fixed Farm Gate)
            </span>
          </div>

          {/* 50% Advance Received */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                {t.advanceReceived}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                ✓ Received
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-950 mt-1">
              ₹{currentShipment.advancePaidTotal.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] font-medium text-emerald-700 mt-0.5 block">
              {t.advanceMethod}
            </span>
          </div>

          {/* 50% Final Settlement */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                {t.balancePending}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                ⏳ On Delivery
              </span>
            </div>
            <div className="text-2xl font-black text-amber-950 mt-1">
              ₹{currentShipment.finalSettlementTotal.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] font-medium text-amber-800 mt-0.5 block">
              {t.balanceMethod}
            </span>
          </div>
        </div>

        {/* Simple 4-Stage Progress Tracker */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800">{t.progressTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Step 1 */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-bold text-emerald-950">{t.step1}</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                1,000 kg locked at ₹27/kg
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-bold text-emerald-950">{t.step2}</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Loaded in MH-11-BV-8402
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-bold text-emerald-950">{t.step3}</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Certified: 1,000 kg (Grade A: 670kg)
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-bold text-amber-950">{t.step4}</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-snug">
                Escrow payout upon Vashi delivery
              </p>
            </div>
          </div>
        </div>

        {/* Assigned Driver Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003b1b] text-white flex items-center justify-center font-bold text-sm">
              🚚
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block">{t.driverCard}</span>
              <span className="text-sm font-bold text-slate-900">{currentShipment.transporterName}</span>
              <span className="text-xs text-slate-600 block">{currentShipment.vehicleNumber}</span>
            </div>
          </div>

          <a
            href={`tel:${currentShipment.transporterPhone}`}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.callDriver} ({currentShipment.transporterPhone})</span>
          </a>
        </div>
      </div>

      {/* Book Next Harvest Form (Simple & Direct) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">{t.bookTitle}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{t.bookSub}</p>
        </div>

        {bookingSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t.bookedToast}</span>
          </div>
        )}

        <form onSubmit={handleBook} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Crop Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.cropType}</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-emerald-600"
              >
                <option value="onion">{t.onion}</option>
                <option value="potato">{t.potato}</option>
                <option value="tomato">{t.tomato}</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.quantityLabel}</label>
              <div className="flex gap-2">
                {[500, 1000, 2000].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setQty(val)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      qty === val
                        ? 'bg-[#003b1b] text-white border-[#003b1b]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.dateLabel}</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Live Payout Preview */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-emerald-800 font-semibold block">{t.calcTotal}</span>
              <div className="text-2xl font-black text-emerald-950">
                ₹{totalPayout.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-emerald-700 ml-2">
                  ({qty} kg × ₹27.00/kg)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-emerald-800 font-semibold block">{t.calcAdvance}</span>
              <div className="text-xl font-black text-emerald-800">
                ₹{advancePayout.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-600 block">paid upon farm pickup</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#003b1b] hover:bg-[#005226] text-white font-black text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🌾</span>
            <span>{t.btnBook}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
